using backend.Enums;

namespace backend.Entities;

public class Tournament
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public TournamentStatus Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Region { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Country { get; set; } = null!;
    public decimal PrizePool { get; set; }
    public DateTime CreatedAt { get; set; }
}