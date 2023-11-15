using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Homework5._22.Data.Migrations
{
    public partial class ChangeclassStruture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Cheesecakes_CheesecakeId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Toppings_Cheesecakes_CheesecakeId",
                table: "Toppings");

            migrationBuilder.DropTable(
                name: "Cheesecakes");

            migrationBuilder.RenameColumn(
                name: "CheesecakeId",
                table: "Toppings",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Toppings_CheesecakeId",
                table: "Toppings",
                newName: "IX_Toppings_OrderId");

            migrationBuilder.RenameColumn(
                name: "CheesecakeId",
                table: "Orders",
                newName: "CheesecakeBaseFlavorId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_CheesecakeId",
                table: "Orders",
                newName: "IX_Orders_CheesecakeBaseFlavorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_CheesecakeBaseFlavors_CheesecakeBaseFlavorId",
                table: "Orders",
                column: "CheesecakeBaseFlavorId",
                principalTable: "CheesecakeBaseFlavors",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Toppings_Orders_OrderId",
                table: "Toppings",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_CheesecakeBaseFlavors_CheesecakeBaseFlavorId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Toppings_Orders_OrderId",
                table: "Toppings");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Toppings",
                newName: "CheesecakeId");

            migrationBuilder.RenameIndex(
                name: "IX_Toppings_OrderId",
                table: "Toppings",
                newName: "IX_Toppings_CheesecakeId");

            migrationBuilder.RenameColumn(
                name: "CheesecakeBaseFlavorId",
                table: "Orders",
                newName: "CheesecakeId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_CheesecakeBaseFlavorId",
                table: "Orders",
                newName: "IX_Orders_CheesecakeId");

            migrationBuilder.CreateTable(
                name: "Cheesecakes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BaseFlavorId = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cheesecakes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cheesecakes_CheesecakeBaseFlavors_BaseFlavorId",
                        column: x => x.BaseFlavorId,
                        principalTable: "CheesecakeBaseFlavors",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cheesecakes_BaseFlavorId",
                table: "Cheesecakes",
                column: "BaseFlavorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Cheesecakes_CheesecakeId",
                table: "Orders",
                column: "CheesecakeId",
                principalTable: "Cheesecakes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Toppings_Cheesecakes_CheesecakeId",
                table: "Toppings",
                column: "CheesecakeId",
                principalTable: "Cheesecakes",
                principalColumn: "Id");
        }
    }
}
