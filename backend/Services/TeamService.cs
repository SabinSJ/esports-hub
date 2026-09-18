using backend.Data;
using backend.Entities;
using backend.DTOs.Teams;
using backend.DTOs.Players;
using backend.DTOs.Matches;
using backend.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class TeamService {
    private readonly AppDbContext _context;

    public TeamService(AppDbContext context) {
        _context = context;
    }

    public async Task<List<TeamResponse>> GetAllTeamsAsync() {
        var teams = await _context.Teams
            .AsNoTracking()
            .ToListAsync();

        var players = await _context.Players
            .AsNoTracking()
            .ToListAsync();
        
        var finishedMatches = await _context.Matches
            .AsNoTracking()
            .Where(m => m.Status == Enums.MatchStatus.Finished)
            .ToListAsync();

        var teamStats = teams.ToDictionary(
            team => team.Id,
            team => (
                Wins: 0,
                Losses: 0
            )
        );

        foreach (var match in finishedMatches) {
            if(match.ScoreA > match.ScoreB) {
                teamStats[match.TeamAId] = (
                    teamStats[match.TeamAId].Wins + 1,
                    teamStats[match.TeamAId].Losses
                );
                
                teamStats[match.TeamBId] = (  
                    teamStats[match.TeamAId].Wins,
                    teamStats[match.TeamAId].Losses + 1
                );
            }
            else if(match.ScoreB > match.ScoreA) {
                teamStats[match.TeamBId] = (
                    teamStats[match.TeamBId].Wins + 1,
                    teamStats[match.TeamBId].Losses
                );
                
                teamStats[match.TeamAId] = (
                    teamStats[match.TeamAId].Wins,
                    teamStats[match.TeamAId].Losses + 1
                );
            }
        }

        var teamResponses = teams.Select(team => new TeamResponse {
            Id = team.Id,
            Name = team.Name,
            Country = team.Country,
            Region = team.Region,
            LogoUrl = team.LogoUrl,

            Players = players.Where(player => player.TeamId == team.Id).Select(player => new PlayerSummary {
                Id = player.Id,
                Name = player.Name,
                ImageUrl = player.ImageUrl,
            }).ToList(),

            Wins = teamStats[team.Id].Wins,
            Losses = teamStats[team.Id].Losses,
        }).OrderByDescending(team => team.Wins).ThenBy(team => team.Losses).ToList();

        for(var index = 0; index < teamResponses.Count; index++) {
            teamResponses[index].Ranking = index + 1;
        }

        return teamResponses;
    }

    public async Task<TeamDetailsResponse?> GetTeamByIdAsync(int id) {
        var team = await _context.Teams
        .AsNoTracking()
        .FirstOrDefaultAsync(team => team.Id == id);

        if (team is null)
        {
            return null;
        }

        var players = await _context.Players
            .AsNoTracking()
            .Where(player => player.TeamId == id)
            .ToListAsync();

        var finishedMatches = await _context.Matches
            .AsNoTracking()
            .Where(match => match.Status == MatchStatus.Finished)
            .ToListAsync();

        var teamStats = _context.Teams
            .AsNoTracking()
            .ToDictionary(
                team => team.Id,
                team => (Wins: 0, Losses: 0));

        foreach (var match in finishedMatches)
        {
            if (match.ScoreA > match.ScoreB)
            {
                teamStats[match.TeamAId] =
                    (teamStats[match.TeamAId].Wins + 1,
                    teamStats[match.TeamAId].Losses);

                teamStats[match.TeamBId] =
                    (teamStats[match.TeamBId].Wins,
                    teamStats[match.TeamBId].Losses + 1);
            }
            else if (match.ScoreB > match.ScoreA)
            {
                teamStats[match.TeamAId] =
                    (teamStats[match.TeamAId].Wins,
                    teamStats[match.TeamAId].Losses + 1);

                teamStats[match.TeamBId] =
                    (teamStats[match.TeamBId].Wins + 1,
                    teamStats[match.TeamBId].Losses);
            }
        }

        var orderedTeams = teamStats
            .OrderByDescending(stats => stats.Value.Wins)
            .ThenBy(stats => stats.Value.Losses)
            .ToList();

        var ranking = orderedTeams.FindIndex(
            stats => stats.Key == id) + 1;

        var wins = teamStats[id].Wins;
        var losses = teamStats[id].Losses;

        var totalMatches = wins + losses;

        var winRate = totalMatches == 0
            ? 0
            : (double)wins / totalMatches * 100;

        var matches = await _context.Matches
            .AsNoTracking()
            .Include(match => match.TeamA)
            .Include(match => match.TeamB)
            .Include(match => match.Tournament)
            .Where(match =>
                match.TeamAId == id ||
                match.TeamBId == id)
            .OrderByDescending(match => match.StartTime)
            .ToListAsync();

        var matchResponses = matches
        .Select(match => new MatchResponse
        {
            Id = match.Id,

            TeamA = new TeamSummary
            {
                Id = match.TeamA.Id,
                Name = match.TeamA.Name,
                Region = match.TeamA.Region,
                LogoUrl = match.TeamA.LogoUrl
            },

            TeamB = new TeamSummary
            {
                Id = match.TeamB.Id,
                Name = match.TeamB.Name,
                Region = match.TeamB.Region,
                LogoUrl = match.TeamB.LogoUrl
            },

            TournamentId = match.TournamentId,
            TournamentName = match.Tournament.Name,

            Status = match.Status,
            Format = match.Format,

            StartTime = match.StartTime,
            EndTime = match.EndTime,

            ScoreA = match.ScoreA,
            ScoreB = match.ScoreB
        })
        .ToList();

        return new TeamDetailsResponse
        {
            Id = team.Id,
            Name = team.Name,
            Country = team.Country,
            Region = team.Region,
            LogoUrl = team.LogoUrl,

            Players = players
                .Select(player => new PlayerSummary
                {
                    Id = player.Id,
                    Name = player.Name,
                    ImageUrl = player.ImageUrl,
                    Nationality = player.Nationality,
                    TeamRole = player.TeamRole
                })
                .ToList(),

            Wins = wins,
            Losses = losses,
            Ranking = ranking,
            WinRate = winRate,

            Matches = matchResponses
        };
    }

    public async Task<List<StandingResponse>> GetStandingsAsync()
    {
        var teams = await _context.Teams
            .AsNoTracking()
            .ToListAsync();

        var teamStats = await GetTeamStatsAsync();

        var standings = teams
            .Select(team =>
            {
                var stats = teamStats[team.Id];

                var matchesPlayed =
                    stats.Wins + stats.Losses;

                var points =
                    stats.Wins * 3;

                var totalMatches = stats.Wins + stats.Losses;

                var winRate = totalMatches == 0
                    ? 0
                    : stats.Wins / totalMatches * 100;

                return new
                {
                    Team = team,
                    Wins = stats.Wins,
                    Losses = stats.Losses,
                    MatchesPlayed = matchesPlayed,
                    Points = points,
                    WinRate = winRate
                };
            })
            .OrderByDescending(x => x.Points)
            .ThenByDescending(x => x.Wins)
            .ThenBy(x => x.Losses)
            .ThenBy(x => x.Team.Name)
            .Select((x, index) => new StandingResponse
            {
                Rank = index + 1,
                TeamId = x.Team.Id,
                TeamName = x.Team.Name,
                Region = x.Team.Region,
                LogoUrl = x.Team.LogoUrl,
                MatchesPlayed = x.MatchesPlayed,
                Wins = x.Wins,
                Losses = x.Losses,
                Points = x.Points,
                WinRate = x.WinRate
            })
            .ToList();

        return standings;
    }

    public async Task<Team> CreateTeamAsync(CreateTeamRequest request) {
        var team = new  Team {
            Name = request.Name,
            Country = request.Country,
            Region = request.Region,
            LogoUrl = request.LogoUrl,
            CreatedAt = DateTime.UtcNow
        };

        _context.Teams.Add(team);
        await _context.SaveChangesAsync();
        return team;
    }

    public async Task<Team?> UpdateTeamAsync(int id, UpdateTeamRequest request) {
        var team = await _context.Teams.FirstOrDefaultAsync(t => t.Id == id);

        if(team is null) {
            return null;
        }

        team.Name = request.Name;
        team.Country = request.Country;
        team.Region = request.Region;
        team.LogoUrl = request.LogoUrl;

        await _context.SaveChangesAsync();
        return team;
    }

    public async Task<bool> DeleteTeamAsync(int id) {
        var team = await _context.Teams.FirstOrDefaultAsync(t => t.Id == id);

        if(team is null) {
            return false;
        }

        _context.Teams.Remove(team);
        await _context.SaveChangesAsync();
        return true;
    }

    private async Task<Dictionary<int, (int Wins, int Losses)>> GetTeamStatsAsync()
    {
        var teams = await _context.Teams
            .AsNoTracking()
            .Select(team => team.Id)
            .ToListAsync();

        var finishedMatches = await _context.Matches
            .AsNoTracking()
            .Where(match => match.Status == MatchStatus.Finished)
            .Select(match => new
            {
                match.TeamAId,
                match.TeamBId,
                match.ScoreA,
                match.ScoreB
            })
            .ToListAsync();

        var teamStats = teams.ToDictionary(
            teamId => teamId,
            teamId => (Wins: 0, Losses: 0));

        foreach (var match in finishedMatches)
        {
            if (match.ScoreA > match.ScoreB)
            {
                teamStats[match.TeamAId] =
                    (
                        teamStats[match.TeamAId].Wins + 1,
                        teamStats[match.TeamAId].Losses
                    );

                teamStats[match.TeamBId] =
                    (
                        teamStats[match.TeamBId].Wins,
                        teamStats[match.TeamBId].Losses + 1
                    );
            }
            else if (match.ScoreB > match.ScoreA)
            {
                teamStats[match.TeamAId] =
                    (
                        teamStats[match.TeamAId].Wins,
                        teamStats[match.TeamAId].Losses + 1
                    );

                teamStats[match.TeamBId] =
                    (
                        teamStats[match.TeamBId].Wins + 1,
                        teamStats[match.TeamBId].Losses
                    );
            }
        }

        return teamStats;
    }
}