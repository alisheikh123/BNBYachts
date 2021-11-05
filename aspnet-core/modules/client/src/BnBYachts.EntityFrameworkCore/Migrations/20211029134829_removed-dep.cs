using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Migrations
{
    public partial class removeddep : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsGallery_Boats_BoatId",
                table: "BoatsGallery");

            migrationBuilder.RenameColumn(
                name: "BoatId",
                table: "BoatsGallery",
                newName: "HostBoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsGallery_BoatId",
                table: "BoatsGallery",
                newName: "IX_BoatsGallery_HostBoatId");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsGallery_Boats_HostBoatId",
                table: "BoatsGallery",
                column: "HostBoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsGallery_Boats_HostBoatId",
                table: "BoatsGallery");

            migrationBuilder.RenameColumn(
                name: "HostBoatId",
                table: "BoatsGallery",
                newName: "BoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsGallery_HostBoatId",
                table: "BoatsGallery",
                newName: "IX_BoatsGallery_BoatId");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsGallery_Boats_BoatId",
                table: "BoatsGallery",
                column: "BoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
