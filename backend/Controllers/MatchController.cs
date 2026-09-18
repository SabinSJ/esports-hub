using backend.Entities;
using backend.Services;
using backend.DTOs.Matches;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MatchesController : ControllerBase {
    private readonly MatchService _matchService;

    public MatchesController(MatchService matchService)
    {
        _matchService = matchService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Match>>> GetAllMatches()
    {
        var matches = await _matchService.GetAllMatchesAsync();
        return Ok(matches);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Match>> GetMatchById(int id)
    {
        var match = await _matchService.GetMatchByIdAsync(id);

        if (match is null)
        {
            return NotFound();
        }

        return Ok(match);
    }

    [HttpPost]
    public async Task<ActionResult<Match>> Create(CreateMatchRequest request)
    {
        var match = await _matchService.CreateMatchAsync(request);

        return CreatedAtAction(nameof(GetMatchById), new { id = match.Id }, match);
    }

    [HttpPost("bulk")]
    public async Task<ActionResult<List<Match>>> CreateBulk(
        List<CreateMatchRequest> requests)
    {
        var matches = await _matchService.CreateBulkAsync(requests);

        return Ok(matches);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Match>> Update(int id, UpdateMatchRequest request)
    {
        var match = await _matchService.UpdateMatchAsync(id, request);

        if (match is null)
        {
            return NotFound();
        }

        return Ok(match);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _matchService.DeleteMatchAsync(id);

        if (!success)
        {
            return NotFound();
        }

        return NoContent();
    }
}