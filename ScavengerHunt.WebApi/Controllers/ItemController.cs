using ScavengerHunt.WebApi.Persistance.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScavengerHunt.WebApi.Dtos;
using ScavengerHunt.WebApi.Persistance;

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
        public async Task<IActionResult> CreateItem(Guid? huntId, [FromBody] ItemDto itemDto)
        {
            _logger.LogInformation($"Creating item for hunt: {huntId}");
            if (huntId == null || huntId == Guid.Empty) return NotFound();
            if (!await _context.Hunts.AnyAsync(a => a.HuntId == huntId)) return NotFound();

            await _context.Items.AddAsync(new Item
            {
                Name = itemDto.Name,
                FkHuntId = huntId
            });
            await _context.SaveChangesAsync();

            return Created(nameof(ItemController), itemDto);
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