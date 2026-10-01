using backend.Data;
using backend.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Extensions;

public static class DatabaseExtensions
{
    public static IServiceCollection AddDatabaseConfiguration(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString, npgsqlOptions => 
            {
                npgsqlOptions.MapEnum<TeamRole>("team_role");
                npgsqlOptions.MapEnum<TournamentStatus>("tournament_status");
                npgsqlOptions.MapEnum<MatchStatus>("match_status");
                npgsqlOptions.MapEnum<MatchFormat>("match_format");
            }));

        return services;
    }
}
