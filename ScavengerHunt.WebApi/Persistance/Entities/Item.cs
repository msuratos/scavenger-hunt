namespace ScavengerHunt.WebApi.Persistance.Entities
{
    public class Item
    {
        public Guid ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public byte[]? Image { get; set; }

        public Guid? FkHuntId { get; set; }
        public Hunt? Hunt { get; set; }

        public ICollection<Player> Players { get; set; } = new HashSet<Player>();
        public ICollection<PlayerToItem> PlayerToItems { get; set; } = new HashSet<PlayerToItem>();
    }
}