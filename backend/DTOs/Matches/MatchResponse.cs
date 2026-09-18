using backend.Enums;
using backend.DTOs.Teams;

namespace backend.DTOs.Matches;

public class MatchResponse
{
    public int Id { get; set; }

    public TeamSummary TeamA { get; set; } = null!;
    public TeamSummary TeamB { get; set; } = null!;

    public int TournamentId { get; set; }
    public string TournamentName { get; set; } = null!;

    public string Region { get; set; } = null!;

    public MatchStatus Status { get; set; }
    public MatchFormat Format { get; set; }

    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }

    public int ScoreA { get; set; }
    public int ScoreB { get; set; }

    public List<MatchMapResponse> Maps { get; set; } = [];
}