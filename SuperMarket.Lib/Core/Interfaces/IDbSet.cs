namespace SuperMarket.Lib.Core
{
    public interface IDbSet<T> : ICrudEntity<T> where T : Entity
    {
        
    }
}
