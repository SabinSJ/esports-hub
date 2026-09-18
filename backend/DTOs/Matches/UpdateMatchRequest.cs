using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Matches;

public class UpdateMatchRequest
{
    [Required]
    public int TeamAId { get; set; }

    [Required]
    public int TeamBId { get; set; }

    [Required]
    public int TournamentId { get; set; }

    [Required]
    public MatchStatus Status { get; set; }

    [Required]
    public MatchFormat Format { get; set; }

    [Required]
    public DateTime StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    [Range(0, int.MaxValue)]
    public int ScoreA { get; set; }

    [Range(0, int.MaxValue)]
    public int ScoreB { get; set; }
}