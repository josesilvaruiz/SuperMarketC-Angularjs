using System;

namespace SuperMarket.Lib.Core
{
    public class Entity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// Property to get the entity type name and send it serialized.
        /// </summary>
        public string EntityType
        {
            get
            {
                return GetType().Name;
            }
        }
    }
}
