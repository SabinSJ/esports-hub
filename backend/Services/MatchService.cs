using backend.Data;
using backend.Entities;
using backend.Enums;
using backend.Validators;
using backend.DTOs.Matches;
using backend.DTOs.Teams;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class MatchService
{
    private readonly AppDbContext _context;

    public MatchService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<MatchResponse>> GetAllMatchesAsync()
    {
        return await _context.Matches
            .AsNoTracking()
            .Select(m => new MatchResponse
            {
                Id = m.Id,

                TeamA = new TeamSummary
                {
                    Id = m.TeamA.Id,
                    Name = m.TeamA.Name,
                    LogoUrl = m.TeamA.LogoUrl,
                    Region = m.TeamA.Region
                },

                TeamB = new TeamSummary
                {
                    Id = m.TeamB.Id,
                    Name = m.TeamB.Name,
                    LogoUrl = m.TeamB.LogoUrl,
                    Region = m.TeamB.Region
                },

                TournamentId = m.TournamentId,
                TournamentName = m.Tournament.Name,
                Region = m.Tournament.Region,

                Status = m.Status,
                Format = m.Format,
                StartTime = m.StartTime,
                EndTime = m.EndTime,
                ScoreA = m.ScoreA,
                ScoreB = m.ScoreB,

                Maps = m.Maps
                    .OrderBy(mm => mm.Order)
                    .Select(mm => new MatchMapResponse
                    {
                        Id = mm.Id,
                        Name = mm.Map.Name,
                        Order = mm.Order,
                        ScoreA = mm.ScoreA,
                        ScoreB = mm.ScoreB
                    })
                    .ToList()
            })
            .ToListAsync();
    }
    
    public async Task<MatchResponse?> GetMatchByIdAsync(int id)
    {
        var match = await _context.Matches
            .Include(m => m.TeamA)
            .Include(m => m.TeamB)
            .Include(m => m.Tournament)
            .Include(m => m.Maps)
                .ThenInclude(mm => mm.Map)
            .AsNoTracking()
            .FirstOrDefaultAsync(m => m.Id == id);

        if (match is null)
        {
            return null;
        }

        // Get all teams
        var allTeams = await _context.Teams
            .AsNoTracking()
            .Select(t => t.Id)
            .ToListAsync();

        // Get all finished matches
        var finishedMatches = await _context.Matches
            .AsNoTracking()
            .Where(m => m.Status == MatchStatus.Finished)
            .Select(m => new
            {
                m.TeamAId,
                m.TeamBId,
                m.ScoreA,
                m.ScoreB,
                m.StartTime
            })
            .ToListAsync();

        // Initialize stats for every team
        var teamStats = allTeams.ToDictionary(
            teamId => teamId,
            teamId => (Wins: 0, Losses: 0)
        );

        // Calculate wins and losses
        foreach (var finishedMatch in finishedMatches)
        {
            if (finishedMatch.ScoreA > finishedMatch.ScoreB)
            {
                teamStats[finishedMatch.TeamAId] =
                    (
                        teamStats[finishedMatch.TeamAId].Wins + 1,
                        teamStats[finishedMatch.TeamAId].Losses
                    );

                teamStats[finishedMatch.TeamBId] =
                    (
                        teamStats[finishedMatch.TeamBId].Wins,
                        teamStats[finishedMatch.TeamBId].Losses + 1
                    );
            }
            else if (finishedMatch.ScoreB > finishedMatch.ScoreA)
            {
                teamStats[finishedMatch.TeamAId] =
                    (
                        teamStats[finishedMatch.TeamAId].Wins,
                        teamStats[finishedMatch.TeamAId].Losses + 1
                    );

                teamStats[finishedMatch.TeamBId] =
                    (
                        teamStats[finishedMatch.TeamBId].Wins + 1,
                        teamStats[finishedMatch.TeamBId].Losses
                    );
            }
        }

        // Calculate rankings
        var rankings = teamStats
            .OrderByDescending(stats => stats.Value.Wins)
            .ThenBy(stats => stats.Value.Losses)
            .Select((team, index) => new
            {
                TeamId = team.Key,
                Ranking = index + 1
            })
            .ToDictionary(x => x.TeamId, x => x.Ranking);

        // Get stats for Team A and Team B
        var teamAStats = teamStats[match.TeamAId];
        var teamBStats = teamStats[match.TeamBId];

        var teamATotalMatches =
            teamAStats.Wins + teamAStats.Losses;

        var teamBTotalMatches =
            teamBStats.Wins + teamBStats.Losses;

        var teamAWinRate = teamATotalMatches == 0
            ? 0
            : (double)teamAStats.Wins / teamATotalMatches * 100;

        var teamBWinRate = teamBTotalMatches == 0
            ? 0
            : (double)teamBStats.Wins / teamBTotalMatches * 100;

        // Get recent results for Team A
        var teamARecentResults = finishedMatches
            .Where(m =>
                m.TeamAId == match.TeamAId ||
                m.TeamBId == match.TeamAId)
            .OrderByDescending(m => m.StartTime)
            .Take(5)
            .Select(m =>
                (m.TeamAId == match.TeamAId && m.ScoreA > m.ScoreB) ||
                (m.TeamBId == match.TeamAId && m.ScoreB > m.ScoreA)
                    ? "W"
                    : "L")
            .Reverse()
            .ToList();

        // Get recent results for Team B
        var teamBRecentResults = finishedMatches
            .Where(m =>
                m.TeamAId == match.TeamBId ||
                m.TeamBId == match.TeamBId)
            .OrderByDescending(m => m.StartTime)
            .Take(5)
            .Select(m =>
                (m.TeamAId == match.TeamBId && m.ScoreA > m.ScoreB) ||
                (m.TeamBId == match.TeamBId && m.ScoreB > m.ScoreA)
                    ? "W"
                    : "L")
            .Reverse()
            .ToList();

        return new MatchResponse
        {
            Id = match.Id,

            TeamA = new TeamSummary
            {
                Id = match.TeamA.Id,
                Name = match.TeamA.Name,
                LogoUrl = match.TeamA.LogoUrl,
                Ranking = rankings[match.TeamAId],
                WinRate = teamAWinRate,
                RecentResults = teamARecentResults,
                Region = match.TeamA.Region
            },

            TeamB = new TeamSummary
            {
                Id = match.TeamB.Id,
                Name = match.TeamB.Name,
                LogoUrl = match.TeamB.LogoUrl,
                Ranking = rankings[match.TeamBId],
                WinRate = teamBWinRate,
                RecentResults = teamBRecentResults,
                Region = match.TeamA.Region
            },

            TournamentId = match.TournamentId,
            TournamentName = match.Tournament.Name,
            Region = match.Tournament.Region,

            Status = match.Status,
            Format = match.Format,

            StartTime = match.StartTime,
            EndTime = match.EndTime,

            ScoreA = match.ScoreA,
            ScoreB = match.ScoreB,

            Maps = match.Maps
                .OrderBy(mm => mm.Order)
                .Select(mm => new MatchMapResponse
                {
                    Id = mm.Id,
                    Name = mm.Map.Name,
                    Order = mm.Order,
                    ScoreA = mm.ScoreA,
                    ScoreB = mm.ScoreB
                })
                .ToList()
        };
    }

    public async Task<Match> CreateMatchAsync(CreateMatchRequest request)
    {
        MatchValidator.Validate(request);

        if (request.TeamAId == request.TeamBId)
        {
            throw new ArgumentException("A match must have two different teams.");
        }

        var teamAExists = await _context.Teams
            .AnyAsync(t => t.Id == request.TeamAId);

        var teamBExists = await _context.Teams
            .AnyAsync(t => t.Id == request.TeamBId);

        var tournamentExists = await _context.Tournaments
            .AnyAsync(t => t.Id == request.TournamentId);

        if (!teamAExists || !teamBExists || !tournamentExists)
        {
            throw new ArgumentException("Invalid team or tournament.");
        }

        var match = new Match
        {
            TeamAId = request.TeamAId,
            TeamBId = request.TeamBId,
            TournamentId = request.TournamentId,
            Status = request.Status,
            Format = request.Format,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            ScoreA = request.ScoreA,
            ScoreB = request.ScoreB,
            CreatedAt = DateTime.UtcNow
        };

        _context.Matches.Add(match);
        await _context.SaveChangesAsync();

        return match;
    }

    public async Task<List<Match>> CreateBulkAsync(
    List<CreateMatchRequest> requests)
{
    var matches = new List<Match>();

    foreach (var request in requests)
    {
        MatchValidator.Validate(request);

        if (request.TeamAId == request.TeamBId)
        {
            throw new ArgumentException("A match must have two different teams.");
        }

        var teamAExists = await _context.Teams
            .AnyAsync(t => t.Id == request.TeamAId);

        var teamBExists = await _context.Teams
            .AnyAsync(t => t.Id == request.TeamBId);

        var tournamentExists = await _context.Tournaments
            .AnyAsync(t => t.Id == request.TournamentId);

        if (!teamAExists || !teamBExists || !tournamentExists)
        {
            throw new ArgumentException("Invalid team or tournament.");
        }

        var match = new Match
        {
            TeamAId = request.TeamAId,
            TeamBId = request.TeamBId,
            TournamentId = request.TournamentId,
            Status = request.Status,
            Format = request.Format,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            ScoreA = request.ScoreA,
            ScoreB = request.ScoreB,
            CreatedAt = DateTime.UtcNow
        };

        matches.Add(match);
    }

    _context.Matches.AddRange(matches);

    await _context.SaveChangesAsync();

    return matches;
}

    public async Task<Match?> UpdateMatchAsync(int id, UpdateMatchRequest request)
    {
        MatchValidator.Validate(request);

        var match = await _context.Matches
            .FirstOrDefaultAsync(m => m.Id == id);

        if (match is null)
        {
            return null;
        }

        if (request.TeamAId == request.TeamBId)
        {
            throw new ArgumentException("A match must have two different teams.");
        }

        var teamAExists = await _context.Teams
            .AnyAsync(t => t.Id == request.TeamAId);

        var teamBExists = await _context.Teams
            .AnyAsync(t => t.Id == request.TeamBId);

        var tournamentExists = await _context.Tournaments
            .AnyAsync(t => t.Id == request.TournamentId);

        if (!teamAExists || !teamBExists || !tournamentExists)
        {
            throw new ArgumentException("Invalid team or tournament.");
        }

        match.TeamAId = request.TeamAId;
        match.TeamBId = request.TeamBId;
        match.TournamentId = request.TournamentId;
        match.Status = request.Status;
        match.Format = request.Format;
        match.StartTime = request.StartTime;
        match.EndTime = request.EndTime;
        match.ScoreA = request.ScoreA;
        match.ScoreB = request.ScoreB;

        await _context.SaveChangesAsync();

        return match;
    }

    public async Task<bool> DeleteMatchAsync(int id)
    {
        var match = await _context.Matches.FirstOrDefaultAsync(m => m.Id == id);

        if (match is null)
        {
            return false;
        }

        _context.Matches.Remove(match);
        await _context.SaveChangesAsync();
        return true;
    }
}