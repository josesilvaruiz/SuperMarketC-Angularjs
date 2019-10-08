using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SuperMarket.Lib.Core;
using SuperMarket.Lib.Models;
using SuperMarket.Lib.Services.Dtos;

namespace SuperMarket.Lib.Services
{
    public class RegisterService : IRegisterService
    {
        public ILoginService LoginService { get; set; }

        public IRepository<Employee> EmployeesRepository { get; set; }

        public RegisterService(IRepository<Employee> employeesRepository, ILoginService loginService)
        {
            EmployeesRepository = employeesRepository;
            LoginService = loginService;
        }


        public virtual RegisterResponse Register(RegisterRequest registerRequest)
        {
            var output = new RegisterResponse();

            if (string.IsNullOrEmpty(registerRequest.Email))
            {
                output.Status = RegisterResponseStatus.MissingEmail;
            }
            else if (!registerRequest.Email.Contains("@"))
            {
                output.Status = RegisterResponseStatus.WrongEmail;
            }
            else if (string.IsNullOrEmpty(registerRequest.Password))
            {
                output.Status = RegisterResponseStatus.MissingPassword;
            }
            else if (registerRequest.Password.Length < 1)
            {
                output.Status = RegisterResponseStatus.PasswordInsecure;
            }

            var employee = EmployeesRepository.GetAll().FirstOrDefault(x => x.Email == registerRequest.Email);

            if (employee != null)
            {
                output.Status = RegisterResponseStatus.UserWithEmailAlreadyExists;
            }
            else
            {
                employee = new Employee
                {
                    Name = registerRequest.Name,
                    Surname1 = registerRequest.Surname1,
                    Surname2 = registerRequest.Surname2,
                    Email = registerRequest.Email,
                    Password = registerRequest.Password
                };

                EmployeesRepository.Add(employee);
                output.Status = RegisterResponseStatus.Ok;

                var loginRequest = new LoginRequest()
                {
                    Email = registerRequest.Email,
                    Password = registerRequest.Password
                };

                output.Employees = LoginService.Authenticate(loginRequest) as Employee;
            }

            return output;

        }
    }
}
