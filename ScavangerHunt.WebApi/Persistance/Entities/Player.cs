namespace ScavengerHunt.WebApi.Persistance.Entities
{
    public class Player
    {
        public Guid PlayerId { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public string Name { get; set; } = string.Empty;
        // NOTE: track status? how to track who won first?

        public Guid FkHuntId { get; set; }
        public Hunt? Hunt { get; set; }

        public ICollection<Item> Items { get; set; } = new HashSet<Item>();
        public ICollection<PlayerToItem> PlayerToItems { get; set; } = new HashSet<PlayerToItem>();
    }
}
