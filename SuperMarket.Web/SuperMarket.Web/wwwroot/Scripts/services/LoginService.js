class LoginService extends GenericService
{    
    constructor($http, $TokenService)
    {
        super($http, $TokenService, 'login');
    }
    
    LoginAsync(email, password)
    {
        var request = new LoginRequest(email, password);
        return this.AddAsync(request)
            .then((response) => {               
                this.TokenService.SetToken(response.data.token);
            },
                (error) => {
                    alert(error.data.message);
                    this.TokenService.SetToken(null);
                });
    }

    deslogueame() {
        this.TokenService.Logout();
    }
}

// esto le dice a Angular que creamos un service que se llama $UsersService
// para que lo inyecte 
app.service('$LoginService', LoginService);