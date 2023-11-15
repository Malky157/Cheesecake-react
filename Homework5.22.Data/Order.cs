using System.Text.Json.Serialization;

namespace Homework5._22.Data
{
    public class Order
    {
        public int Id { get; set; }
        [JsonIgnore]
        public Customer Customer { get; set; }
        public CheesecakeBaseFlavors CheesecakeBaseFlavor { get; set; }
        public Toppings Topping { get; set; }
        public string SpecialRequests { get; set; }
        public int Quantity { get; set; }
        public DateTime DeliveryDate { get; set; }
        public decimal Total { get; set; }
    }
}
