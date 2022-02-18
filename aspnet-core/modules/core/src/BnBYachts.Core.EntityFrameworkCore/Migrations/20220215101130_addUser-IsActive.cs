using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Core.Migrations
{
    public partial class addUserIsActive : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<bool>(
                  name: "IsActive",
                  table: "AbpUsers",
                  type: "bit",
                  nullable: false,
                  defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "AbpUsers");
        }
    }
}
