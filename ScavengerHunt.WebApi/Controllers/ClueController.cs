using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ScavengerHunt.WebApi.Persistance.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ScavengerHunt.WebApi.Dtos;
using ScavengerHunt.WebApi.Persistance;

namespace ScavengerHunt.WebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ClueController : ControllerBase
    {
        private readonly ILogger<ClueController> _logger;
        private readonly HuntDbContext _context;

        public ClueController(ILogger<ClueController> logger, HuntDbContext context)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> CreateClue(Guid? id, [FromBody] ClueDto clueDto)
        {
            _logger.LogInformation($"Creating clue for hunt: {id}");
            if (id == null || id == Guid.Empty) return NotFound();
            if (!await _context.Hunts.AnyAsync(a => a.HuntId == id)) return NotFound();

            await _context.Items.AddAsync(new Item
            {
                Name = clueDto.Clue,
                FkHuntId = id
            });
            await _context.SaveChangesAsync();

            return Created(nameof(ClueController), null);
        }

        [HttpGet]
        [Route("getclue/{clueId:Guid}")]
        public async Task<IActionResult> GetClue(Guid clueId)
        {
            _logger.LogInformation($"Getting clue: {clueId}");
            if (clueId == Guid.Empty) return NotFound();

            return Ok(await _context.Items.SingleOrDefaultAsync(s => s.ItemId == clueId));
        }

        [HttpGet]
        [Route("{huntId:Guid}")]
        public async Task<IActionResult> GetClues(Guid huntId)
        {
            _logger.LogInformation($"Getting clues for hunt: {huntId}");
            if (huntId == null || huntId == Guid.Empty) return NotFound();

            return Ok(await _context.Items.Where(w => w.FkHuntId == huntId).ToListAsync());
        }
    }
}