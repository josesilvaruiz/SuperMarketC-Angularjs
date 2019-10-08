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
    public class ProductsController : ControllerBase
    {
        private readonly ICrudService<Product> _productsService;

        public ProductsController(ICrudService<Product> productsService)
        {
            _productsService = productsService;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetBooks()
        {
            return await _productsService.GetAll().ToListAsync();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetBook(Guid id)
        {
            return await Task.Run(() =>
            {
                var product = _productsService.GetAll().FirstOrDefault(x => x.Id == id);

                if (product == null)
                {
                    return NotFound();
                }

                return new ActionResult<Product>(product);
            });
        }

        // PUT: api/Books/5
        [HttpPut]
        public async Task<ActionResult<Product>> PutBook(Product product)
        {
            return await Task.Run(() =>
            {
                var output = _productsService.Update(product);
                return new ActionResult<Product>(output);
            });
        }

        // POST: api/Books
        [HttpPost]
        public async Task<ActionResult<Product>> PostBook(Product product)
        {
            return await Task.Run(() =>
            {
                var output = _productsService.Add(product);
                return new ActionResult<Product>(output);
            });
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteBook(Guid id)
        {
            return await Task.Run(() =>
            {
                return _productsService.Delete(id);
            });
        }
    }
}
