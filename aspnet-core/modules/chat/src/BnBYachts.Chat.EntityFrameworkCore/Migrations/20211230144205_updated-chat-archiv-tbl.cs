using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Chat.Migrations
{
    public partial class updatedchatarchivtbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BlockedUserId",
                table: "ArchivedChats",
                newName: "ArchivedUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ArchivedUserId",
                table: "ArchivedChats",
                newName: "BlockedUserId");
        }
    }
}
