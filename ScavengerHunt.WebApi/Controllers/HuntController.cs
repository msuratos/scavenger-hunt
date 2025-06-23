using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScavengerHunt.WebApi.Dtos;
using ScavengerHunt.WebApi.Persistance;
using ScavengerHunt.WebApi.Persistance.Entities;
using ScavengerHunt.WebApi.Utils;
using System.Text.Json;

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

            // generate code for players to join and verify that code has not been used if the hunt is still active
            var code = CodeGenerator.Generate();
            var existingCode = await _context.Hunts.AnyAsync(h => h.Code == code && h.EndDateTime > DateTime.Now);

            while (existingCode)
            {
                code = CodeGenerator.Generate();
                existingCode = await _context.Hunts.AnyAsync(h => h.Code == code && h.EndDateTime > DateTime.Now);
            }

            var hunt = await _context.Hunts.AddAsync(new Hunt { 
                EndDateTime = huntDto.EndDate.HasValue ? huntDto.EndDate.Value.ToLocalTime() : huntDto.EndDate,
                StartDateTime = huntDto.StartDate.HasValue ? huntDto.StartDate.Value.ToLocalTime() : huntDto.StartDate,
                SubTitle = huntDto.Subtitle ?? string.Empty,    // TODO: change entity to accept nulls
                Title = huntDto.Title,
                Code = code,
                CreatedBy = "system",                           // TODO: replace with actual user
                CreatedDate = DateTime.Now
            });

            await _context.SaveChangesAsync();
            huntDto.HuntId = hunt.Entity.HuntId;

            return Created(nameof(HuntController), huntDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetHunt(Guid? huntId, string? code)
        {
            // validate request
            if (huntId == null && string.IsNullOrEmpty(code)) return BadRequest("Either huntId or code must be provided.");
            _logger.LogInformation($"Getting hunt with huntId: {huntId}, code: {code}");

            // find hunt by huntId or code
            HuntDto? huntDto = null;
            if (huntId.HasValue)
            {
                var hunt = await _context.Hunts.FirstOrDefaultAsync(h => h.HuntId == huntId.Value);
                if (hunt != null && hunt.EndDateTime > DateTime.Now)
                {
                    huntDto = new HuntDto
                    {
                        HuntId = hunt.HuntId,
                        Title = hunt.Title,
                        Subtitle = hunt.SubTitle,
                        StartDate = hunt.StartDateTime,
                        EndDate = hunt.EndDateTime,
                        Status = hunt.Status
                    };
                }
            }
            else if (!string.IsNullOrEmpty(code))
            {
                var hunt2 = await _context.Hunts.FirstOrDefaultAsync(h => h.Code == code && h.EndDateTime > DateTime.Now);
                if (hunt2 != null)
                {
                    huntDto = new HuntDto
                    {
                        HuntId = hunt2.HuntId,
                        Title = hunt2.Title,
                        Subtitle = hunt2.SubTitle,
                        StartDate = hunt2.StartDateTime,
                        EndDate = hunt2.EndDateTime,
                        Status = hunt2.Status
                    };
                }
            }

            // check if hunt was found
            if (huntDto == null)
            {
                _logger.LogWarning($"Hunt not found with huntId: {huntId}, code: {code}");
                return NotFound("Hunt not found.");
            }

            _logger.LogInformation($"Hunt found: {JsonSerializer.Serialize(huntDto)}");
            return Ok(huntDto);
        }

        [HttpGet("all")]
        public async Task<IList<Hunt>> GetHunts()
        {
            _logger.LogInformation("Getting all the hunts");
            return await _context.Hunts.OrderBy(o => o.CreatedDate).ToListAsync();
        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinHunt([FromBody]JoinHuntDto joinHuntDto)
        {
            // validate request
            if (string.IsNullOrEmpty(joinHuntDto.Code) || joinHuntDto.Code.Length != 4) return BadRequest("Invalid hunt code. It must be 4 characters long.");
            if (string.IsNullOrEmpty(joinHuntDto.PlayerName)) return BadRequest("Player name is required.");

            _logger.LogInformation($"Player {joinHuntDto.PlayerName} is trying to join hunt with code {joinHuntDto.Code}");

            // check if hunt exists
            var hunt = await _context.Hunts.FirstOrDefaultAsync(h => h.Code == joinHuntDto.Code && h.EndDateTime > DateTime.Now);
            if (hunt == null)
            {
                _logger.LogWarning($"Hunt with code {joinHuntDto.Code} not found or has ended.");
                return NotFound("Hunt not found or has ended.");
            }

            // check if player has already joined
            var player = await _context.Players.FirstOrDefaultAsync(p => p.FkHuntId == hunt.HuntId && p.Name == joinHuntDto.PlayerName);
            if (player != null)
            {
                _logger.LogWarning($"Player {joinHuntDto.PlayerName} has already joined the hunt with code {joinHuntDto.Code}.");
                return BadRequest("You have already joined this hunt.");
            }

            // create new player
            var newPlayer = new Player
            {
                Name = joinHuntDto.PlayerName,
                FkHuntId = hunt.HuntId,
                CreatedDate = DateTime.Now
            };

            await _context.Players.AddAsync(newPlayer);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Player {joinHuntDto.PlayerName} successfully joined the hunt with code {joinHuntDto.Code}.");

            // set cookies
            Response.Cookies.Append("player-id", newPlayer.PlayerId.ToString(), new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = hunt.EndDateTime
            });

            return Ok(new { Message = "Successfully joined the hunt.", newPlayer.PlayerId, hunt.HuntId });
        }
    }
}
