using backend.Data;
using BCrypt.Net;
using backend.Entities;
using backend.DTOs.Auth;
using Microsoft.EntityFrameworkCore;

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
            .FirstOrDefaultAsync(u => u.Username == request.Username);

        if(existingUser is not null)
        {
            throw new ArgumentException("Username is already taken.");
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

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash)) {
            return null;
        }

        var (token, expiresAt) = _jwtService.GenerateToken(user);

        return new LoginResponse {
            AccessToken = token,
            ExpiresAt = expiresAt
        };
    }
}