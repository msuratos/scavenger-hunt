using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Persistance.Migrations
{
    public partial class AddImageEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clues",
                columns: table => new
                {
                    ClueId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FkHuntId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Clue = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Image = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clues", x => x.ClueId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clues");
        }
    }
}
