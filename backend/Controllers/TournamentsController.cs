using backend.Entities;
using backend.Services;
using backend.DTOs.Tournaments;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TournamentsController: ControllerBase {
    private readonly TournamentService _tournamentService;

    public TournamentsController(TournamentService tournamentService) {
        _tournamentService = tournamentService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Tournament>>> GetAllTournaments() {
        var tournaments = await _tournamentService.GetAllTournamentsAsync();
        return Ok(tournaments);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Tournament>> GetTournamentById(int id) {
        var tournament = await _tournamentService.GetTournamentByIdAsync(id);

        if(tournament is null) {
            return NotFound();
        }

        return Ok(tournament);
    }

    [HttpPost]
    public async Task<ActionResult<Tournament>> Create(CreateTournamentRequest request) {
       var tournament = await _tournamentService.CreateTournamentAsync(request);

       return CreatedAtAction(nameof(GetTournamentById), new { id = tournament.Id }, tournament);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Tournament>> Update(int id, UpdateTournamentRequest request) {
        var tournament = await _tournamentService.UpdateTournamentAsync(id, request);

        if(tournament is null) {
            return NotFound();
        }

        return Ok(tournament);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id) {
        var success = await _tournamentService.DeleteTournamentAsync(id);

        if(!success) {
            return NotFound();
        }

        return NoContent();
    }
}