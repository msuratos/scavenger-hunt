namespace ScavengerHunt.WebApi.Dtos
{
    public class HuntDto
    {
        public Guid HuntId { get; set; } = Guid.Empty;
        public string Code { get; set; } = string.Empty;
        public DateTime? EndDate { get; set; }
        public DateTime? StartDate { get; set; }
        public string? Status { get; set; }
        public string? Subtitle { get; set; }
        public string? Title { get; set; }
    }
}