using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ScavengerHunt.ImageDownloader.Console.Persistance.Entities;

namespace ScavengerHunt.ImageDownloader.Console.Persistance;

public partial class HuntDbContext : DbContext
{
    public HuntDbContext()
    {
    }

    public HuntDbContext(DbContextOptions<HuntDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Hunt> Hunts { get; set; }

    public virtual DbSet<Item> Items { get; set; }

    public virtual DbSet<Player> Players { get; set; }

    public virtual DbSet<PlayerToItem> PlayerToItems { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=HuntDbContext");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Hunt>(entity =>
        {
            entity.Property(e => e.HuntId).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Code)
                .HasMaxLength(4)
                .HasDefaultValue("");
            entity.Property(e => e.CreatedBy).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValue("Not Started");
            entity.Property(e => e.SubTitle).HasMaxLength(100);
            entity.Property(e => e.Title).HasMaxLength(100);
        });

        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasIndex(e => e.FkHuntId, "IX_Items_FkHuntId");

            entity.Property(e => e.ItemId).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name).HasMaxLength(500);

            entity.HasOne(d => d.FkHunt).WithMany(p => p.Items).HasForeignKey(d => d.FkHuntId);
        });

        modelBuilder.Entity<Player>(entity =>
        {
            entity.HasIndex(e => e.FkHuntId, "IX_Players_FkHuntId");

            entity.Property(e => e.PlayerId).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Status).HasDefaultValue("Not Started");
            entity.Property(e => e.StatusUpdatedAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.FkHunt).WithMany(p => p.Players).HasForeignKey(d => d.FkHuntId);
        });

        modelBuilder.Entity<PlayerToItem>(entity =>
        {
            entity.HasIndex(e => e.FkItemId, "IX_PlayerToItems_FkItemId");

            entity.HasIndex(e => e.FkPlayerId, "IX_PlayerToItems_FkPlayerId");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.ItemGuessStatus)
                .HasMaxLength(20)
                .HasDefaultValue("Pending");
            entity.Property(e => e.ItemImage).HasDefaultValueSql("(0x)");

            entity.HasOne(d => d.FkItem).WithMany(p => p.PlayerToItems)
                .HasForeignKey(d => d.FkItemId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.FkPlayer).WithMany(p => p.PlayerToItems)
                .HasForeignKey(d => d.FkPlayerId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
