using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScavengerHunt.WebApi.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class ItemsImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Items",
                type: "varbinary(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Items");
        }
    }
}
