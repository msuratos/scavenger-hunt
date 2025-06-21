using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScavengerHunt.WebApi.Dtos;
using ScavengerHunt.WebApi.Persistance;
using System.Threading.Tasks;

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

        [HttpGet("item")]
        public async Task<IActionResult> GetItemForPlayer(Guid huntId)
        {
            _logger.LogDebug("Getting item for player");

            // valid parameters
            if (huntId == Guid.Empty) return BadRequest("Hunt ID is required");

            var playerId = GetPlayerIdFromCookie();
            if (playerId == null) return BadRequest("Player ID can't be determined.");

            var player = await _dbContext.Players.Include(i => i.PlayerToItems).SingleOrDefaultAsync(s => s.PlayerId == playerId && s.FkHuntId == huntId);
            if (player == null) return BadRequest("Player can't be found");

            // get items by sort
            ItemDto? itemDto = null;
            var items = await _dbContext.Items.Where(w => w.FkHuntId == huntId).ToListAsync();
            foreach (var item in items)
            {
                // if player already has submitted an item, get the next item
                if (player.PlayerToItems.Any(a => a.FkItemId == item.ItemId)) continue;
                itemDto = new ItemDto { ItemId = item.ItemId, Name = item.Name };
            }

            // if itemDto is null, then that means they finished
            if (itemDto == null) return Ok();

            return Ok(itemDto);
        }

        [HttpGet("details")]
        public IActionResult GetPlayerDetails(Guid huntId)
        {
            _logger.LogDebug("Getting player details");

            // valid parameters
            if (huntId == Guid.Empty) return BadRequest("Hunt ID is required");

            var playerId = GetPlayerIdFromCookie();
            if (playerId == null) return BadRequest("Player ID can't be determined.");

            // check if player exists in the database
            var player = _dbContext.Players.SingleOrDefault(s => s.PlayerId == playerId && s.FkHuntId == huntId);
            if (player != null)
            {
                var playerDto = new { player.PlayerId, player.Name };
                return Ok(playerDto);
            }
            else
            {
                return NotFound("Player not found in the database.");
            }
        }

        [HttpGet("isvalid")]
        public IActionResult IsPlayerValid()
        {
            _logger.LogDebug("Checking player validity");

            // check player-id cookie
            if (!Request.Cookies.Any(c => c.Key == "player-id")) return BadRequest();

            var playerId = Request.Cookies["player-id"];
            if (GetPlayerIdFromCookie() != null) return Ok();

            return BadRequest("Player ID can't be determined");
        }

        private Guid? GetPlayerIdFromCookie()
        {
            // check player-id cookie
            if (!Request.Cookies.Any(c => c.Key == "player-id")) return null;

            var playerId = Request.Cookies["player-id"];
            if (Guid.TryParse(playerId, out var guid))
            {
                return guid;
            }

            return null;
        }
    }
}
