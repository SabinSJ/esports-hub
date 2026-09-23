using backend.Enums;

namespace backend.DTOs.Notifications;

public class NotificationDto
{
    public int Id { get; set; }

    public NotificationType Type { get; set; }

    public string Title { get; set; } = null!;
    public string Message { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? ReadAt { get; set; }

    public NotificationEntityType? RelatedEntityType { get; set; }
    public int? RelatedEntityId { get; set; }
}