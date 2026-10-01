using backend.Data;
using BCrypt.Net;
using backend.Entities;
using backend.DTOs.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace backend.Services;

public class AuthService {
    private readonly AppDbContext _context;
    private readonly JwtService _jwtService;

    public AuthService(AppDbContext context, JwtService jwtService) {
        _context = context;
        _jwtService = jwtService;
    }

    public async Task<User> RegisterAsync(RegisterRequest request) {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => 
                u.Username == request.Username ||
                u.Email == request.Email
            );

        if(existingUser is not null)
        {
            throw new ArgumentException("Username or Email is already taken.");
        }

        var user = new User {
            Username = request.Username,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = "User",
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return user;
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request) {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (string.IsNullOrEmpty(user.PasswordHash))
            return null;

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash)) {
            return null;
        }

        var (token, expiresAt) = _jwtService.GenerateToken(user);

        return new LoginResponse {
            AccessToken = token,
            ExpiresAt = expiresAt
        };
    }

    public AuthenticationProperties CreateExternalLoginProperties(string redirectUri)
    {
        return new AuthenticationProperties
        {
            RedirectUri = redirectUri
        };
    }

    public async Task<LoginResponse?> HandleExternalLoginAsync(
        HttpContext httpContext, 
        string provider
    ) {
        var result = await httpContext.AuthenticateAsync("External");

        if(!result.Succeeded || result.Principal is null)
            return null;
        
        var claims = result.Principal.Claims;

        var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var username = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
        var providerId = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if(string.IsNullOrEmpty(email) || string.IsNullOrEmpty(providerId))
            return null;

        var externalLogin = await _context.ExternalLogins
            .Include(x => x.User)
            .FirstOrDefaultAsync(x =>
                x.Provider == provider &&
                x.ProviderSubject == providerId);

        var user = externalLogin?.User;
        
        if(user is null)
        {
            user = new User {
                Username = username ?? email.Split('@')[0],
                Email = email,
                PasswordHash = null,
                Role = "User",
                CreatedAt = DateTime.UtcNow
            };

            var newExternalLogin = new ExternalLogin
            {
                User = user,
                Provider = provider,
                ProviderSubject = providerId
            };

            _context.Users.Add(user);
            _context.ExternalLogins.Add(newExternalLogin);

            await httpContext.SignOutAsync("External");

            await _context.SaveChangesAsync();
        }

        var (token, expiresAt) = _jwtService.GenerateToken(user);

        return new LoginResponse {
            AccessToken = token,
            ExpiresAt = expiresAt
        }; 
    }
}