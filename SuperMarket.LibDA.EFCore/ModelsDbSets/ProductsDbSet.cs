using SuperMarket.Lib.DA;
using SuperMarket.Lib.Core;
using Microsoft.EntityFrameworkCore;
using SuperMarket.Lib.Models;

namespace SuperMarket.Lib.DA.EFCore
{
    public class ProductsDbSet : SuperMarketDbSet<Product>
    {
        public ProductsDbSet(SuperMarketContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Products;
        }
    }
}
