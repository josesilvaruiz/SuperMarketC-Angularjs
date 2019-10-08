class GenericService
{
    get Config()
    {
        var config =
        {
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.TokenService.GetToken()
            }
        };
        return config;
    }

    constructor($http, $TokenService, model)
    {
        this.TokenService = $TokenService;
        this.Http = $http;
        this.ApiUrl = "api/" + model + "/";
    }

    GetAllAsync()
    {
        return this.Http.get(this.ApiUrl, this.Config);
    }

    AddAsync(model)
    {
        return this.Http.post(this.ApiUrl, model);
    }
    PutAsync(model) {
        return this.Http.put(this.ApiUrl, model, this.Config);
    }
    DeleteAsync(id)
    {
        return this.Http.delete(this.ApiUrl + id);
    }
    isLogged() {
        return this.TokenService.isLogged();
    }
}