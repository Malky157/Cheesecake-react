using Microsoft.EntityFrameworkCore;
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
        public void AddOrder(Order order, List<int> customerItemsIds, Customer customer)
        {
            var context = new CheesecakeDbContext(_connectionString);
            var oldCustomer = context.Customers.FirstOrDefault(c => c.Id == customer.Id);
            if (oldCustomer == null)
            {
                context.Customers.Add(customer);
                context.SaveChanges();
            }
            order.CustomerId = customer.Id;
            if(order.SpecialRequests == "")
            {
                order.SpecialRequests = null;
            }
            context.Orders.Add(order);
            context.SaveChanges();
            context.Database.ExecuteSqlInterpolated($@"Delete OrderItems Where OrderId = {order.Id}");
            var orderItems = new List<OrderItem>();
            customerItemsIds.ForEach(i => orderItems.Add(new OrderItem()
            {
                OrderId = order.Id,
                ItemId = i
            }));
            context.OrderItems.AddRange(orderItems);
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
            return context.Items.Where(i => i.ItemType == "topping").OrderBy(t => t.ItemName).ToList();
        }

        public void AddItem(Item item)
        {
            var context = new CheesecakeDbContext(_connectionString);
            context.Items.Add(item);
            context.SaveChanges();
        }
    }
}
