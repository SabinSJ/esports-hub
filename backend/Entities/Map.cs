namespace backend.Entities;

public class Map
{
    public int Id { get; set; }
    
    public string Name { get; set; } = null!;
    public DateTime CreatedAt { get; set; }

    public ICollection<MatchMap> MatchMaps { get; set; } = [];
}