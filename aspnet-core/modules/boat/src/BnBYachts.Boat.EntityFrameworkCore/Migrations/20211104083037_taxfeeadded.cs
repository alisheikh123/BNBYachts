using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Boat.Migrations
{
    public partial class taxfeeadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TaxFee",
                table: "Boats",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaxFee",
                table: "Boats");
        }
    }
}
