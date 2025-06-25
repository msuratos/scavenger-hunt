using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScavengerHunt.WebApi.Dtos;
using ScavengerHunt.WebApi.Persistance;
using ScavengerHunt.WebApi.Persistance.Entities;

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

        [HttpGet("items")]
        public async Task<IActionResult> GetItemsStatusForPlayer(Guid huntId)
        {
            _logger.LogDebug("Getting item for player");

            // valid parameters
            if (huntId == Guid.Empty) return BadRequest("Hunt ID is required");

            var playerId = GetPlayerIdFromCookie();
            if (playerId == null) return BadRequest("Player ID can't be determined.");

            var player = await _dbContext.Players.Include(i => i.PlayerToItems).SingleOrDefaultAsync(s => s.PlayerId == playerId && s.FkHuntId == huntId);
            if (player == null) return BadRequest("Player can't be found");

            // get items by sort
            IList<PlayerItemStatusDto> playerItems = new List<PlayerItemStatusDto>();
            var items = await _dbContext.Items.Where(w => w.FkHuntId == huntId).ToListAsync();
            foreach (var item in items)
            {
                var playerItem = new PlayerItemStatusDto
                {
                    ItemId = item.ItemId,
                    Name = item.Name
                };

                // check if player has this item
                var playerToItem = player.PlayerToItems.SingleOrDefault(s => s.FkItemId == item.ItemId);
                if (playerToItem != null)
                    playerItem.Status = playerToItem.ItemGuessStatus; // "Not Started", "In Progress", "Completed"
                else
                    playerItem.Status = "Not Started"; // default status if not found

                playerItems.Add(playerItem);
            }

            return Ok(playerItems);
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

        [HttpPost("item")]
        public async Task<IActionResult> UploadItemImageForPlayer(Guid huntId, CancellationToken cancellationToken = default)
        {
            // validate player cookie
            var playerId = GetPlayerIdFromCookie();
            if (playerId == Guid.Empty) return BadRequest("Player ID can't be determined.");

            // validate hunt ID
            if (huntId == Guid.Empty) return BadRequest("Hunt ID is required.");

            // check if player exists in the database
            var player = await _dbContext.Players.SingleOrDefaultAsync(s => s.PlayerId == playerId && s.FkHuntId == huntId);
            if (player == null) return NotFound("Player not found in the database.");

            _logger.LogDebug("Uploading item image for player");

            // Get the IFormFeature and read the form
            var formFeature = Request.HttpContext.Features.GetRequiredFeature<IFormFeature>();
            var form = await formFeature.ReadFormAsync(cancellationToken);

            // Validate form data
            if (form == null || !form.Any()) return BadRequest("Form data is required");
            if (!form.ContainsKey("itemId")) return BadRequest("Item ID is required");
            if (!form.Files.Any()) return BadRequest("Image of item is required");

            var itemIdString = form.First(f => f.Key == "itemId").Value;
            var itemId = Guid.Parse(itemIdString.First()!);
            var file = form.Files.Single();

            // TODO: extension validation
            // TODO: file signature validation
            // TODO: file size limit validation

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream, cancellationToken);

            player.PlayerToItems.Add(new PlayerToItem
            {
                CreatedDate = DateTime.Now,
                FkItemId = itemId,
                FkPlayerId = playerId!.Value,
                ItemGuessStatus = "Correct",    // TODO: this should be calculated if image matches to item
                ItemImage = memoryStream.ToArray()
            });
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Ok();
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
