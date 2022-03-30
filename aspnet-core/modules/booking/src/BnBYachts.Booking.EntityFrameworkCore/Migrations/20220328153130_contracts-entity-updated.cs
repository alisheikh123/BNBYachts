using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Booking.Migrations
{
    public partial class contractsentityupdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CharterId",
                table: "Contracts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EventId",
                table: "Contracts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCustomType",
                table: "Contracts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CharterId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "IsCustomType",
                table: "Contracts");
        }
    }
}
