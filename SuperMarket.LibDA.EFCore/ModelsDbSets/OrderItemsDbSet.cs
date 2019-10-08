using SuperMarket.Lib.DA;
using SuperMarket.Lib.Core;
using Microsoft.EntityFrameworkCore;
using SuperMarket.Lib.Models;

namespace SuperMarket.Lib.DA.EFCore
{
    public class OrderItemsDbSet : SuperMarketDbSet<OrderItem>
    {
        public OrderItemsDbSet(SuperMarketContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.OrderItems;
        }
    }
}
