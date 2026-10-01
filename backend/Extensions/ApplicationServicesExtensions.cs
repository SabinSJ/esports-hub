using backend.BackgroundServices;
using backend.Services;
using backend.Services.Interfaces;
using System.Text.Json.Serialization;

namespace backend.Extensions;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Business Services
        services.AddScoped<TeamService>();
        services.AddScoped<PlayerService>();
        services.AddScoped<TournamentService>();
        services.AddScoped<MatchService>();
        services.AddScoped<AuthService>();
        services.AddScoped<JwtService>();
        services.AddScoped<UserService>();
        services.AddScoped<INotificationService, NotificationService>();

        // Hosted Services
        services.AddHostedService<MatchNotificationService>();

        // SignalR & OpenAPI
        services.AddSignalR();
        services.AddOpenApi();

        return services;
    }

    public static IServiceCollection AddCustomCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("Frontend", policy =>
            {
                policy
                    .WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        return services;
    }
}
