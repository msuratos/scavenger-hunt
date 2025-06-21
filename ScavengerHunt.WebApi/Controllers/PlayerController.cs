using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScavengerHunt.WebApi.Persistance;

namespace ScavengerHunt.WebApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly ILogger<PlayerController> _logger;
        private readonly HuntDbContext _dbContext;

        public PlayerController(ILogger<PlayerController> logger, HuntDbContext context)
        {
            _logger = logger;
            _dbContext = context;
        }

        [HttpGet("isvalid")]
        public IActionResult IsPlayerValid()
        {
            // check player-id cookie
            if (!Request.Cookies.Any(c => c.Key == "player-id")) return BadRequest();

            var playerId = Request.Cookies["player-id"];
            if (Guid.TryParse(playerId, out var guid))
            {
                // check if player exists in the database
                var playerExists = _dbContext.Players.Any(p => p.PlayerId == guid);
                if (playerExists)
                    return Ok();
                else
                    return NotFound("Player not found in the database.");
            }

            return BadRequest("Player ID not in correct format.");
        }
    }
}
