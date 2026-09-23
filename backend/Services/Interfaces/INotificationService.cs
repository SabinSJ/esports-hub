using backend.Enums;
using backend.DTOs.Notifications;

namespace backend.Services.Interfaces;

public interface INotificationService
{
    Task<List<NotificationDto>> GetUserNotificationsAsync(int userId);

    Task<bool> MarkAsReadAsync(int notificationId, int userId);

    Task MarkAllAsReadAsync(int userId);

    Task<bool> DeleteAsync(int notificationId, int userId);

    Task<NotificationDto> CreateAsync(
        int userId,
        NotificationType type,
        string title, 
        string message,
        NotificationEntityType? relatedEntityType = null,
        int? relatedEntityId = null
    );
}