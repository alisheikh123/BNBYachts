using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Boat.Migrations
{
    public partial class addboatentityid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BoatId",
                table: "BoatsRules");

            migrationBuilder.DropColumn(
                name: "BoatId",
                table: "BoatsGallery");

            migrationBuilder.DropColumn(
                name: "BoatId",
                table: "BoatsFeatures");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BoatId",
                table: "BoatsRules",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BoatId",
                table: "BoatsGallery",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BoatId",
                table: "BoatsFeatures",
                type: "int",
                nullable: true);
        }
    }
}
