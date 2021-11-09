using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Migrations
{
    public partial class dbschemaupdateee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsCalendar_Boats_HostBoatId1",
                table: "BoatsCalendar");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsGallery_Boats_HostBoatId1",
                table: "BoatsGallery");

            migrationBuilder.DropIndex(
                name: "IX_BoatsGallery_HostBoatId1",
                table: "BoatsGallery");

            migrationBuilder.DropIndex(
                name: "IX_BoatsCalendar_HostBoatId1",
                table: "BoatsCalendar");

            migrationBuilder.DropColumn(
                name: "HostBoatId1",
                table: "BoatsGallery");

            migrationBuilder.DropColumn(
                name: "HostBoatId1",
                table: "BoatsCalendar");

            migrationBuilder.AlterColumn<Guid>(
                name: "HostBoatId",
                table: "BoatsGallery",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "HostBoatId",
                table: "BoatsCalendar",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BoatsGallery_HostBoatId",
                table: "BoatsGallery",
                column: "HostBoatId");

            migrationBuilder.CreateIndex(
                name: "IX_BoatsCalendar_HostBoatId",
                table: "BoatsCalendar",
                column: "HostBoatId");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsCalendar_Boats_HostBoatId",
                table: "BoatsCalendar");

            migrationBuilder.DropForeignKey(
                name: "FK_BoatsGallery_Boats_HostBoatId",
                table: "BoatsGallery");

            migrationBuilder.DropIndex(
                name: "IX_BoatsGallery_HostBoatId",
                table: "BoatsGallery");

            migrationBuilder.DropIndex(
                name: "IX_BoatsCalendar_HostBoatId",
                table: "BoatsCalendar");

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

            migrationBuilder.AlterColumn<string>(
                name: "HostBoatId",
                table: "BoatsCalendar",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "HostBoatId1",
                table: "BoatsCalendar",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BoatsGallery_HostBoatId1",
                table: "BoatsGallery",
                column: "HostBoatId1");

            migrationBuilder.CreateIndex(
                name: "IX_BoatsCalendar_HostBoatId1",
                table: "BoatsCalendar",
                column: "HostBoatId1");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsCalendar_Boats_HostBoatId1",
                table: "BoatsCalendar",
                column: "HostBoatId1",
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
        }
    }
}
