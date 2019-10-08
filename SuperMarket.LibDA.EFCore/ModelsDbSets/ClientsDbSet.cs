using SuperMarket.Lib.DA;
using SuperMarket.Lib.Core;
using Microsoft.EntityFrameworkCore;
using SuperMarket.Lib.Models;
using System;
using System.Linq;

namespace SuperMarket.Lib.DA.EFCore
{
    public class ClientsDbSet : SuperMarketDbSet<Client>
    {
        public ClientsDbSet(SuperMarketContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Clients;

        }
    }
}
