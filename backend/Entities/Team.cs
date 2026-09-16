namespace backend.Entities;

public class Team
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Country { get; set; } = null!;
    public string Region { get; set; } = null!;
    public string LogoUrl { get; set; } = null!;
}