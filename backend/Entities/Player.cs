using backend.Enums;

namespace backend.Entities;

public class Player
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public TeamRole TeamRole { get; set; }
    public string Nationality { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public int TeamId { get; set; }
    public DateTime CreatedAt { get; set; }
}