using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Persistance.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Hunts",
                columns: table => new
                {
                    HuntId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Hunt = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hunts", x => x.HuntId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Hunts");
        }
    }
}
