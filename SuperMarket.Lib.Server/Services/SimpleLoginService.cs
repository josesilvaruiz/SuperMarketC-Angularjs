using SuperMarket.Lib.Core;
using SuperMarket.Lib.Services;
using SuperMarket.Lib.Services.Dtos;
using System.Linq;

namespace SuperMarket.Lib.Services
{
    public class SimpleLoginService : ILoginService
    {
        IRepository<User> UsersRepository { get; set; }

        public SimpleLoginService(IRepository<User> usersRepository)
        {
            UsersRepository = usersRepository;
        }

        public virtual User Authenticate(LoginRequest loginRequest)
        {
            var user = UsersRepository.GetAll().FirstOrDefault(x => x.Email == loginRequest.Email && x.Password == loginRequest.Password);

            return user;
        }
    }
}
