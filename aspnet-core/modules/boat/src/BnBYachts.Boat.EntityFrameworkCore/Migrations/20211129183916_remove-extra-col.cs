using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Boat.Migrations
{
    public partial class removeextracol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BoatId",
                table: "Rules");

            migrationBuilder.DropColumn(
                name: "BoatId",
                table: "Features");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BoatId",
                table: "Rules",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BoatId",
                table: "Features",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
