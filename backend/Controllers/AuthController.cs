using backend.Entities;
using backend.Services;
using backend.DTOs.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using AspNet.Security.OAuth.GitHub;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController: ControllerBase {
    private readonly AuthService _authService;
    private readonly IConfiguration _configuration;

    public AuthController(AuthService authService, IConfiguration configuration) {
        _authService = authService;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request) {
        try{
            var user = await _authService.RegisterAsync(request);

            return Ok(user);
        } catch (ArgumentException ex) {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request) {
        var response = await _authService.LoginAsync(request);

        if (response is null) {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        Response.Cookies.Append("token", response.AccessToken, new CookieOptions {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
            Expires = response.ExpiresAt,
            Path = "/"
        });

        return Ok(new { ok = true });
    }

    [AllowAnonymous]
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("token", new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
            Path = "/"
        });

        return NoContent();
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult GetCurrentUser()
    {
        var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);

        return Ok(new
        {
            id = userId,
            username = User.Identity?.Name
        });
    }

    [HttpGet("google")]
    public IActionResult GoogleLogin()
    {
        var properties =
            _authService.CreateExternalLoginProperties(
                "/api/auth/google/complete"
            );

        return Challenge(
            properties,
            GoogleDefaults.AuthenticationScheme
        );
    }

    [HttpGet("google/complete")]
    public async Task<IActionResult> GoogleCallback()
    {
        var response = await _authService.HandleExternalLoginAsync(
            HttpContext,
            GoogleDefaults.AuthenticationScheme
        );

        if (response is null)
            return Unauthorized(new { message = "Google authentication failed." });

        Response.Cookies.Append("token", response.AccessToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
            Expires = response.ExpiresAt,
            Path = "/"
        });

        return Redirect(_configuration["Authentication:FrontendUrl"]!);
    }


    [HttpGet("github")]
    public IActionResult GithubLogin()
    {
        var properties =
            _authService.CreateExternalLoginProperties(
                "/api/auth/github/complete"
            );

        return Challenge(
            properties,
            GitHubAuthenticationDefaults.AuthenticationScheme
        );
    }

    [HttpGet("github/complete")]
    public async Task<IActionResult> GithubCallback()
    {
        var response = await _authService.HandleExternalLoginAsync(
            HttpContext,
            GitHubAuthenticationDefaults.AuthenticationScheme
        );

        if (response is null)
            return Unauthorized(new { message = "GitHub authentication failed." });

        Response.Cookies.Append("token", response.AccessToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
            Expires = response.ExpiresAt,
            Path = "/"
        });

        return Redirect(_configuration["Authentication:FrontendUrl"]!);
    }
}