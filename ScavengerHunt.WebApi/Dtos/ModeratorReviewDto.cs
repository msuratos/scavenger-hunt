namespace ScavengerHunt.WebApi.Dtos
{
    public sealed class ModeratorReviewDto
    {
        public Guid? ItemId { get; set; }
        public Guid? PlayerId { get; set; }
        public bool Approved { get; set; }
    }
}
