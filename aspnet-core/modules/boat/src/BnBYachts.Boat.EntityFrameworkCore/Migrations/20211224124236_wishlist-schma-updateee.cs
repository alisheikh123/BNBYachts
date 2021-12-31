using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Boat.Migrations
{
    public partial class wishlistschmaupdateee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishlistCharters_Charteres_ChartersId",
                table: "WishlistCharters");

            migrationBuilder.DropForeignKey(
                name: "FK_WishlistEvents_Events_EventsId",
                table: "WishlistEvents");

            migrationBuilder.DropIndex(
                name: "IX_WishlistEvents_EventsId",
                table: "WishlistEvents");

            migrationBuilder.DropIndex(
                name: "IX_WishlistCharters_ChartersId",
                table: "WishlistCharters");

            migrationBuilder.DropColumn(
                name: "EventsId",
                table: "WishlistEvents");

            migrationBuilder.DropColumn(
                name: "ChartersId",
                table: "WishlistCharters");

            migrationBuilder.CreateIndex(
                name: "IX_WishlistEvents_EventId",
                table: "WishlistEvents",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_WishlistCharters_CharterId",
                table: "WishlistCharters",
                column: "CharterId");

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistCharters_Charteres_CharterId",
                table: "WishlistCharters",
                column: "CharterId",
                principalTable: "Charteres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistEvents_Events_EventId",
                table: "WishlistEvents",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishlistCharters_Charteres_CharterId",
                table: "WishlistCharters");

            migrationBuilder.DropForeignKey(
                name: "FK_WishlistEvents_Events_EventId",
                table: "WishlistEvents");

            migrationBuilder.DropIndex(
                name: "IX_WishlistEvents_EventId",
                table: "WishlistEvents");

            migrationBuilder.DropIndex(
                name: "IX_WishlistCharters_CharterId",
                table: "WishlistCharters");

            migrationBuilder.AddColumn<int>(
                name: "EventsId",
                table: "WishlistEvents",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ChartersId",
                table: "WishlistCharters",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WishlistEvents_EventsId",
                table: "WishlistEvents",
                column: "EventsId");

            migrationBuilder.CreateIndex(
                name: "IX_WishlistCharters_ChartersId",
                table: "WishlistCharters",
                column: "ChartersId");

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistCharters_Charteres_ChartersId",
                table: "WishlistCharters",
                column: "ChartersId",
                principalTable: "Charteres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistEvents_Events_EventsId",
                table: "WishlistEvents",
                column: "EventsId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
