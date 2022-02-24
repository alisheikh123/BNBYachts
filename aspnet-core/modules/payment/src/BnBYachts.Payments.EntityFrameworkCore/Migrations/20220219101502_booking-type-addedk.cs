using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Payments.Migrations
{
    public partial class bookingtypeaddedk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BookingType",
                table: "PaymentDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "PaymentDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookingType",
                table: "PaymentDetails");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "PaymentDetails");
        }
    }
}
