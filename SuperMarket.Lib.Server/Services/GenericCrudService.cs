﻿using SuperMarket.Lib.Core;
using System;
using System.Linq;

namespace SuperMarket.Lib.Services
{
    public class GenericCrudService<T> : ICrudService<T> where T : Entity
    {
        IRepository<T> Repository { get; set; }

        public GenericCrudService(IRepository<T> repository)
        {
            Repository = repository;
        }

        public virtual T Add(T entity)
        {
            return Repository.Add(entity);
        }

        public virtual bool Delete(Guid id)
        {
            return Repository.Delete(id);
        }

        public virtual IQueryable<T> GetAll()
        {
            return Repository.GetAll();
        }

        public virtual T Update(T entity)
        {
            return Repository.Update(entity);
        }
    }
}
