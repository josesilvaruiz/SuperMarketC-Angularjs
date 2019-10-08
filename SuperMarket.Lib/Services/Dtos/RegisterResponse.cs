using SuperMarket.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMarket.Lib.Services
{
    public class RegisterResponse
    {
        public RegisterResponseStatus Status { get; set; }
        public Employee Employees { get; set; }
    }

    public enum RegisterResponseStatus
    {
        Ok,
        UserWithEmailAlreadyExists,
        WrongEmail,
        MissingEmail,
        MissingPassword,
        PasswordInsecure
    }
}
