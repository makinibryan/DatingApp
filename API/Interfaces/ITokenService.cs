using API.Entities;

namespace API.Interfaces
{
    //contract between itself and any class that implements it(properties,methods and all events)
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}