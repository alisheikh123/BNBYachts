using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Boat.Migrations
{
    public partial class safeoptionadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSafetyOption",
                table: "Rules",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSafetyOption",
                table: "Rules");
        }
    }
}
