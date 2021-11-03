using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Boat.Migrations
{
    public partial class changesdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsCalendar_Boats_HostBoatId",
                table: "BoatsCalendar");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsGallery_Boats_HostBoatId",
                table: "BoatsGallery");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsRules_Boats_HostBoatId",
                table: "BoatsRules");

            migrationBuilder.RenameColumn(
                name: "HostBoatId",
                table: "BoatsRules",
                newName: "BoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsRules_HostBoatId",
                table: "BoatsRules",
                newName: "IX_BoatsRules_BoatId");

            migrationBuilder.RenameColumn(
                name: "HostBoatId",
                table: "BoatsGallery",
                newName: "BoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsGallery_HostBoatId",
                table: "BoatsGallery",
                newName: "IX_BoatsGallery_BoatId");

            migrationBuilder.RenameColumn(
                name: "HostBoatId",
                table: "BoatsCalendar",
                newName: "BoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsCalendar_HostBoatId",
                table: "BoatsCalendar",
                newName: "IX_BoatsCalendar_BoatId");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsCalendar_Boats_BoatId",
                table: "BoatsCalendar",
                column: "BoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsGallery_Boats_BoatId",
                table: "BoatsGallery",
                column: "BoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsRules_Boats_BoatId",
                table: "BoatsRules",
                column: "BoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsCalendar_Boats_BoatId",
                table: "BoatsCalendar");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsGallery_Boats_BoatId",
                table: "BoatsGallery");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsRules_Boats_BoatId",
                table: "BoatsRules");

            migrationBuilder.RenameColumn(
                name: "BoatId",
                table: "BoatsRules",
                newName: "HostBoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsRules_BoatId",
                table: "BoatsRules",
                newName: "IX_BoatsRules_HostBoatId");

            migrationBuilder.RenameColumn(
                name: "BoatId",
                table: "BoatsGallery",
                newName: "HostBoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsGallery_BoatId",
                table: "BoatsGallery",
                newName: "IX_BoatsGallery_HostBoatId");

            migrationBuilder.RenameColumn(
                name: "BoatId",
                table: "BoatsCalendar",
                newName: "HostBoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsCalendar_BoatId",
                table: "BoatsCalendar",
                newName: "IX_BoatsCalendar_HostBoatId");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsCalendar_Boats_HostBoatId",
                table: "BoatsCalendar",
                column: "HostBoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsGallery_Boats_HostBoatId",
                table: "BoatsGallery",
                column: "HostBoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsRules_Boats_HostBoatId",
                table: "BoatsRules",
                column: "HostBoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
