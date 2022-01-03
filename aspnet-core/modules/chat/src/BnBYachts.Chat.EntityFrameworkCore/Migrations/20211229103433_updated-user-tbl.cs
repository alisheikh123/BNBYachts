using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Chat.Migrations
{
    public partial class updatedusertbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "UserDetails",
                newName: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "UserDetails",
                newName: "FullName");
        }
    }
}
