using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScavengerHunt.WebApi.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Hunts",
                columns: table => new
                {
                    HuntId = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    EndDateTime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "DATEADD(DAY, 1, GETDATE())"),
                    StartDateTime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    SubTitle = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hunts", x => x.HuntId);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ClueId = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    Name = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    FkHuntId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ClueId);
                    table.ForeignKey(
                        name: "FK_Items_Hunts_FkHuntId",
                        column: x => x.FkHuntId,
                        principalTable: "Hunts",
                        principalColumn: "HuntId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    PlayerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2025, 6, 2, 1, 50, 27, 641, DateTimeKind.Utc).AddTicks(6543)),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FkHuntId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.PlayerId);
                    table.ForeignKey(
                        name: "FK_Players_Hunts_FkHuntId",
                        column: x => x.FkHuntId,
                        principalTable: "Hunts",
                        principalColumn: "HuntId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlayerToItems",
                columns: table => new
                {
                    PlayerToItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    ItemGuess = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "Pending"),
                    FkItemId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ItemClueId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    FkPlayerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PlayerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerToItems", x => x.PlayerToItemId);
                    table.ForeignKey(
                        name: "FK_PlayerToItems_Items_ItemClueId",
                        column: x => x.ItemClueId,
                        principalTable: "Items",
                        principalColumn: "ClueId");
                    table.ForeignKey(
                        name: "FK_PlayerToItems_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "PlayerId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_FkHuntId",
                table: "Items",
                column: "FkHuntId");

            migrationBuilder.CreateIndex(
                name: "IX_Players_FkHuntId",
                table: "Players",
                column: "FkHuntId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerToItems_ItemClueId",
                table: "PlayerToItems",
                column: "ItemClueId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerToItems_PlayerId",
                table: "PlayerToItems",
                column: "PlayerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayerToItems");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "Hunts");
        }
    }
}
