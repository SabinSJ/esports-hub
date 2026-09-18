using backend.Enums;

namespace backend.Entities;

public class Match
{
    public int Id { get; set; }
    public int TeamAId { get; set; }
    public Team TeamA { get; set; } = null!;
    public int TeamBId { get; set; }
    public Team TeamB { get; set; } = null!;
    public int TournamentId { get; set; }
    public Tournament Tournament { get; set; } = null!;
    public MatchStatus Status { get; set; }
    public MatchFormat Format { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public int ScoreA { get; set; }
    public int ScoreB { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<MatchMap> Maps { get; set; } = [];
}