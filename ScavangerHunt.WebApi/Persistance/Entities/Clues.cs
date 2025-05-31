using System;

namespace ScavengerHunt.WebApi.Persistance.Entities
{
    public class Clues
    {
        public Guid ClueId { get; set; }
        public Guid? FkHuntId { get; set; }
        public string CreatedBy { get; set; }
        public string Clue { get; set; }
        public string Image { get; set; }

        public Hunts Hunt { get; set; }
    }
}