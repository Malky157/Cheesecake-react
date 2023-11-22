using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework5._22.Data
{
    public class CheesecakeRepository
    {
        private readonly string _connectionString;
        public CheesecakeRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddOrder(Order order)
        {
            var context = new CheesecakeDbContext(_connectionString);
            context.Orders.Add(order);
            context.SaveChanges();
        }
        public List<Order> GetAllOrders()
        {
            var context = new CheesecakeDbContext(_connectionString);
            return context.Orders.ToList();
        }
        public Order GetOrderById(int id)
        {
            var context = new CheesecakeDbContext(_connectionString);
            return context.Orders.FirstOrDefault(o => o.Id == id);
        }

        public List<Item> GetAllFlavors()
        {
            var context = new CheesecakeDbContext(_connectionString);
            return context.Items.Where(i => i.ItemType == "cheesecakeBaseFlavor").ToList();
        }

        public List<Item> GetAllToppings()
        {
            var context = new CheesecakeDbContext(_connectionString);
            return context.Items.Where(i => i.ItemType == "topping").ToList();
        }

        public void AddItem(Item item)
        {
            var context = new CheesecakeDbContext(_connectionString);
            context.Items.Add(item);
            context.SaveChanges();
        }
    }
}
