using Homework5._22.Data;
using Homework5._22.Web.ViewModels;
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
        public void AddOrder(OrderVm vm)
        {
            var repo = new CheesecakeRepository(_connectionString);
            repo.AddOrder(vm.OrderDetails, vm.CustomerItemsIds, vm.Customer);
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
        public List<Item> GetCheesecakeBaseFlavors()
        {
            var repo = new CheesecakeRepository(_connectionString);
            return repo.GetAllFlavors();
        }

        [Route("gettoppings")]
        [HttpGet]
        public List<Item> GetToppings()
        {
            var repo = new CheesecakeRepository(_connectionString);
            return repo.GetAllToppings();
        }

        [Route("additem")]
        [HttpPost]
        public void AddItem(Item item)
        {
            if (item == null)
            {
                return;
            }
            var repo = new CheesecakeRepository(_connectionString);
            repo.AddItem(item);
        }
    }
}