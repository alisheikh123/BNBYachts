using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Boat.Migrations
{
    public partial class modelchangess : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSafetyRule",
                table: "Rules");

            migrationBuilder.AddColumn<bool>(
                name: "IsSafetyFeature",
                table: "Features",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSafetyFeature",
                table: "Features");

            migrationBuilder.AddColumn<bool>(
                name: "IsSafetyRule",
                table: "Rules",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
