using SuperMarket.Lib.Core;
using SuperMarket.Lib.Services.Dtos;

namespace SuperMarket.Lib.Services
{
    public interface ILoginService : IGenericService
    {
        User Authenticate(LoginRequest loginRequest);
    }
}
