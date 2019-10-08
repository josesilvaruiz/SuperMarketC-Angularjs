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
    public class EmployeesController : ControllerBase
    {
        private readonly ICrudService<Employee> _employeesService;

        public EmployeesController(ICrudService<Employee> employeesService)
        {
            _employeesService = employeesService;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetBooks()
        {
            return await _employeesService.GetAll().ToListAsync();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetBook(Guid id)
        {
            return await Task.Run(() =>
            {
                var employee = _employeesService.GetAll().FirstOrDefault(x => x.Id == id);

                if (employee == null)
                {
                    return NotFound();
                }

                return new ActionResult<Employee>(employee);
            });
        }

        // PUT: api/Books/5
        [HttpPut]
        public async Task<ActionResult<Employee>> PutBook(Employee employee)
        {
            return await Task.Run(() =>
            {
                var output = _employeesService.Update(employee);
                return new ActionResult<Employee>(output);
            });
        }

        // POST: api/Books
        [HttpPost]
        public async Task<ActionResult<Employee>> PostBook(Employee employee)
        {
            return await Task.Run(() =>
            {
                var output = _employeesService.Add(employee);
                return new ActionResult<Employee>(output);
            });
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteBook(Guid id)
        {
            return await Task.Run(() =>
            {
                return _employeesService.Delete(id);
            });
        }
    }
}
