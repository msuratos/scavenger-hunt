using System;
using System.Collections.Generic;

namespace ScavengerHunt.ImageDownloader.Console.Persistance.Entities;

public partial class PlayerToItem
{
    public int PlayerToItemId { get; set; }

    public DateTime CreatedDate { get; set; }

    public string ItemGuessStatus { get; set; } = null!;

    public Guid FkItemId { get; set; }

    public Guid FkPlayerId { get; set; }

    public byte[] ItemImage { get; set; } = null!;

    public virtual Item FkItem { get; set; } = null!;

    public virtual Player FkPlayer { get; set; } = null!;
}
