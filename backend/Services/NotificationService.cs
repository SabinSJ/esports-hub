using backend.Data;
using backend.Enums;
using backend.Entities;
using backend.Hubs;
using backend.DTOs.Notifications;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class NotificationService : INotificationService
{
    private readonly AppDbContext _context;
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationService(AppDbContext context, IHubContext<NotificationHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    public async Task<List<NotificationDto>> GetUserNotificationsAsync(int userId)
    {
        return await _context.Notifications
            .AsNoTracking()
            .Where(n => n.UserId == userId && n.DeletedAt == null)
            .OrderByDescending(n => n.CreatedAt)
            .Select(n => new NotificationDto
            {
                Id = n.Id,
                Type = n.Type,
                Title = n.Title,
                Message = n.Message,
                CreatedAt = n.CreatedAt,
                ReadAt = n.ReadAt,
                RelatedEntityType = n.RelatedEntityType,
                RelatedEntityId = n.RelatedEntityId
            })
            .ToListAsync();
    }

    public async Task<bool> MarkAsReadAsync(int notificationId, int userId)
    {
        var notification = await _context.Notifications
            .FirstOrDefaultAsync(n =>
                n.Id == notificationId &&
                n.UserId == userId &&
                n.DeletedAt == null);

        if (notification == null)
            return false;

        if (notification.ReadAt == null)
        {
            notification.ReadAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }

        return true;
    }

    public async Task MarkAllAsReadAsync(int userId)
    {
        var notifications = await _context.Notifications
            .Where(n =>
                n.UserId == userId &&
                n.DeletedAt == null &&
                n.ReadAt == null)
            .ToListAsync();

        if (notifications.Count == 0)
            return;

        var readAt = DateTime.UtcNow;

        foreach (var notification in notifications)
        {
            notification.ReadAt = readAt;
        }

        await _context.SaveChangesAsync();
    }

    public async Task<bool> DeleteAsync(int notificationId, int userId)
    {
        var notification = await _context.Notifications
            .FirstOrDefaultAsync(n =>
                n.Id == notificationId &&
                n.UserId == userId &&
                n.DeletedAt == null);

        if (notification == null)
            return false;

        notification.DeletedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<NotificationDto> CreateAsync (
        int userId,
        NotificationType type,
        string title,
        string message,
        NotificationEntityType? relatedEntityType = null,
        int? relatedEntityId = null
    ) {
        var notification = new Notification {
            UserId = userId,
            Type = type,
            Title = title,
            Message = message,
            CreatedAt = DateTime.UtcNow,
            RelatedEntityType = relatedEntityType,
            RelatedEntityId = relatedEntityId
        };

        _context.Notifications.Add(notification);

        await _context.SaveChangesAsync();

        var notificationDto = new NotificationDto {
            Id = notification.Id,
            Type = notification.Type,
            Title = notification.Title,
            Message = notification.Message,
            CreatedAt = notification.CreatedAt,
            ReadAt = notification.ReadAt,
            RelatedEntityType = notification.RelatedEntityType,
            RelatedEntityId = notification.RelatedEntityId
        };

        await _hubContext.Clients
            .User(userId.ToString())
            .SendAsync("NotificationReceived", notificationDto);

        return notificationDto;
    }
}