using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BuffetApi.Migrations
{
    public partial class blogUpdate1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true),
                    Short_Desc = table.Column<string>(nullable: true),
                    Long_Desc = table.Column<string>(nullable: true),
                    Img_Url = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    LangId = table.Column<int>(nullable: false),
                    OriginalPostId = table.Column<int>(nullable: false),
                    CreateDate = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Blogs");
        }
    }
}
