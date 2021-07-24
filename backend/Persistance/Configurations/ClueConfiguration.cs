using System;
using backend.Persistance.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Persistance.Configurations
{
    public class ClueConfiguration : IEntityTypeConfiguration<Clues>
    {
      public void Configure(EntityTypeBuilder<Clues> builder)
      {
        builder.HasKey(key => key.ClueId);
        builder.Property(prop => prop.Clue).IsRequired().HasMaxLength(500).IsUnicode();
        builder.Property(prop => prop.CreatedBy).HasMaxLength(50).IsUnicode();
        builder.Ignore(prop => prop.Hunt);

        builder.HasOne(nav => nav.Hunt).WithMany(many => many.Clues).HasForeignKey(fk => fk.FkHuntId);
      }
    }
}