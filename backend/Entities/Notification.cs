using backend.Enums;

namespace backend.Entities;

public class Notification
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public NotificationType Type { get; set; }

    public string Title { get; set; } = null!;
    public string Message { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? ReadAt { get; set; }
    public DateTime? DeletedAt { get; set; }

    public NotificationEntityType? RelatedEntityType { get; set; }
    public int? RelatedEntityId { get; set; }

    public DateTime? ScheduledFor { get; set; }
    public DateTime? SentAt { get; set; }
    public DateTime? ExpiresAt { get; set; }
}