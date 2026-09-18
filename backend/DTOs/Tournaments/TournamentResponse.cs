using backend.Enums;
namespace backend.DTOs.Tournaments;

public class TournamentResponse
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public TournamentStatus Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public string Region { get; set; } = null!;
    
    public decimal PrizePool { get; set; }
    public int TeamCount { get; set; }
}