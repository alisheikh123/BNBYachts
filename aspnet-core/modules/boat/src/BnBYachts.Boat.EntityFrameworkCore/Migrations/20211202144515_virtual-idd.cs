using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Boat.Migrations
{
    public partial class virtualidd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Charteres_Boats_BoatEntityId",
                table: "Charteres");

            migrationBuilder.RenameColumn(
                name: "BoatEntityId",
                table: "Charteres",
                newName: "BoatId");

            migrationBuilder.RenameIndex(
                name: "IX_Charteres_BoatEntityId",
                table: "Charteres",
                newName: "IX_Charteres_BoatId");

            migrationBuilder.AddForeignKey(
                name: "FK_Charteres_Boats_BoatId",
                table: "Charteres",
                column: "BoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Charteres_Boats_BoatId",
                table: "Charteres");

            migrationBuilder.RenameColumn(
                name: "BoatId",
                table: "Charteres",
                newName: "BoatEntityId");

            migrationBuilder.RenameIndex(
                name: "IX_Charteres_BoatId",
                table: "Charteres",
                newName: "IX_Charteres_BoatEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Charteres_Boats_BoatEntityId",
                table: "Charteres",
                column: "BoatEntityId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
