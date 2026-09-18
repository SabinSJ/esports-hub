using backend.Entities;
using backend.Services;
using backend.DTOs.Players;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlayersController: ControllerBase {
    private readonly PlayerService _playerService;

    public PlayersController(PlayerService playerService) {
        _playerService = playerService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Player>>> GetAllPlayers() {
        var players = await _playerService.GetAllPlayersAsync();
        return Ok(players);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Player>> GetPlayerById(int id) {
        var player = await _playerService.GetPlayerByIdAsync(id);

        if(player is null) {
            return NotFound();
        }

        return Ok(player);
    }

    [HttpPost]
    public async Task<ActionResult<Player>> Create(CreatePlayerRequest request) {
       var player = await _playerService.CreatePlayerAsync(request);

       return CreatedAtAction(nameof(GetPlayerById), new { id = player.Id }, player);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Player>> Update(int id, UpdatePlayerRequest request) {
        var player = await _playerService.UpdatePlayerAsync(id, request);

        if(player is null) {
            return NotFound();
        }

        return Ok(player);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id) {
        var success = await _playerService.DeletePlayerAsync(id);

        if(!success) {
            return NotFound();
        }

        return NoContent();
    }
}