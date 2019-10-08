class RegistersViewModel
{
    constructor($RegisterService)
    {
        this.RegisterService = $RegisterService;
    }

    AddNewEmployee()
    {
        this.RegisterService.RegisterAsync(this.Email, this.Password, this.Name, this.Surname1, this.Surname2)
    }

    isLogged() {
        return this.RegisterService.isLogged();
    }
    isDataValid() {
        return this.Name != '' && this.Surname1 != '' && this.Surname2 != '' && this.Email && this.Password != '';
    }
}


app.component('registers',
{
    templateUrl: './Scripts/Views/Registers/RegistersView.html',
    controller: RegistersViewModel,
    controllerAs: "vm"
});