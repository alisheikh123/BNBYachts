using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Boat.Migrations
{
    public partial class latlongcharters : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsCalendar_Boats_HostBoatId",
                table: "BoatsCalendar");

            migrationBuilder.AddColumn<double>(
                name: "DepartingLatitude",
                table: "Charteres",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DepartingLongitude",
                table: "Charteres",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DestinationLatitude",
                table: "Charteres",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DestinationLongitude",
                table: "Charteres",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<Guid>(
                name: "HostBoatId",
                table: "BoatsCalendar",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsCalendar_Boats_HostBoatId",
                table: "BoatsCalendar",
                column: "HostBoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsCalendar_Boats_HostBoatId",
                table: "BoatsCalendar");

            migrationBuilder.DropColumn(
                name: "DepartingLatitude",
                table: "Charteres");

            migrationBuilder.DropColumn(
                name: "DepartingLongitude",
                table: "Charteres");

            migrationBuilder.DropColumn(
                name: "DestinationLatitude",
                table: "Charteres");

            migrationBuilder.DropColumn(
                name: "DestinationLongitude",
                table: "Charteres");

            migrationBuilder.AlterColumn<Guid>(
                name: "HostBoatId",
                table: "BoatsCalendar",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsCalendar_Boats_HostBoatId",
                table: "BoatsCalendar",
                column: "HostBoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
