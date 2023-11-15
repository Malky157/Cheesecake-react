using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Homework5._22.Data.Migrations
{
    public partial class addmanytomany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_CheesecakeBaseFlavors_CheesecakeBaseFlavorId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Customers_CustomerId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Toppings_Orders_OrderId",
                table: "Toppings");

            migrationBuilder.DropIndex(
                name: "IX_Toppings_OrderId",
                table: "Toppings");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Toppings");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_CheesecakeBaseFlavors_CheesecakeBaseFlavorId",
                table: "Orders",
                column: "CheesecakeBaseFlavorId",
                principalTable: "CheesecakeBaseFlavors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Customers_CustomerId",
                table: "Orders",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_CheesecakeBaseFlavors_CheesecakeBaseFlavorId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Customers_CustomerId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "OrderToppings");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "Toppings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Toppings_OrderId",
                table: "Toppings",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_CheesecakeBaseFlavors_CheesecakeBaseFlavorId",
                table: "Orders",
                column: "CheesecakeBaseFlavorId",
                principalTable: "CheesecakeBaseFlavors",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Customers_CustomerId",
                table: "Orders",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Toppings_Orders_OrderId",
                table: "Toppings",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id");
        }
    }
}
