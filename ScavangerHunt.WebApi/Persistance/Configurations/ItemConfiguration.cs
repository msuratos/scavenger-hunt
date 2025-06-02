using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ScavengerHunt.WebApi.Persistance.Entities;

namespace ScavengerHunt.WebApi.Persistance.Configurations
{
    public class ItemConfiguration : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder.HasKey(key => key.ItemId);

            builder.Property(prop => prop.ItemId).HasDefaultValueSql("NEWID()");
            builder.Property(prop => prop.Name).IsRequired().IsUnicode().HasMaxLength(500);
            builder.Property(prop => prop.FkHuntId).IsRequired();

            builder.HasOne(nav => nav.Hunt).WithMany(many => many.Items).HasForeignKey(fk => fk.FkHuntId);
        }
    }
}