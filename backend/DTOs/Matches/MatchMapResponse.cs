namespace backend.DTOs.Matches;

public class MatchMapResponse
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int Order { get; set; }

    public int ScoreA { get; set; }

    public int ScoreB { get; set; }
}