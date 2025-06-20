namespace ScavengerHunt.WebApi.Persistance.Entities
{
    public class Hunt
    {
        public Guid HuntId { get; set; }
        public string Code { get; set; } = string.Empty;    // unique code for the hunt, used for joining hunts
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.MinValue;
        public DateTime? EndDateTime { get; set; }
        public DateTime? StartDateTime { get; set; }
        public string Status { get; set; } = "Not Started"; // only 4 states: Not Started, In Progress, Completed, Pending
        public string SubTitle { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;

        public ICollection<Item> Items { get; set; } = new HashSet<Item>();
        public ICollection<Player> Players { get; set; } = new HashSet<Player>();
    }
}