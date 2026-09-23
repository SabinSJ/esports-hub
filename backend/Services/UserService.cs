using backend.Data;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UserService {
    private readonly AppDbContext _context;

    public UserService(AppDbContext context) {
        _context = context;
    }

    public async Task<List<Team>> GetFavoriteTeamsAsync(int userId)
    {
        return await _context.UserFavoriteTeams
            .Where(f => f.UserId == userId)
            .Include(f => f.Team)
            .Select(f => f.Team)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<bool> IsFavoriteTeamAsync(int userId, int teamId)
    {
        return await _context.UserFavoriteTeams
            .AnyAsync(f =>
                f.UserId == userId &&
                f.TeamId == teamId);
    }

    public async Task AddFavoriteTeamAsync(int userId, int teamId) {    
        var teamExists = await _context.Teams
            .AnyAsync(t => t.Id == teamId);

        if(!teamExists){
            throw new KeyNotFoundException("Team not found.");
        }

        var alreadyFavorite = await _context.UserFavoriteTeams
            .AnyAsync(f => 
                f.UserId == userId &&
                f.TeamId == teamId
            );

        if(alreadyFavorite){
            return;
        }

        var favorite = new UserFavoriteTeam{
            UserId = userId,
            TeamId = teamId,
            CreatedAt = DateTime.UtcNow
        };

        _context.UserFavoriteTeams.Add(favorite);

        await _context.SaveChangesAsync();
    }

    public async Task RemoveFavoriteTeamAsync(int userId, int teamId) {
        var favorite = await _context.UserFavoriteTeams
            .FirstOrDefaultAsync(f =>
                f.UserId == userId &&
                f.TeamId == teamId);

        if (favorite is null)
            return;

        _context.UserFavoriteTeams.Remove(favorite);

        await _context.SaveChangesAsync();
    }

}