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
        public async Task<IActionResult> CreateHunt([FromBody] HuntDto huntDto)
        {
            _logger.LogInformation($"Creating new hunt: {huntDto.Title}");

            // validate request
            if (string.IsNullOrEmpty(huntDto.Title)) return BadRequest("Hunt title is required.");
            if (huntDto.EndDate == null) return BadRequest("Hunt end date is required.");
            if (huntDto.StartDate == null) return BadRequest("Hunt start date is required.");

            await _context.Hunts.AddAsync(new Hunt { 
                EndDateTime = huntDto.EndDate.HasValue ? huntDto.EndDate.Value.ToLocalTime() : huntDto.EndDate,
                StartDateTime = huntDto.StartDate.HasValue ? huntDto.StartDate.Value.ToLocalTime() : huntDto.StartDate,
                SubTitle = huntDto.Subtitle ?? string.Empty,    // TODO: change entity to accept nulls
                Title = huntDto.Title,
                CreatedBy = "system",                           // TODO: replace with actual user
                CreatedDate = DateTime.Now
            });

            await _context.SaveChangesAsync();

            return Created(nameof(HuntController), huntDto);
        }

        [HttpGet]
        public async Task<IList<Hunt>> GetHunts()
        {
            _logger.LogInformation("Getting all the hunts");
            return await _context.Hunts.OrderBy(o => o.CreatedDate).ToListAsync();
        }
    }
}
