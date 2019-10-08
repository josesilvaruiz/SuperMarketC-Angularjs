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
    public class ClientsController : ControllerBase
    {
        private readonly ICrudService<Client> _clientsService;

        public ClientsController(ICrudService<Client> clientsService)
        {
            _clientsService = clientsService;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetBooks()
        {
            return await _clientsService.GetAll().ToListAsync();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetBook(Guid id)
        {
            return await Task.Run(() =>
            {
                var client = _clientsService.GetAll().FirstOrDefault(x => x.Id == id);

                if (client == null)
                {
                    return NotFound();
                }

                return new ActionResult<Client>(client);
            });
        }

        // PUT: api/Books/5
        [HttpPut]
        public async Task<ActionResult<Client>> PutBook(Client client)
        {
            return await Task.Run(() =>
            {
                var output = _clientsService.Update(client);
                return new ActionResult<Client>(output);
            });
        }

        // POST: api/Books
        [HttpPost]
        public async Task<ActionResult<Client>> PostBook(Client client)
        {
            return await Task.Run(() =>
            {
                var output = _clientsService.Add(client);
                return new ActionResult<Client>(output);
            });
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteBook(Guid id)
        {
            return await Task.Run(() =>
            {
                return _clientsService.Delete(id);
            });
        }
    }
}
