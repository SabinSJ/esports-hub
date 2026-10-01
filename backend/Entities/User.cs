
namespace backend.Entities;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? PasswordHash { get; set; }
    public string Role { get; set; } = null!;
    public DateTime CreatedAt { get; set; }

    public ICollection<ExternalLogin> ExternalLogins { get; set; } = new List<ExternalLogin>();
}