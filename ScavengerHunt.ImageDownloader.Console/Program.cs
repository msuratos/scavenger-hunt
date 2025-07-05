using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ScavengerHunt.ImageDownloader.Console.Persistance;

var builder = Host
    .CreateDefaultBuilder(args)
    .ConfigureServices((context, services) =>
    {
        var configuration = context.Configuration;
        services.AddDbContext<HuntDbContext>(opt => opt.UseSqlServer(configuration.GetConnectionString("HuntDbContext")));
    });

var host = builder.Build();

var logger = host.Services.GetRequiredService<ILogger<Program>>();
var dbContext = host.Services.GetRequiredService<HuntDbContext>();

await host.StartAsync();

// get the hunt code from arguments
if (args.Length < 1) throw new Exception("One argument is required. The argument is the hunt code");

var code = args[0];
if (string.IsNullOrEmpty(code)) throw new Exception("Argument can't be null or empty. The argument is the hunt code");

var huntId = dbContext.Hunts.SingleOrDefault(s => s.Code == code)?.HuntId;
if (huntId == null) throw new Exception("Could not find the hunt ID based on the code provided");

logger.LogInformation("Found hunt based on code {code}", code);
logger.LogInformation("Getting images from players for hunt ({huntId})", huntId);

var players = dbContext.Players.Include(i => i.PlayerToItems).Where(w => w.FkHuntId == huntId);
if (!players.Any()) throw new Exception("There are no players in hunt");

foreach (var player in players)
{
    if (!player.PlayerToItems.Any())
    {
        logger.LogWarning($"There are no images for player ({player.Name}) in hunt");
        continue;
    }

    logger.LogInformation("Downloading images from player ({playerName})", player.Name);

    // create directory for player
    var directory = Directory.CreateDirectory(@$"{Directory.GetCurrentDirectory()}\{player.Name}");

    foreach (var item in player.PlayerToItems)
    {
        // copy the image to the directory
        var fileStream = File.Create(@$"{directory.FullName}\{Guid.NewGuid()}.png");
        fileStream.Write(item.ItemImage);
        fileStream.Close();
    }    
}

await host.StopAsync();