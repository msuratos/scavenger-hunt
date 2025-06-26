using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
                ImageId = pendingImage.FkItemId,
                ItemName = pendingImage.Item!.Name,
                PlayerId = pendingImage.FkPlayerId,
                PlayerName = pendingImage.Player!.Name,
                PlayerImage = Convert.ToBase64String(pendingImage.ItemImage!),
                HuntImage = Convert.ToBase64String(pendingImage.Item!.Image!)
            });
        }
    }
}
