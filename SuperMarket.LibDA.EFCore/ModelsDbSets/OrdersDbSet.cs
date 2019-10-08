using SuperMarket.Lib.DA;
using SuperMarket.Lib.Core;
using Microsoft.EntityFrameworkCore;
using SuperMarket.Lib.Models;

namespace SuperMarket.Lib.DA.EFCore
{
    public class OrdersDbSet : SuperMarketDbSet<Order>
    {
        public OrdersDbSet(SuperMarketContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Orders;
        }
    }
}
