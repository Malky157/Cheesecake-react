using Homework5._22.Data;
using Microsoft.AspNetCore.Mvc;

namespace Homework5._22.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheesecakeController : ControllerBase
    {
        private readonly string _connectionString;
        public CheesecakeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("addorder")]
        [HttpPost]
        public void AddOrder(Order order)
        {
            var repo = new CheesecakeRepository(_connectionString);
            repo.AddOrder(order);
        }

        [Route("getallorders")]
        [HttpGet]
        public List<Order> GetAllOrders()
        {
            var repo = new CheesecakeRepository(_connectionString);
            return repo.GetAllOrders();
        }

        [Route("getorderbyid")]
        [HttpGet]
        public Order GetOrderById(int id)
        {
            var repo = new CheesecakeRepository(_connectionString);
            return repo.GetOrderById(id);
        }

        [Route("getbaseflavors")]
        [HttpGet]
        public List<string> GetCheesecakeBaseFlavors()
        {
            return new List<string>()
            { CheesecakeBaseFlavors.Classic.ToString(),
                CheesecakeBaseFlavors.Chocolate.ToString(),
                CheesecakeBaseFlavors.Red_Velvet.ToString(),
                CheesecakeBaseFlavors.Brownie.ToString() };
        }

        [Route("gettoppings")]
        [HttpGet]
        public List<string> GetToppings()
        {
            return new List<string>(){
        Toppings.Chocolate_Chips.ToString(),
        Toppings.Caramel_Drizzle.ToString(),
        Toppings.Whipped_Cream.ToString(),
        Toppings.Pecans.ToString(),
        Toppings.Almonds.ToString(),
        Toppings.Toasted_Coconut.ToString(),
        Toppings.Graham_Cracker_Crumble.ToString(),
        Toppings.Cookie_Dough.ToString(),
        Toppings.Mint_Chocolate_Chips.ToString(),
        Toppings.Caramelized_Bananas.ToString(),
        Toppings.Rainbow_Sprinkles.ToString(),
        Toppings.Powdered_Sugar.ToString(),
        Toppings.White_Chocolate_Shavings.ToString(),
        Toppings.Peanut_Butter_Drizzle.ToString(),
        Toppings.Dark_Chocolate_Drizzle.ToString()
            };
        }
    }
}
