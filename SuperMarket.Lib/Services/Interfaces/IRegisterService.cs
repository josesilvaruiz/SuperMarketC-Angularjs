using SuperMarket.Lib.Core;
using SuperMarket.Lib.Services.Dtos;

namespace SuperMarket.Lib.Services
{
    public interface IRegisterService
    {
        RegisterResponse Register(RegisterRequest registerRequest);
    }
}
