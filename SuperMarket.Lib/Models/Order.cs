using SuperMarket.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMarket.Lib.Models
{
    public class Order : Entity
    {
        
        public Client Clients { get; set; }

        
        public Employee Employees { get; set; }

        
        public ICollection<OrderItem> OrderItems { get; set; }
       

    }
}
