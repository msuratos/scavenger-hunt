using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScavengerHunt.WebApi.Persistance;

namespace ScavengerHunt.WebApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ILogger<DashboardController> _logger;
        private readonly HuntDbContext _dbContext;

        public DashboardController(ILogger<DashboardController> logger, HuntDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpGet("playerimages")]
        public async Task<IActionResult> GetPlayerImages(Guid huntId, DateTime? lastFetchedDate)
        {
            // validate request parameters
            if (huntId == Guid.Empty) return BadRequest("Hunt ID cannot be empty.");

            try
            {
                var players = await _dbContext.Players.Where(w => w.FkHuntId == huntId).Select(s => s.PlayerId).ToListAsync();
                var nextPlayerImage = await _dbContext.PlayerToItems
                    .Where(w => players.Contains(w.FkPlayerId) && w.ItemGuessStatus == "Correct" && (lastFetchedDate == null || w.CreatedDate > lastFetchedDate))
                    .Include(i => i.Player)
                    .Include(i => i.Item)
                    .Select(p => new
                    {
                        p.FkItemId,
                        p.CreatedDate,
                        p.ItemImage,
                        Item = p.Item!.Name,
                        Player = p.Player!.Name
                    })
                    .OrderBy(o => o.CreatedDate)
                    .Select(s => new { s.CreatedDate, s.ItemImage, s.Item, s.Player })
                    .FirstOrDefaultAsync();

                if (nextPlayerImage == null) return NoContent();
                else return Ok(nextPlayerImage);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving player images");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving player images.");
            }
        }
    }
}
