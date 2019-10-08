using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMarket.Lib.Core
{
    public class User : Entity
    {
        public string Name { get; set; }

        public string Surname1 { get; set; }
        public string Surname2 { get; set; }

        public string Email { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        public string Token { get; set; }
    }
}
