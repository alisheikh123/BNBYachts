using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Core.Migrations
{
    public partial class updateuserentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "imagePath",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imagePath",
                table: "AbpUsers");
        }
    }
}
