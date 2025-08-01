﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ScavengerHunt.WebApi.Persistance;

#nullable disable

namespace ScavengerHunt.WebApi.Persistance.Migrations
{
    [DbContext(typeof(HuntDbContext))]
    [Migration("20250625015827_PlayerItemImage")]
    partial class PlayerItemImage
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ScavengerHunt.WebApi.Persistance.Entities.Hunt", b =>
                {
                    b.Property<Guid>("HuntId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(4)
                        .HasColumnType("nvarchar(4)");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GETDATE()");

                    b.Property<DateTime?>("EndDateTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("StartDateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasDefaultValue("Not Started");

                    b.Property<string>("SubTitle")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("HuntId");

                    b.ToTable("Hunts");
                });

            modelBuilder.Entity("ScavengerHunt.WebApi.Persistance.Entities.Item", b =>
                {
                    b.Property<Guid>("ItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<Guid?>("FkHuntId")
                        .IsRequired()
                        .HasColumnType("uniqueidentifier");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(500)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(500)");

                    b.HasKey("ItemId");

                    b.HasIndex("FkHuntId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("ScavengerHunt.WebApi.Persistance.Entities.Player", b =>
                {
                    b.Property<Guid>("PlayerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GETDATE()");

                    b.Property<Guid>("FkHuntId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)")
                        .HasDefaultValue("Not Started");

                    b.Property<DateTime>("StatusUpdatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GETDATE()");

                    b.HasKey("PlayerId");

                    b.HasIndex("FkHuntId");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("ScavengerHunt.WebApi.Persistance.Entities.PlayerToItem", b =>
                {
                    b.Property<int>("PlayerToItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PlayerToItemId"));

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GETDATE()");

                    b.Property<Guid>("FkItemId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("FkPlayerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ItemGuessStatus")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasDefaultValue("Pending");

                    b.Property<byte[]>("ItemImage")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.HasKey("PlayerToItemId");

                    b.HasIndex("FkItemId");

                    b.HasIndex("FkPlayerId");

                    b.ToTable("PlayerToItems");
                });

            modelBuilder.Entity("ScavengerHunt.WebApi.Persistance.Entities.Item", b =>
                {
                    b.HasOne("ScavengerHunt.WebApi.Persistance.Entities.Hunt", "Hunt")
                        .WithMany("Items")
                        .HasForeignKey("FkHuntId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Hunt");
                });

            modelBuilder.Entity("ScavengerHunt.WebApi.Persistance.Entities.Player", b =>
                {
                    b.HasOne("ScavengerHunt.WebApi.Persistance.Entities.Hunt", "Hunt")
                        .WithMany("Players")
                        .HasForeignKey("FkHuntId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Hunt");
                });

            modelBuilder.Entity("ScavengerHunt.WebApi.Persistance.Entities.PlayerToItem", b =>
                {
                    b.HasOne("ScavengerHunt.WebApi.Persistance.Entities.Item", "Item")
                        .WithMany("PlayerToItems")
                        .HasForeignKey("FkItemId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("ScavengerHunt.WebApi.Persistance.Entities.Player", "Player")
                        .WithMany("PlayerToItems")
                        .HasForeignKey("FkPlayerId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Item");

                    b.Navigation("Player");
                });

            modelBuilder.Entity("ScavengerHunt.WebApi.Persistance.Entities.Hunt", b =>
                {
                    b.Navigation("Items");

                    b.Navigation("Players");
                });

            modelBuilder.Entity("ScavengerHunt.WebApi.Persistance.Entities.Item", b =>
                {
                    b.Navigation("PlayerToItems");
                });

            modelBuilder.Entity("ScavengerHunt.WebApi.Persistance.Entities.Player", b =>
                {
                    b.Navigation("PlayerToItems");
                });
#pragma warning restore 612, 618
        }
    }
}
