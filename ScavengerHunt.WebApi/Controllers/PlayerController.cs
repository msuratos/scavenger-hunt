using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenCvSharp;
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

        [HttpGet("rankings")]
        public async Task<IActionResult> GetPlayerRankings(Guid huntId)
        {
            // validate request
            if (huntId == Guid.Empty) return BadRequest("Hunt ID is required.");
            _logger.LogDebug("Getting player rankings for hunt {huntId}", huntId);

            // get players for the hunt
            var players = await _dbContext.Players
                .Where(p => p.FkHuntId == huntId)
                .Include(p => p.PlayerToItems)
                 .Select(player => new
                 {
                     player.PlayerId,
                     player.Name,
                     Points = player.PlayerToItems.Select(s => s.ItemGuessStatus == "Correct" ? 3 : s.ItemGuessStatus == "Pending" ? 2 : 1).Sum()
                 })
                .OrderByDescending(p => p.Points)
                .ToListAsync();

            return Ok(players);
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

            // Determine if the item image from player matches with the item image in items table
            var item = await _dbContext.Items.SingleOrDefaultAsync(s => s.ItemId == itemId && s.FkHuntId == huntId);
            if (item == null || item.Image == null) return NotFound("Item not found in the database.");

            double mse = CompareImages(item.Image, memoryStream.ToArray());
            _logger.LogInformation("Player's ({playerId}) image MSE value {mse}", playerId, mse);

            // Define a threshold for similarity (this can be adjusted)
            //   If the image is similar but not exact, mark as "Pending" as it will be sent to moderators
            const double notSimilarThreshold = 1000.0;
            const double looselySimilarThreshold = 200.0;
            var itemGuessStatus = "Incorrect";

            if (mse > notSimilarThreshold) itemGuessStatus = "Incorrect";
            else if (mse < notSimilarThreshold && mse > looselySimilarThreshold) itemGuessStatus = "Pending";
            else itemGuessStatus = "Correct";

            player.PlayerToItems.Add(new PlayerToItem
            {
                CreatedDate = DateTime.Now,
                FkItemId = itemId,
                FkPlayerId = playerId!.Value,
                ItemGuessStatus = itemGuessStatus,
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

        private static double CompareImages(byte[] path1, byte[] path2)
        {
            using var img1 = Cv2.ImDecode(path1, ImreadModes.AnyColor | ImreadModes.AnyDepth | ImreadModes.IgnoreOrientation);
            using var img2 = Cv2.ImDecode(path2, ImreadModes.AnyColor | ImreadModes.AnyDepth | ImreadModes.IgnoreOrientation);

            // Resize img2 to match img1 if needed
            if (img1.Size() != img2.Size())
            {
                using var resized = new Mat();
                Cv2.Resize(img2, resized, img1.Size());
                img2.Dispose();
                return CompareMSE(img1, resized);
            }
            else
            {
                return CompareMSE(img1, img2);
            }
        }

        private static double CompareMSE(Mat img1, Mat img2)
        {
            using var diff = new Mat();
            Cv2.Absdiff(img1, img2, diff);
            var diffSquared = diff.Mul(diff);
            Scalar sum = Cv2.Sum(diffSquared);
            double mse = sum.Val0 / (img1.Rows * img1.Cols);
            return mse; // Lower is more similar (0 means identical)
        }
    }
}
