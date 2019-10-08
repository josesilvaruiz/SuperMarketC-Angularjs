class LoginViewModel
{    
    constructor($LoginService)
    {
        this.LoginService = $LoginService;
    }   

    Login()
    {
        this.LoginService.LoginAsync(this.Email, this.Password);
    }

    Logout() {
        this.LoginService.deslogueame();
    }
    isLogged() {
        return this.LoginService.isLogged();
    }
}

app.component('login',
{
    templateUrl: './Scripts/Views/Login/LoginView.html',
    controller: LoginViewModel,
    controllerAs: "vm"
});