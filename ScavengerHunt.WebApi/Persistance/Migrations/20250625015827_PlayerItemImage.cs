using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScavengerHunt.WebApi.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class PlayerItemImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemGuess",
                table: "PlayerToItems");

            migrationBuilder.AddColumn<byte[]>(
                name: "ItemImage",
                table: "PlayerToItems",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemImage",
                table: "PlayerToItems");

            migrationBuilder.AddColumn<string>(
                name: "ItemGuess",
                table: "PlayerToItems",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");
        }
    }
}
