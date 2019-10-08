namespace SuperMarket.Lib.Services.Dtos
{
    public class RegisterRequest
    {
        public string Email { get; set; }

        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname1 { get; set; }
        public string Surname2 { get; set; }
    }
}
