using Microsoft.EntityFrameworkCore.Migrations;

namespace BuffetApi.Migrations
{
    public partial class blogUpdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Short_Desc",
                table: "Blogs",
                newName: "ShortDesc");

            migrationBuilder.RenameColumn(
                name: "Long_Desc",
                table: "Blogs",
                newName: "LongDesc");

            migrationBuilder.RenameColumn(
                name: "Img_Url",
                table: "Blogs",
                newName: "ImgUrl");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShortDesc",
                table: "Blogs",
                newName: "Short_Desc");

            migrationBuilder.RenameColumn(
                name: "LongDesc",
                table: "Blogs",
                newName: "Long_Desc");

            migrationBuilder.RenameColumn(
                name: "ImgUrl",
                table: "Blogs",
                newName: "Img_Url");
        }
    }
}
