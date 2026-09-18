namespace backend.DTOs.Teams;

public class TeamSummary
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string LogoUrl { get; set; } = null!;
    public string Region { get; set; } = null!;
    public int Ranking { get; set; }
    public double WinRate { get; set; }

    public List<string> RecentResults { get; set; } = [];
}