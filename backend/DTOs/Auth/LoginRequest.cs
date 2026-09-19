using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Auth;

public class LoginRequest {
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    [MinLength(8)]
    public string Password { get; set; } = null!;
}