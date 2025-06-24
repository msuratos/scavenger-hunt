using ScavengerHunt.WebApi.Persistance.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScavengerHunt.WebApi.Persistance;
using Microsoft.AspNetCore.Http.Features;

namespace ScavengerHunt.WebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly ILogger<ItemController> _logger;
        private readonly HuntDbContext _context;

        public ItemController(ILogger<ItemController> logger, HuntDbContext context)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        [Route("{huntid:guid}")]
        public async Task<IActionResult> CreateItem(Guid? huntId, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation($"Creating item for hunt: {huntId}");
            if (huntId == null || huntId == Guid.Empty) return NotFound();
            if (!await _context.Hunts.AnyAsync(a => a.HuntId == huntId)) return NotFound();

            // Get the IFormFeature and read the form
            var formFeature = Request.HttpContext.Features.GetRequiredFeature<IFormFeature>();
            await formFeature.ReadFormAsync(cancellationToken);

            // Access the uploaded file (example: first file)
            var name = Request.Form.SingleOrDefault(f => f.Key == "name").Value;
            if (string.IsNullOrEmpty(name)) return BadRequest("Item name is required");

            var file = Request.Form.Files.SingleOrDefault();
            if (file == null) return BadRequest("Image of item is required");

            // TODO: extension validation
            // TODO: file signature validation
            // TODO: file size limit validation

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream, cancellationToken);

            await _context.Items.AddAsync(new Item
            {
                Name = name,
                FkHuntId = huntId,
                Image = memoryStream.ToArray()
            });
            await _context.SaveChangesAsync();

            return Created(nameof(ItemController), new { name, huntId });
        }

        [HttpGet]
        [Route("getitem/{itemId:Guid}")]
        public async Task<IActionResult> GetItem(Guid itemId)
        {
            _logger.LogInformation($"Getting item: {itemId}");
            if (itemId == Guid.Empty) return NotFound();

            return Ok(await _context.Items.SingleOrDefaultAsync(s => s.ItemId == itemId));
        }

        [HttpGet]
        [Route("{huntId:Guid}")]
        public async Task<IActionResult> GetItems(Guid huntId)
        {
            _logger.LogInformation($"Getting items for hunt: {huntId}");
            if (huntId == Guid.Empty) return NotFound();

            return Ok(await _context.Items.Where(w => w.FkHuntId == huntId).ToListAsync());
        }
    }
}