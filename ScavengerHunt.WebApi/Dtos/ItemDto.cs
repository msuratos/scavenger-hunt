namespace ScavengerHunt.WebApi.Dtos
{
    public class ItemDto
    {
        public Guid ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Image { get; set; }
    }
}