using backend.DTOs.Players;

namespace backend.DTOs.Teams;

public class TeamResponse
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    public string Country { get; set; } = null!;
    public string Region { get; set; } = null!;
    public string LogoUrl { get; set; } = null!;

    public List<PlayerSummary> Players { get; set; } = [];

    public int Wins { get; set; }
    public int Losses { get; set; }
    public int Ranking { get; set; }
}