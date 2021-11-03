using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Boat.Migrations
{
    public partial class featuremodelchang : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsFeatures_Boats_HostBoatId",
                table: "BoatsFeatures");

            migrationBuilder.RenameColumn(
                name: "HostBoatId",
                table: "BoatsFeatures",
                newName: "BoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsFeatures_HostBoatId",
                table: "BoatsFeatures",
                newName: "IX_BoatsFeatures_BoatId");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsFeatures_Boats_BoatId",
                table: "BoatsFeatures",
                column: "BoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsFeatures_Boats_BoatId",
                table: "BoatsFeatures");

            migrationBuilder.RenameColumn(
                name: "BoatId",
                table: "BoatsFeatures",
                newName: "HostBoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsFeatures_BoatId",
                table: "BoatsFeatures",
                newName: "IX_BoatsFeatures_HostBoatId");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsFeatures_Boats_HostBoatId",
                table: "BoatsFeatures",
                column: "HostBoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
