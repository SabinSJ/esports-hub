using backend.DTOs.Matches;

namespace backend.Validators;

public static class MatchValidator
{
    public static void Validate(CreateMatchRequest request)
    {
        if (request.TeamAId == request.TeamBId)
        {
            throw new ArgumentException(
                "A match must have two different teams.");
        }

        if (request.EndTime.HasValue &&
            request.EndTime.Value <= request.StartTime)
        {
            throw new ArgumentException(
                "End time must be after start time.");
        }
    }

    public static void Validate(UpdateMatchRequest request)
    {
        if (request.TeamAId == request.TeamBId)
        {
            throw new ArgumentException(
                "A match must have two different teams.");
        }

        if (request.EndTime.HasValue &&
            request.EndTime.Value <= request.StartTime)
        {
            throw new ArgumentException(
                "End time must be after start time.");
        }
    }
}