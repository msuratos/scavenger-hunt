using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ScavengerHunt.WebApi.Persistance.Entities;

namespace ScavengerHunt.WebApi.Persistance.Configurations
{
    public class HuntConfiguration : IEntityTypeConfiguration<Hunts>
    {
        public void Configure(EntityTypeBuilder<Hunts> builder)
        {
            builder.HasKey(key => key.HuntId);
            builder.Property(prop => prop.Hunt).IsRequired().HasMaxLength(25);
        }
    }
}