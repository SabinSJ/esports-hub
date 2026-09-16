using backend.Data;
using backend.Entities;
using backend.DTOs.Teams;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class TeamService {
    private readonly AppDbContext _context;

    public TeamService(AppDbContext context) {
        _context = context;
    }

    public async Task<List<Team>> GetAllTeamsAsync() {
        return await _context.Teams.
            AsNoTracking()
            .ToListAsync();
    }

    public async Task<Team?> GetTeamByIdAsync(int id) {
        return await _context.Teams
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<Team> CreateTeamAsync(CreateTeamRequest request) {
        var team = new  Team {
            Name = request.Name,
            Country = request.Country,
            Region = request.Region,
            LogoUrl = request.LogoUrl
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
}