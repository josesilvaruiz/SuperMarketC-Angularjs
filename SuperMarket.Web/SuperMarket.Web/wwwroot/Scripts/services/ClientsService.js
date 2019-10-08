class ClientsService extends GenericService
{    
    constructor($http, $TokenService)
    {
        super($http, $TokenService, 'clients');
    }
}

// esto le dice a Angular que creamos un service que se llama $UsersService
// para que lo inyecte 
app.service('$ClientsService', ClientsService);