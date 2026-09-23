using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotificationController : ControllerBase
{
    private readonly INotificationService _notificationService;

    public NotificationController(INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetNotifications()
    {
        var userId = GetCurrentUserId();

        if (userId == null)
            return Unauthorized();

        var notifications =
            await _notificationService.GetUserNotificationsAsync(userId.Value);

        return Ok(notifications);
    }

    [HttpPatch("{id}/read")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        var userId = GetCurrentUserId();

        if (userId == null)
            return Unauthorized();

        var success =
            await _notificationService.MarkAsReadAsync(id, userId.Value);

        if (!success)
            return NotFound();

        return NoContent();
    }

    [HttpPatch("read-all")]
    public async Task<IActionResult> MarkAllAsRead()
    {
        var userId = GetCurrentUserId();

        if (userId == null)
            return Unauthorized();

        await _notificationService.MarkAllAsReadAsync(userId.Value);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = GetCurrentUserId();

        if (userId == null)
            return Unauthorized();

        var success =
            await _notificationService.DeleteAsync(id, userId.Value);

        if (!success)
            return NotFound();

        return NoContent();
    }

    private int? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (int.TryParse(userIdClaim, out var userId))
            return userId;

        return null;
    }
}