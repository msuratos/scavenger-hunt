namespace ScavengerHunt.WebApi.Persistance.Entities
{
    public class PlayerToItem
    {
        public int PlayerToItemId { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public string ItemGuess { get; set; } = string.Empty;
        public string Status { get; set;} = "Pending";  // should only be three states: Pending, Correct, Incorrect

        public Guid FkItemId { get; set; }
        public Item? Item { get; set; }

        public Guid FkPlayerId { get; set; }
        public Player? Player { get; set; }
    }
}
