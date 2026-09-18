using backend.Data;
using backend.Entities;
using backend.DTOs.Players;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class PlayerService {
    private readonly AppDbContext _context;

    public PlayerService(AppDbContext context) {
        _context = context;
    }

    public async Task<List<Player>> GetAllPlayersAsync() {
        return await _context.Players
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Player?> GetPlayerByIdAsync(int id) {
        return await _context.Players
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Player> CreatePlayerAsync(CreatePlayerRequest request) {
        var player = new Player {
            Name = request.Name,
            TeamRole = request.TeamRole,
            Nationality = request.Nationality,
            ImageUrl = request.ImageUrl,
            TeamId = request.TeamId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Players.Add(player);
        await _context.SaveChangesAsync();
        return player;
    }

    public async Task<Player?> UpdatePlayerAsync(int id, UpdatePlayerRequest request) {
        var player = await _context.Players.FirstOrDefaultAsync(p => p.Id == id);

        if(player is null) {
            return null;
        }

        player.Name = request.Name;
        player.TeamRole = request.TeamRole;
        player.Nationality = request.Nationality;
        player.ImageUrl = request.ImageUrl;
        player.TeamId = request.TeamId;
        await _context.SaveChangesAsync();
        return player;
    }

    public async Task<bool> DeletePlayerAsync(int id) {
        var player = await _context.Players.FirstOrDefaultAsync(p => p.Id == id);

        if(player is null) {
            return false;
        }

        _context.Players.Remove(player);
        await _context.SaveChangesAsync();
        return true;
    }
}