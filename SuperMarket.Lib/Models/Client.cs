using SuperMarket.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMarket.Lib.Models
{
    public class Client : User
    {
        [JsonIgnore]
        public ICollection<Order> Orders { get; set; }
    }
}
