namespace ScavengerHunt.WebApi.Persistance.Entities
{
    public class Player
    {
        public Guid PlayerId { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = "Not Started"; // only 4 states: Not Started, In Progress, Completed, Pending
        public DateTime StatusUpdatedAt { get; set; } = DateTime.UtcNow;

        public Guid FkHuntId { get; set; }
        public Hunt? Hunt { get; set; }

        public ICollection<Item> Items { get; set; } = new HashSet<Item>();
        public ICollection<PlayerToItem> PlayerToItems { get; set; } = new HashSet<PlayerToItem>();
    }
}
