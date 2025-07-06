using System;
using System.Collections.Generic;

namespace ScavengerHunt.ImageDownloader.Console.Persistance.Entities;

public partial class Player
{
    public Guid PlayerId { get; set; }

    public DateTime CreatedDate { get; set; }

    public string Name { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateTime StatusUpdatedAt { get; set; }

    public Guid FkHuntId { get; set; }

    public virtual Hunt FkHunt { get; set; } = null!;

    public virtual ICollection<PlayerToItem> PlayerToItems { get; set; } = new List<PlayerToItem>();
}
