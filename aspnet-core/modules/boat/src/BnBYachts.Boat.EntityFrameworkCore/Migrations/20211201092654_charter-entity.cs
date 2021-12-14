using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Boat.Migrations
{
    public partial class charterentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ReturnAddress",
                table: "Charteres",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReturnDate",
                table: "Charteres",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ReturnLocationLat",
                table: "Charteres",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ReturnLocationLng",
                table: "Charteres",
                type: "float",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReturnAddress",
                table: "Charteres");

            migrationBuilder.DropColumn(
                name: "ReturnDate",
                table: "Charteres");

            migrationBuilder.DropColumn(
                name: "ReturnLocationLat",
                table: "Charteres");

            migrationBuilder.DropColumn(
                name: "ReturnLocationLng",
                table: "Charteres");
        }
    }
}
