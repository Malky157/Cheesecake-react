using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Text.Json.Serialization;

namespace Homework5._22.Data
{
    public enum CheesecakeBaseFlavors
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        Classic,
        Chocolate,
        Red_Velvet,
        Brownie
    }
}