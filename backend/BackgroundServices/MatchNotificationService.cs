using backend.Data;
using backend.Enums;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.BackgroundServices;

public class MatchNotificationService : BackgroundService {
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<MatchNotificationService> _logger;
   
    private readonly TimeSpan CheckInterval = TimeSpan.FromMinutes(1);
    private readonly TimeSpan NotificationWindow = TimeSpan.FromHours(1);

    public MatchNotificationService(
        IServiceScopeFactory scopeFactory,
        ILogger<MatchNotificationService> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken) {
        _logger.LogInformation("Match notification background service started.");

        while(!stoppingToken.IsCancellationRequested){
            try{
                await CheckUpcomingMatchesAsync(stoppingToken);
            } 
            catch(OperationCanceledException) when (stoppingToken.IsCancellationRequested) { break; }
            catch(Exception exception) {
                _logger.LogError(
                    exception,
                    "An error occured while checking upcoming matches."
                );
            }

            await Task.Delay(CheckInterval, stoppingToken);
        }

        _logger.LogInformation("Match notification background service stopped");
    }
    
    private async Task CheckUpcomingMatchesAsync(
        CancellationToken cancellationToken)
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var notificationService =
            scope.ServiceProvider.GetRequiredService<INotificationService>();

        var now = DateTime.UtcNow;
        var notificationThreshold = now.Add(NotificationWindow);

        var upcomingMatches = await context.Matches
            .AsNoTracking()
            .Where(match =>
                match.StartTime > now &&
                match.StartTime <= notificationThreshold)
            .ToListAsync(cancellationToken);

        foreach (var match in upcomingMatches)
        {
            await CreateMatchStartingNotificationsAsync(
                match.Id,
                match.TeamAId,
                match.TeamBId,
                notificationService,
                context,
                cancellationToken);
        }
    }

    private async Task CreateMatchStartingNotificationsAsync(
        int matchId,
        int teamAId,
        int teamBId,
        INotificationService notificationService,
        AppDbContext context,
        CancellationToken cancellationToken)
    {
        var favoriteUserIds = await context.UserFavoriteTeams
            .AsNoTracking()
            .Where(favorite =>
                favorite.TeamId == teamAId ||
                favorite.TeamId == teamBId)
            .Select(favorite => favorite.UserId)
            .Distinct()
            .ToListAsync(cancellationToken);

        foreach (var userId in favoriteUserIds)
        {
            var notificationAlreadyExists = await context.Notifications
                .AsNoTracking()
                .AnyAsync(
                    notification =>
                        notification.UserId == userId &&
                        notification.Type == NotificationType.MatchStarting &&
                        notification.RelatedEntityType == NotificationEntityType.Match &&
                        notification.RelatedEntityId == matchId &&
                        notification.DeletedAt == null,
                    cancellationToken);

            if (notificationAlreadyExists)
                continue;

            await notificationService.CreateAsync(
                userId,
                NotificationType.MatchStarting,
                "Match starting soon",
                "A match involving one of your favorite teams starts in 1 hour.",
                NotificationEntityType.Match,
                matchId);
        }
    }
}