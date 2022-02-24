using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Payments.Migrations
{
    public partial class paymentcontractidadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsContract",
                table: "PaymentDetails",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsContract",
                table: "PaymentDetails");
        }
    }
}
