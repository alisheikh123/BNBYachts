using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Core.Migrations
{
    public partial class increase_initial_login_column : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsInitialLogin",
                table: "AbpUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsInitialLogin",
                table: "AbpUsers");
        }
    }
}
