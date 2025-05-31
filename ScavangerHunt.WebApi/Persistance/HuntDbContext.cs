using System;
using Microsoft.EntityFrameworkCore;
using ScavengerHunt.WebApi.Persistance.Configurations;
using ScavengerHunt.WebApi.Persistance.Entities;

namespace ScavengerHunt.WebApi.Persistance
{
    public class HuntDbContext : DbContext
    {
        public HuntDbContext() { }
        public HuntDbContext(DbContextOptions options) : base(options) { }

        public virtual DbSet<Clues> Clues { get; set; }
        public virtual DbSet<Hunts> Hunts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
                options.UseSqlServer("Name=HuntDbContext");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(typeof(HuntConfiguration).Assembly);
        }
    }
}