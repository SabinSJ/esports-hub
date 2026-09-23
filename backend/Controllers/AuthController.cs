using backend.Entities;
using backend.Services;
using backend.DTOs.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController: ControllerBase {
    private readonly AuthService _authService;

    public AuthController(AuthService authService) {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request) {
       var user = await _authService.RegisterAsync(request);

       return Ok(user);
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
}