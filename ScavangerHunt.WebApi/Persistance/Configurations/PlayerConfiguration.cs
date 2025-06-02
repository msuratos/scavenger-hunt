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
            builder.Property(p => p.CreatedDate).HasDefaultValue(DateTime.UtcNow);

            builder.HasOne(p => p.Hunt).WithMany(h => h.Players).HasForeignKey(p => p.FkHuntId).OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(p => p.Items).WithMany(n => n.Players).UsingEntity<PlayerToItem>(builder =>
            {
                builder.HasKey(key => key.PlayerToItemId);

                builder.Property(prop => prop.PlayerToItemId).UseIdentityColumn();
                builder.Property(prop => prop.FkItemId).IsRequired();
                builder.Property(prop => prop.FkPlayerId).IsRequired();
                builder.Property(prop => prop.CreatedDate).HasDefaultValueSql("GETDATE()");
                builder.Property(prop => prop.ItemGuess).IsRequired().HasMaxLength(500);
                builder.Property(prop => prop.Status).IsRequired().HasMaxLength(20).HasDefaultValue("Pending");
            });
        }
    }
}
