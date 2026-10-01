
namespace backend.Entities;

public class ExternalLogin
{
    public int Id { get; set; }
    
    public int UserId { get; set; }

    public User User { get; set; } = null!;
    
    public string Provider { get; set; } = null!;
    
    public string ProviderSubject { get; set; } = null!;
}