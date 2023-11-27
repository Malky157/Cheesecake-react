using Homework5._22.Data;

namespace Homework5._22.Web.ViewModels
{
    public class OrderVm
    {
        public Customer Customer { get; set; }
        public Order OrderDetails { get; set; }
        public List<int> CustomerItemsIds { get; set; }
    }
}
