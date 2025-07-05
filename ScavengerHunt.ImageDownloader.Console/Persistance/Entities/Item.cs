using System;
using System.Collections.Generic;

namespace ScavengerHunt.ImageDownloader.Console.Persistance.Entities;

public partial class Item
{
    public Guid ItemId { get; set; }

    public string Name { get; set; } = null!;

    public Guid FkHuntId { get; set; }

    public byte[]? Image { get; set; }

    public virtual Hunt FkHunt { get; set; } = null!;

    public virtual ICollection<PlayerToItem> PlayerToItems { get; set; } = new List<PlayerToItem>();
}
