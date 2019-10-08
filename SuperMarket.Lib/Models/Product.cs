using SuperMarket.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMarket.Lib.Models
{
    public class Product : Entity
    {
        public string ProductName { get; set; }
        public int Price { get; set; }

        [JsonIgnore]
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
