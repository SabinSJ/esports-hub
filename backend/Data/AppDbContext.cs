using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Team> Teams { get; set; }
    public DbSet<Player> Players { get; set; }
    public DbSet<Tournament> Tournaments { get; set; }
    public DbSet<Match> Matches { get; set; }
    public DbSet<Map> Maps { get; set; }
    public DbSet<MatchMap> MatchMaps { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Match>()
            .HasOne(m => m.TeamA)
            .WithMany()
            .HasForeignKey(m => m.TeamAId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Match>()
            .HasOne(m => m.TeamB)
            .WithMany()
            .HasForeignKey(m => m.TeamBId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Match>()
            .HasOne(m => m.Tournament)
            .WithMany()
            .HasForeignKey(m => m.TournamentId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<MatchMap>()
            .HasOne(matchMap => matchMap.Match)
            .WithMany(match => match.Maps)
            .HasForeignKey(matchMap => matchMap.MatchId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<MatchMap>()
            .HasOne(matchMap => matchMap.Map)
            .WithMany(map => map.MatchMaps)
            .HasForeignKey(matchMap => matchMap.MapId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}