using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Tournaments;

public class UpdateTournamentRequest
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    public TournamentStatus Status { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Region { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string City { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Country { get; set; } = string.Empty;

    [Range(0, double.MaxValue)]
    public decimal PrizePool { get; set; }
}