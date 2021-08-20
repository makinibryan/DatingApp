using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        //Ensures that the username is not empty
        [Required (ErrorMessage = "Username is required!")]
        public string Username { get; set; }

        [Required (ErrorMessage = "Password is required!")]
        public string Password { get; set; }
    }
}