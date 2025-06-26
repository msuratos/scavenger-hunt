using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScavengerHunt.WebApi.Dtos;
using ScavengerHunt.WebApi.Persistance;

namespace ScavengerHunt.WebApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ModeratorController : ControllerBase
    {
        private readonly ILogger<ModeratorController> _logger;
        private readonly HuntDbContext _dbContext;

        public ModeratorController(ILogger<ModeratorController> logger, HuntDbContext dbContex)
        {
            _logger = logger;
            _dbContext = dbContex;
        }

        [HttpGet("next")]
        public IActionResult GetNextPendingPlayerImage()
        {
            _logger.LogDebug("Getting next pending player image");

            // Get the first pending player image
            var pendingImage = _dbContext.PlayerToItems
                .Include(i => i.Item)
                .Include(i => i.Player)
                .Where(pi => pi.ItemGuessStatus == "Pending")
                .OrderBy(pi => pi.CreatedDate)
                .FirstOrDefault();

            if (pendingImage == null)
            {
                return NotFound("No pending player images found.");
            }

            // Return the image data and metadata
            return Ok(new
            {
                ItemId = pendingImage.FkItemId,
                ItemName = pendingImage.Item!.Name,
                PlayerId = pendingImage.FkPlayerId,
                PlayerName = pendingImage.Player!.Name,
                PlayerImage = Convert.ToBase64String(pendingImage.ItemImage!),
                HuntImage = Convert.ToBase64String(pendingImage.Item!.Image!)
            });
        }

        [HttpPost("review")]
        public async Task<IActionResult> ReviewPlayerImage([FromBody]ModeratorReviewDto request)
        {
            // validate request
            if (request.ItemId == null || request.PlayerId == null)
            {
                return BadRequest("Item ID and Player ID are required.");
            }

            _logger.LogDebug("Reviewing player {PlayerId} image with ID: {ImageId}", request.PlayerId, request.ItemId);

            // Find the player image by ID
            var playerImage = _dbContext.PlayerToItems.FirstOrDefault(pi => 
                pi.FkItemId == request.ItemId
                && pi.FkPlayerId == request.PlayerId
                && pi.ItemGuessStatus == "Pending"
            );

            if (playerImage == null)
            {
                return NotFound("Player image not found or already reviewed.");
            }

            // Update the status based on the review
            playerImage.ItemGuessStatus = request.Approved ? "Correct" : "Incorrect";
            await _dbContext.SaveChangesAsync();

            return Ok("Player image reviewed successfully.");
        }
    }
}
