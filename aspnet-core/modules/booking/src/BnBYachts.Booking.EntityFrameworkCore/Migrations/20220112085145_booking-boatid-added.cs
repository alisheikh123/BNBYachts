using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Booking.Migrations
{
    public partial class bookingboatidadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BoatId",
                table: "EventBookings",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BoatId",
                table: "CharterBookings",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BoatId",
                table: "EventBookings");

            migrationBuilder.DropColumn(
                name: "BoatId",
                table: "CharterBookings");
        }
    }
}
