using backend.DTOs.Players;
using backend.DTOs.Teams;
using backend.Enums;

namespace backend.DTOs.Matches;

public class MatchSummary
{
    public int Id { get; set; }

    public TeamSummary Opponent { get; set; } = null!;
    public int TournamentId { get; set; }
    public string TournamentName { get; set; } = null!;
    public MatchStatus Status { get; set; }
    public MatchFormat Format { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public int TeamScore { get; set; }
    public int OpponentScore { get; set; }
}