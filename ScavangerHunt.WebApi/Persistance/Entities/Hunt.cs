namespace ScavengerHunt.WebApi.Persistance.Entities
{
    public class Hunt
    {
        public Guid HuntId { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.MinValue;
        public DateTime EndDateTime { get; set; } = DateTime.MinValue;
        public DateTime StartDateTime { get; set; } = DateTime.MinValue;
        public string SubTitle { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;

        public ICollection<Item> Items { get; set; } = new HashSet<Item>();
        public ICollection<Player> Players { get; set; } = new HashSet<Player>();
    }
}