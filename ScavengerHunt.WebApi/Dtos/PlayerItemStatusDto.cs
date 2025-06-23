namespace ScavengerHunt.WebApi.Dtos
{
    public sealed class PlayerItemStatusDto
    {
        public Guid ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;  // e.g., "Not Started", "In Progress", "Completed"
    }
}
