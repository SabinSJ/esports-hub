using backend.Entities;
using backend.Services;
using backend.DTOs.Teams;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController: ControllerBase {
    private readonly UserService _userService;

    public UserController(UserService userService) {
        _userService = userService;
    }

    [Authorize]
    [HttpGet("favorites/teams")]
    public async Task<ActionResult<List<TeamResponse>>> GetFavoriteTeams()
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        var teams = await _userService.GetFavoriteTeamsAsync(userId);

        return Ok(teams);
    }
  
    [Authorize]
    [HttpGet("favorites/teams/{teamId}")]
    public async Task<ActionResult<bool>> IsFavoriteTeam(int teamId)
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        var isFavorite = await _userService.IsFavoriteTeamAsync(
            userId,
            teamId
        );

        return Ok(isFavorite);
    }

    [Authorize]
    [HttpPost("favorites/teams/{teamId}")]
    public async Task<IActionResult> AddFavoriteTeam(int teamId) {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        await _userService.AddFavoriteTeamAsync(userId, teamId);

        return NoContent();
    }
  
    [Authorize]
    [HttpDelete("favorites/teams/{teamId}")]
    public async Task<IActionResult> RemoveFavoriteTeam(int teamId) {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!

        );

        await _userService.RemoveFavoriteTeamAsync(userId, teamId);

        return NoContent();
    }

}