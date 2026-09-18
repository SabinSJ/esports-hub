
namespace backend.DTOs.Teams;

public class StandingResponse
{
    public int Rank { get; set; }
    public int TeamId { get; set; }
    public string TeamName { get; set; } = null!;
    public string Region { get; set; } = null!;
    public string LogoUrl { get; set; } = null!;
    public int MatchesPlayed { get; set; }
    public int Wins { get; set; }
    public int Losses { get; set; }
    public int Points { get; set; }
    public int WinRate{ get; set; }
}