using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Auth;

public class RegisterRequest {
    [Required]
    public string Username { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    [MinLength(8)]
    public string Password { get; set; } = null!;
}