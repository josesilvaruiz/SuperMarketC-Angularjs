using SuperMarket.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMarket.Lib.Models
{
    public class OrderItem : Entity
    {
        public int Quantity { get; set; }

        [JsonIgnore]
        public Product Products { get; set; }

        [JsonIgnore]
        public Order Orders { get; set; }

    }
}
