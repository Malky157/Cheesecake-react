using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Homework5._22.Data.Migrations
{
    public partial class Changedtoenums : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_CheesecakeBaseFlavors_CheesecakeBaseFlavorId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "CheesecakeBaseFlavors");

            migrationBuilder.DropTable(
                name: "OrderToppings");

            migrationBuilder.DropTable(
                name: "Toppings");

            migrationBuilder.DropIndex(
                name: "IX_Orders_CheesecakeBaseFlavorId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CheesecakeBaseFlavorId",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "CheesecakeBaseFlavor",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Topping",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CheesecakeBaseFlavor",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Topping",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "CheesecakeBaseFlavorId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CheesecakeBaseFlavors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Flavor = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheesecakeBaseFlavors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrderToppings",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ToppingId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderToppings", x => new { x.OrderId, x.ToppingId });
                });

            migrationBuilder.CreateTable(
                name: "Toppings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ToppingName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Toppings", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CheesecakeBaseFlavorId",
                table: "Orders",
                column: "CheesecakeBaseFlavorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_CheesecakeBaseFlavors_CheesecakeBaseFlavorId",
                table: "Orders",
                column: "CheesecakeBaseFlavorId",
                principalTable: "CheesecakeBaseFlavors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
