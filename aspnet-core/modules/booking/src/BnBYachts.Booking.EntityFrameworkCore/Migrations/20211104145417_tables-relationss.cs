using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Booking.Migrations
{
    public partial class tablesrelationss : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NoOfAdults",
                table: "BoatelBookings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NoOfChildrens",
                table: "BoatelBookings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NoOfAdults",
                table: "BoatelBookings");

            migrationBuilder.DropColumn(
                name: "NoOfChildrens",
                table: "BoatelBookings");
        }
    }
}
