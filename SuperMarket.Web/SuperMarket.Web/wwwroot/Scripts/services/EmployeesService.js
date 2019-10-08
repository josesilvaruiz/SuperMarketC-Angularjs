class EmployeesService extends GenericService
{    

    constructor($http, $TokenService)
    {
        super($http, $TokenService, 'employees');
    }

}

// esto le dice a Angular que creamos un service que se llama $UsersService
// para que lo inyecte 
app.service('$EmployeesService', EmployeesService);