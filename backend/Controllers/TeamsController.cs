using backend.Entities;
using backend.Services;
using backend.DTOs.Teams;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamsController: ControllerBase {
    private readonly TeamService _teamService;

    public TeamsController(TeamService teamService) {
        _teamService = teamService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Team>>> GetAllTeams() {
        var teams = await _teamService.GetAllTeamsAsync();
        return Ok(teams);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Team>> GetTeamById(int id) {
        var team = await _teamService.GetTeamByIdAsync(id);

        if(team is null) {
            return NotFound();
        }

        return Ok(team);
    }

    [HttpGet("standings")]
    public async Task<ActionResult<List<StandingResponse>>> GetStandings()
    {
        var standings = await _teamService.GetStandingsAsync();

        return Ok(standings);
    }

    [HttpPost]
    public async Task<ActionResult<Team>> Create(CreateTeamRequest request) {
       var team = await _teamService.CreateTeamAsync(request);

       return CreatedAtAction(nameof(GetTeamById), new { id = team.Id }, team);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Team>> Update(int id, UpdateTeamRequest request) {
        var team = await _teamService.UpdateTeamAsync(id, request);

        if(team is null) {
            return NotFound();
        }

        return Ok(team);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id) {
        var success = await _teamService.DeleteTeamAsync(id);

        if(!success) {
            return NotFound();
        }

        return NoContent();
    }
}