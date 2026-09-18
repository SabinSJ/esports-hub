using backend.Data;
using backend.Entities;
using backend.DTOs.Tournaments;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class TournamentService {
    private readonly AppDbContext _context;

    public TournamentService(AppDbContext context) {
        _context = context;
    }

    public async Task<List<TournamentResponse?>> GetAllTournamentsAsync() {
        var matches = await _context.Matches
            .AsNoTracking()
            .Select(match => new {
                match.TeamAId,
                match.TeamBId,
                match.TournamentId
            })
            .ToListAsync();
        
        var matchesByTournament = matches.GroupBy(match => match.TournamentId);

        var teamCountsByTournament = new Dictionary<int, int>();

        foreach (var tournamentMatches in matchesByTournament)
        {
            var teamIds = tournamentMatches.
                SelectMany(match => new [] {
                    match.TeamAId,
                    match.TeamBId
                })
                .Distinct()
                .ToList();

            var teamCount = teamIds.Count;

            teamCountsByTournament[tournamentMatches.Key] = teamCount;
        }

        var tournaments = await _context.Tournaments
            .AsNoTracking()
            .ToListAsync();

        return tournaments.Select(t => new TournamentResponse
        {
            Id = t.Id,
            Name = t.Name,
            Status = t.Status,
            StartDate = t.StartDate,
            EndDate = t.EndDate,
            Region = t.Region,
            PrizePool = t.PrizePool,
            TeamCount = teamCountsByTournament.TryGetValue(t.Id, out var teamCount)
                ? teamCount
                : 0
        }).ToList();
    }

    public async Task<Tournament?> GetTournamentByIdAsync(int id) {
        return await _context.Tournaments
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<Tournament> CreateTournamentAsync(CreateTournamentRequest request) {
        var tournament = new Tournament {
            Name = request.Name,
            Status = request.Status,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Region = request.Region,
            City = request.City,
            Country = request.Country,
            PrizePool = request.PrizePool,
            CreatedAt = DateTime.UtcNow
        };

        _context.Tournaments.Add(tournament);
        await _context.SaveChangesAsync();

        return tournament;
    }

    public async Task<Tournament?> UpdateTournamentAsync(int id, UpdateTournamentRequest request) {
        var tournament = await _context.Tournaments.FirstOrDefaultAsync(t => t.Id == id);

        if(tournament is null) {
            return null;
        }

        tournament.Name = request.Name;
        tournament.Status = request.Status;
        tournament.StartDate = request.StartDate;
        tournament.EndDate = request.EndDate;
        tournament.Region = request.Region;
        tournament.City = request.City;
        tournament.Country = request.Country;
        tournament.PrizePool = request.PrizePool;

        await _context.SaveChangesAsync();
        return tournament;
    }

    public async Task<bool> DeleteTournamentAsync(int id) {
        var tournament = await _context.Tournaments.FirstOrDefaultAsync(t => t.Id == id);

        if(tournament is null) {
            return false;
        }

        _context.Tournaments.Remove(tournament);
        await _context.SaveChangesAsync();
        return true;
    }
}