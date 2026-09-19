namespace backend.DTOs.Auth;

public class LoginResponse
{
    public string AccessToken { get; set; } = null!;
    public DateTime ExpiresAt { get; set; }
}