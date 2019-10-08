using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMarket.Lib.Core
{
    public interface ICrudService<T> : IGenericService, ICrudEntity<T> where T : Entity
    {
    }
}
