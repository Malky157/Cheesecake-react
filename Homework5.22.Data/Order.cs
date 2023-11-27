using System.Text.Json.Serialization;

namespace Homework5._22.Data
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        [JsonIgnore]
        public Customer Customer { get; set; }
        
        public string? SpecialRequests { get; set; }
        public int Quantity { get; set; }
        public DateTime DeliveryDate { get; set; }
    }
}