using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ScavengerHunt.WebApi.Persistance.Entities;

namespace ScavengerHunt.WebApi.Persistance.Configurations
{
    public class HuntConfiguration : IEntityTypeConfiguration<Hunt>
    {
        public void Configure(EntityTypeBuilder<Hunt> builder)
        {
            builder.HasKey(key => key.HuntId);

            builder.Property(prop => prop.HuntId).HasDefaultValueSql("NEWID()");
            builder.Property(prop => prop.CreatedBy).IsRequired().HasMaxLength(50);
            builder.Property(prop => prop.CreatedDate).IsRequired().HasDefaultValueSql("GETDATE()");
            builder.Property(prop => prop.EndDateTime).IsRequired().HasDefaultValueSql("DATEADD(DAY, 1, GETDATE())");
            builder.Property(prop => prop.StartDateTime).IsRequired().HasDefaultValueSql("GETDATE()");
            builder.Property(prop => prop.SubTitle).IsRequired().IsUnicode().HasMaxLength(100);
            builder.Property(prop => prop.Title).IsRequired().IsUnicode().HasMaxLength(100);

            builder.HasMany(hunt => hunt.Items).WithOne(item => item.Hunt).HasForeignKey(item => item.FkHuntId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}