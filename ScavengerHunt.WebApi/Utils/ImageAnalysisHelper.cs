using Azure.AI.Vision.ImageAnalysis;
using Azure;

namespace ScavengerHunt.WebApi.Utils
{
    public class AzureImageAnalysisResult
    {
        public List<string> Tags { get; set; } = [];
        public List<string> Objects { get; set; } = [];
        public List<string> People { get; set; } = [];
    }

    public class ImageAnalysisHelper
    {
        private readonly string _endpoint = string.Empty;
        private readonly string _key = string.Empty;
        private readonly ILogger<ImageAnalysisHelper> _logger;

        public ImageAnalysisHelper(ILogger<ImageAnalysisHelper> logger, IConfiguration configuration)
        {
            _logger = logger;
            _endpoint = configuration["Azure:Vision:Endpoint"] ?? _endpoint;
            _key = configuration["Azure:Vision:Key"] ?? _key;
        }

        public async Task<AzureImageAnalysisResult> AnalyzeImageAsync(Stream stream, CancellationToken cancellationToken = default)
        {
            // Create an Image Analysis client.
            ImageAnalysisClient client = new ImageAnalysisClient(new Uri(_endpoint), new AzureKeyCredential(_key));

            try
            {

                // Analyze the image with all visual features.
                ImageAnalysisResult result = await client.AnalyzeAsync(
                    BinaryData.FromStream(stream),
                    VisualFeatures.Tags | VisualFeatures.Objects | VisualFeatures.People,
                    cancellationToken: cancellationToken
                );

                _logger.LogInformation("Tags:");
                foreach (var tag in result.Tags.Values)
                    _logger.LogInformation("- {name}", tag.Name);

                _logger.LogInformation("Objects:");
                foreach (var obj in result.Objects.Values)
                    _logger.LogInformation("- {name}, Bounding Box: ${box}", obj.Tags.First().Name, obj.BoundingBox.ToString());

                _logger.LogInformation($" People:");
                foreach (DetectedPerson person in result.People.Values)
                    _logger.LogInformation("   Person: Bounding box {box}, Confidence: {confidence}", person.BoundingBox.ToString(), person.BoundingBox.ToString());

                return new AzureImageAnalysisResult {
                    Objects = result.Objects.Values.Select(o => o.Tags.First().Name).ToList(),
                    Tags = result.Tags.Values.Select(t => t.Name).ToList(),
                    People = result.People.Values.Select(p => p.BoundingBox.ToString()).ToList()
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }

        }
    }
}
