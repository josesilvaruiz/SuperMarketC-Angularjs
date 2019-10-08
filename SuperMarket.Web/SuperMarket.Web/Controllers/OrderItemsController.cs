using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SuperMarket.Lib.DA;
using SuperMarket.Lib.Models;
using SuperMarket.Lib.Core;

namespace SuperMarket.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemsController : ControllerBase
    {
        private readonly ICrudService<OrderItem> _orderitemsService;

        public OrderItemsController(ICrudService<OrderItem> orderitemssService)
        {
            _orderitemsService = orderitemssService;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderItem>>> GetBooks()
        {
            return await _orderitemsService.GetAll().ToListAsync();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderItem>> GetBook(Guid id)
        {
            return await Task.Run(() =>
            {
                var orderitems = _orderitemsService.GetAll().FirstOrDefault(x => x.Id == id);

                if (orderitems == null)
                {
                    return NotFound();
                }

                return new ActionResult<OrderItem>(orderitems);
            });
        }

        // PUT: api/Books/5
        [HttpPut]
        public async Task<ActionResult<OrderItem>> PutBook(OrderItem orderitems)
        {
            return await Task.Run(() =>
            {
                var output = _orderitemsService.Update(orderitems);
                return new ActionResult<OrderItem>(output);
            });
        }

        // POST: api/Books
        [HttpPost]
        public async Task<ActionResult<OrderItem>> PostBook(OrderItem orderitems)
        {
            return await Task.Run(() =>
            {
                var output = _orderitemsService.Add(orderitems);
                return new ActionResult<OrderItem>(output);
            });
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteBook(Guid id)
        {
            return await Task.Run(() =>
            {
                return _orderitemsService.Delete(id);
            });
        }
    }
}
