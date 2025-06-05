using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ScavengerHunt.WebApi.Dtos;
using ScavengerHunt.WebApi.Persistance;
using ScavengerHunt.WebApi.Persistance.Entities;

namespace ScavengerHunt.WebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class HuntController : ControllerBase
    {
        private readonly ILogger<HuntController> _logger;
        private readonly HuntDbContext _context;

        public HuntController(ILogger<HuntController> logger, HuntDbContext context)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreateHunt(HuntDto huntDto)
        {
            _logger.LogInformation($"Creating new hunt: {huntDto.Hunt}");
            await _context.Hunts.AddAsync(new Hunt { Title = huntDto.Hunt });
            await _context.SaveChangesAsync();

            return Created(nameof(HuntController), null);
        }

        [HttpGet]
        public async Task<IList<Hunt>> GetHunts()
        {
            _logger.LogInformation("Getting all the hunts");
            return await _context.Hunts.ToListAsync();
        }
    }
}
