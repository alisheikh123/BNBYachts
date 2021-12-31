using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Chat.Migrations
{
    public partial class countadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UnReadChatsCount",
                table: "UserDetails",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UnReadChatsCount",
                table: "UserDetails");
        }
    }
}
