using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScavengerHunt.WebApi.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class HuntCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Hunts",
                type: "nvarchar(4)",
                maxLength: 4,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Hunts");
        }
    }
}
