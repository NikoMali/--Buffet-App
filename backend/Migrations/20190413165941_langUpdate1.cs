using Microsoft.EntityFrameworkCore.Migrations;

namespace BuffetApi.Migrations
{
    public partial class langUpdate1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ShortLang",
                table: "Languages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShortLang",
                table: "Languages");
        }
    }
}
