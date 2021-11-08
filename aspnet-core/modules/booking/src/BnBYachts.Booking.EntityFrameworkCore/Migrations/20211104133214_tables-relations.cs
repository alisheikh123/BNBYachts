using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Booking.Migrations
{
    public partial class tablesrelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_BoatelBookings_BoatelBookingId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_CharterBookings_CharterBookingId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_EventBookings_EventBookingId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_BoatelBookingId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_CharterBookingId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_EventBookingId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "BoatelBookingId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "CharterBookingId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "EventBookingId",
                table: "Reviews");

            migrationBuilder.AddColumn<Guid>(
                name: "ReviewsId",
                table: "EventBookings",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ReviewsId",
                table: "CharterBookings",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ReviewsId",
                table: "BoatelBookings",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EventBookings_ReviewsId",
                table: "EventBookings",
                column: "ReviewsId");

            migrationBuilder.CreateIndex(
                name: "IX_CharterBookings_ReviewsId",
                table: "CharterBookings",
                column: "ReviewsId");

            migrationBuilder.CreateIndex(
                name: "IX_BoatelBookings_ReviewsId",
                table: "BoatelBookings",
                column: "ReviewsId");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatelBookings_Reviews_ReviewsId",
                table: "BoatelBookings",
                column: "ReviewsId",
                principalTable: "Reviews",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CharterBookings_Reviews_ReviewsId",
                table: "CharterBookings",
                column: "ReviewsId",
                principalTable: "Reviews",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_EventBookings_Reviews_ReviewsId",
                table: "EventBookings",
                column: "ReviewsId",
                principalTable: "Reviews",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatelBookings_Reviews_ReviewsId",
                table: "BoatelBookings");

            migrationBuilder.DropForeignKey(
                name: "FK_CharterBookings_Reviews_ReviewsId",
                table: "CharterBookings");

            migrationBuilder.DropForeignKey(
                name: "FK_EventBookings_Reviews_ReviewsId",
                table: "EventBookings");

            migrationBuilder.DropIndex(
                name: "IX_EventBookings_ReviewsId",
                table: "EventBookings");

            migrationBuilder.DropIndex(
                name: "IX_CharterBookings_ReviewsId",
                table: "CharterBookings");

            migrationBuilder.DropIndex(
                name: "IX_BoatelBookings_ReviewsId",
                table: "BoatelBookings");

            migrationBuilder.DropColumn(
                name: "ReviewsId",
                table: "EventBookings");

            migrationBuilder.DropColumn(
                name: "ReviewsId",
                table: "CharterBookings");

            migrationBuilder.DropColumn(
                name: "ReviewsId",
                table: "BoatelBookings");

            migrationBuilder.AddColumn<Guid>(
                name: "BoatelBookingId",
                table: "Reviews",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CharterBookingId",
                table: "Reviews",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "EventBookingId",
                table: "Reviews",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_BoatelBookingId",
                table: "Reviews",
                column: "BoatelBookingId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_CharterBookingId",
                table: "Reviews",
                column: "CharterBookingId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_EventBookingId",
                table: "Reviews",
                column: "EventBookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_BoatelBookings_BoatelBookingId",
                table: "Reviews",
                column: "BoatelBookingId",
                principalTable: "BoatelBookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_CharterBookings_CharterBookingId",
                table: "Reviews",
                column: "CharterBookingId",
                principalTable: "CharterBookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_EventBookings_EventBookingId",
                table: "Reviews",
                column: "EventBookingId",
                principalTable: "EventBookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
