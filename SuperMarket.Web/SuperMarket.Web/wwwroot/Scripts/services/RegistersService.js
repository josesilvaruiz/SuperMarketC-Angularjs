class RegistersService extends GenericService
{    

    constructor($http, $TokenService)
    {
        super($http, $TokenService, 'register');
    }
    RegisterAsync(email, password, name, surname1, surname2) {
        var request = new RegisterRequest(email, password, name, surname1, surname2);
        return this.AddAsync(request)
            .then((response) => {
                alert(response.data.employees.token);
                this.TokenService.SetToken(response.data.employees.token);
            },
                (error) => {
                    alert(error.data.message);
                    this.TokenService.SetToken(null);
                });
    }
}

// esto le dice a Angular que creamos un service que se llama $UsersService
// para que lo inyecte 
app.service('$RegisterService', RegistersService);