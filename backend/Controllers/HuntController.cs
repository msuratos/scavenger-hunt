using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Persistance;
using backend.Persistance.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
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
      await _context.Hunts.AddAsync(new Hunts { Hunt = huntDto.Hunt });
      await _context.SaveChangesAsync();

      return Created(nameof(HuntController), null);
    }

    [HttpGet]
    public async Task<IList<Hunts>> GetHunts()
    {
      _logger.LogInformation("Getting all the hunts");
      return await _context.Hunts.ToListAsync();
    }
  }
}
