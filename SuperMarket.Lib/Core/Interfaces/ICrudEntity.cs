﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace SuperMarket.Lib.Core
{
    public interface ICrudEntity<T> where T : Entity
    {
        IQueryable<T> GetAll();

        T Add(T entity);

        T Update(T entity);

        bool Delete(Guid id);
    }
}
