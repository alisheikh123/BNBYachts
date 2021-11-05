using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Migrations
{
    public partial class dbschemaupdatee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsCalendar_Boats_BoatId",
                table: "BoatsCalendar");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsFeatures_Boats_BoatId",
                table: "BoatsFeatures");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsGallery_Boats_HostBoatId",
                table: "BoatsGallery");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsLocations_Boats_BoatId",
                table: "BoatsLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsRules_Boats_BoatId",
                table: "BoatsRules");

            migrationBuilder.DropIndex(
                name: "IX_BoatsGallery_HostBoatId",
                table: "BoatsGallery");

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
                table: "BoatsLocations",
                newName: "HostBoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsLocations_BoatId",
                table: "BoatsLocations",
                newName: "IX_BoatsLocations_HostBoatId");

            migrationBuilder.RenameColumn(
                name: "BoatId",
                table: "BoatsFeatures",
                newName: "HostBoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsFeatures_BoatId",
                table: "BoatsFeatures",
                newName: "IX_BoatsFeatures_HostBoatId");

            migrationBuilder.RenameColumn(
                name: "BoatId",
                table: "BoatsCalendar",
                newName: "HostBoatId1");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsCalendar_BoatId",
                table: "BoatsCalendar",
                newName: "IX_BoatsCalendar_HostBoatId1");

            migrationBuilder.AlterColumn<string>(
                name: "HostBoatId",
                table: "BoatsGallery",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "HostBoatId1",
                table: "BoatsGallery",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HostBoatId",
                table: "BoatsCalendar",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BoatsGallery_HostBoatId1",
                table: "BoatsGallery",
                column: "HostBoatId1");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsCalendar_Boats_HostBoatId1",
                table: "BoatsCalendar",
                column: "HostBoatId1",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsFeatures_Boats_HostBoatId",
                table: "BoatsFeatures",
                column: "HostBoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsGallery_Boats_HostBoatId1",
                table: "BoatsGallery",
                column: "HostBoatId1",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsLocations_Boats_HostBoatId",
                table: "BoatsLocations",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsCalendar_Boats_HostBoatId1",
                table: "BoatsCalendar");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsFeatures_Boats_HostBoatId",
                table: "BoatsFeatures");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsGallery_Boats_HostBoatId1",
                table: "BoatsGallery");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsLocations_Boats_HostBoatId",
                table: "BoatsLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsRules_Boats_HostBoatId",
                table: "BoatsRules");

            migrationBuilder.DropIndex(
                name: "IX_BoatsGallery_HostBoatId1",
                table: "BoatsGallery");

            migrationBuilder.DropColumn(
                name: "HostBoatId1",
                table: "BoatsGallery");

            migrationBuilder.DropColumn(
                name: "HostBoatId",
                table: "BoatsCalendar");

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
                table: "BoatsLocations",
                newName: "BoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsLocations_HostBoatId",
                table: "BoatsLocations",
                newName: "IX_BoatsLocations_BoatId");

            migrationBuilder.RenameColumn(
                name: "HostBoatId",
                table: "BoatsFeatures",
                newName: "BoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsFeatures_HostBoatId",
                table: "BoatsFeatures",
                newName: "IX_BoatsFeatures_BoatId");

            migrationBuilder.RenameColumn(
                name: "HostBoatId1",
                table: "BoatsCalendar",
                newName: "BoatId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsCalendar_HostBoatId1",
                table: "BoatsCalendar",
                newName: "IX_BoatsCalendar_BoatId");

            migrationBuilder.AlterColumn<Guid>(
                name: "HostBoatId",
                table: "BoatsGallery",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BoatsGallery_HostBoatId",
                table: "BoatsGallery",
                column: "HostBoatId");

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
                name: "FK_BoatsGallery_Boats_HostBoatId",
                table: "BoatsGallery",
                column: "HostBoatId",
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
        }
    }
}
