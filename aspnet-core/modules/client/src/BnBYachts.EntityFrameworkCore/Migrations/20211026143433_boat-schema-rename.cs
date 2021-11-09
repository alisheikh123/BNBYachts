using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Migrations
{
    public partial class boatschemarename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsCalendar_AppHostBoat_BoatId",
                table: "BoatsCalendar");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsFeatures_AppHostBoat_BoatId",
                table: "BoatsFeatures");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsGallery_AppHostBoat_BoatId",
                table: "BoatsGallery");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsLocations_AppHostBoat_BoatId",
                table: "BoatsLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsRules_AppHostBoat_BoatId",
                table: "BoatsRules");

            migrationBuilder.DropForeignKey(
                name: "FK_Charteres_AppHostBoat_BoatId",
                table: "Charteres");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_AppHostBoat_BoatId",
                table: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppHostBoat",
                table: "AppHostBoat");

            migrationBuilder.RenameTable(
                name: "AppHostBoat",
                newName: "Boats");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Boats",
                table: "Boats",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsCalendar_Boats_BoatId",
                table: "BoatsCalendar",
                column: "BoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsFeatures_Boats_BoatId",
                table: "BoatsFeatures",
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
                name: "FK_BoatsLocations_Boats_BoatId",
                table: "BoatsLocations",
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

            migrationBuilder.AddForeignKey(
                name: "FK_Charteres_Boats_BoatId",
                table: "Charteres",
                column: "BoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Boats_BoatId",
                table: "Events",
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
                name: "FK_BoatsFeatures_Boats_BoatId",
                table: "BoatsFeatures");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsGallery_Boats_BoatId",
                table: "BoatsGallery");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsLocations_Boats_BoatId",
                table: "BoatsLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsRules_Boats_BoatId",
                table: "BoatsRules");

            migrationBuilder.DropForeignKey(
                name: "FK_Charteres_Boats_BoatId",
                table: "Charteres");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_Boats_BoatId",
                table: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Boats",
                table: "Boats");

            migrationBuilder.RenameTable(
                name: "Boats",
                newName: "AppHostBoat");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppHostBoat",
                table: "AppHostBoat",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsCalendar_AppHostBoat_BoatId",
                table: "BoatsCalendar",
                column: "BoatId",
                principalTable: "AppHostBoat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsFeatures_AppHostBoat_BoatId",
                table: "BoatsFeatures",
                column: "BoatId",
                principalTable: "AppHostBoat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsGallery_AppHostBoat_BoatId",
                table: "BoatsGallery",
                column: "BoatId",
                principalTable: "AppHostBoat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsLocations_AppHostBoat_BoatId",
                table: "BoatsLocations",
                column: "BoatId",
                principalTable: "AppHostBoat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsRules_AppHostBoat_BoatId",
                table: "BoatsRules",
                column: "BoatId",
                principalTable: "AppHostBoat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Charteres_AppHostBoat_BoatId",
                table: "Charteres",
                column: "BoatId",
                principalTable: "AppHostBoat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_AppHostBoat_BoatId",
                table: "Events",
                column: "BoatId",
                principalTable: "AppHostBoat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
