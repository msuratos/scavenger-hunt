using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Persistance.Migrations
{
    public partial class AddClueHuntRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Clues_FkHuntId",
                table: "Clues",
                column: "FkHuntId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clues_Hunts_FkHuntId",
                table: "Clues",
                column: "FkHuntId",
                principalTable: "Hunts",
                principalColumn: "HuntId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clues_Hunts_FkHuntId",
                table: "Clues");

            migrationBuilder.DropIndex(
                name: "IX_Clues_FkHuntId",
                table: "Clues");
        }
    }
}
