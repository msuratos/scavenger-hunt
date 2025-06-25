using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ScavengerHunt.WebApi.Persistance.Entities;

namespace ScavengerHunt.WebApi.Persistance.Configurations
{
    public class PlayerConfiguration : IEntityTypeConfiguration<Player>
    {
        public void Configure(EntityTypeBuilder<Player> builder)
        {
            builder.HasKey(p => p.PlayerId);
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.CreatedDate).HasDefaultValueSql("GETDATE()");
            builder.Property(p => p.Status).IsRequired().HasDefaultValue("Not Started");
            builder.Property(p => p.StatusUpdatedAt).IsRequired().HasDefaultValueSql("GETDATE()");

            builder.HasOne(p => p.Hunt).WithMany(h => h.Players).HasForeignKey(p => p.FkHuntId).OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(p => p.Items).WithMany(n => n.Players).UsingEntity<PlayerToItem>(build =>
            {
                build.HasKey(key => key.PlayerToItemId);

                build.Property(prop => prop.PlayerToItemId).UseIdentityColumn();
                build.Property(prop => prop.FkItemId).IsRequired();
                build.Property(prop => prop.FkPlayerId).IsRequired();
                build.Property(prop => prop.CreatedDate).HasDefaultValueSql("GETDATE()");
                build.Property(prop => prop.ItemImage).IsRequired();
                build.Property(prop => prop.ItemGuessStatus).IsRequired().HasMaxLength(20).HasDefaultValue("Pending");

                build.HasOne(nav => nav.Player).WithMany(nav => nav.PlayerToItems).HasForeignKey(fk => fk.FkPlayerId).OnDelete(DeleteBehavior.NoAction);
                build.HasOne(nav => nav.Item).WithMany(nav => nav.PlayerToItems).HasForeignKey(fk => fk.FkItemId).OnDelete(DeleteBehavior.NoAction);
            });
        }
    }
}
