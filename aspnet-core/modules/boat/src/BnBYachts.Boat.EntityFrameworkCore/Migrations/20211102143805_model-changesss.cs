using Microsoft.EntityFrameworkCore.Migrations;

namespace BnBYachts.Boat.Migrations
{
    public partial class modelchangesss : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsRules_Rules_BoatRulesId",
                table: "BoatsRules");

            migrationBuilder.RenameColumn(
                name: "BoatRulesId",
                table: "BoatsRules",
                newName: "OfferedRuleId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsRules_BoatRulesId",
                table: "BoatsRules",
                newName: "IX_BoatsRules_OfferedRuleId");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsRules_Rules_OfferedRuleId",
                table: "BoatsRules",
                column: "OfferedRuleId",
                principalTable: "Rules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoatsRules_Rules_OfferedRuleId",
                table: "BoatsRules");

            migrationBuilder.RenameColumn(
                name: "OfferedRuleId",
                table: "BoatsRules",
                newName: "BoatRulesId");

            migrationBuilder.RenameIndex(
                name: "IX_BoatsRules_OfferedRuleId",
                table: "BoatsRules",
                newName: "IX_BoatsRules_BoatRulesId");

            migrationBuilder.AddForeignKey(
                name: "FK_BoatsRules_Rules_BoatRulesId",
                table: "BoatsRules",
                column: "BoatRulesId",
                principalTable: "Rules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
