using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SuperMarket.Lib.Core;
using SuperMarket.Lib.Services;
using SuperMarket.Lib.Services.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SuperMarket.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        IRegisterService _registerService { get; set; }

        public RegisterController(IRegisterService registerService)
        {
            _registerService = registerService;
        }

        // POST: api/Login
        [HttpPost]
        public async Task<RegisterResponse> Post([FromBody] RegisterRequest registerRequest)
        {
            return await Task.Run(() =>
            {
                return _registerService.Register(registerRequest);
            });
        }        
    }
}
