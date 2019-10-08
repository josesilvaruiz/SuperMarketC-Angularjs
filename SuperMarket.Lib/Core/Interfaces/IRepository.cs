namespace SuperMarket.Lib.Core
{
    public interface IRepository<T> : ICrudEntity<T> where T : Entity
    {
       
    }
}
