using SuperMarket.Lib.DA;
using SuperMarket.Lib.Core;
using Microsoft.EntityFrameworkCore;


namespace SuperMarket.Lib.DA.EFCore
{
    public class UsersDbSet : SuperMarketDbSet<User>
    {
        public UsersDbSet(SuperMarketContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Users;
        }
    }
}
