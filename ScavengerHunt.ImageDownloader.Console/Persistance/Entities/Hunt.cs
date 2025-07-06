using System;
using System.Collections.Generic;

namespace ScavengerHunt.ImageDownloader.Console.Persistance.Entities;

public partial class Hunt
{
    public Guid HuntId { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public DateTime? EndDateTime { get; set; }

    public DateTime? StartDateTime { get; set; }

    public string Status { get; set; } = null!;

    public string SubTitle { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string Code { get; set; } = null!;

    public virtual ICollection<Item> Items { get; set; } = new List<Item>();

    public virtual ICollection<Player> Players { get; set; } = new List<Player>();
}
