class UsersViewModel {
    constructor($UsersService) {
        this.Clean();
        this.Users = [];
        this.GridOptions = null;
        this.SelectedUser = null;
        this.UsersSvc = $UsersService;
        this.GetAllUsers();
        this.GridUsers =
            {
                enableFiltering: false,
                data: 'vm.Users',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'Name', field: 'Name' },
                    { name: 'Surname1', field: 'Surname1' },
                    { name: 'Surname2', field: 'Surname2' },
                    { name: 'Email', field: 'Email' },
                    { name: 'Dni', field: 'Dni' },
                    { name: 'Edit', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" value="Select" ng-click="grid.appScope.SaveUser(row.entity)"></div>' },
                    { name: 'Delete', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" value="Delete" ng-click="grid.appScope.RemoveUser(row.entity)"></div>' }
                ]
            };
    }

    GetAllUsers() {
        this.UsersSvc.GetAllAsync()
            .then((response) => {
                this.OnGetData(response);
            });
    }

    OnGetData(response) {
        this.Users.length = 0;
        for (let i in response.data) {
            let user = new User(response.data[i]);
            this.Users.push(user);
        }
    }

    AddNewUser() {
        let user = new User();
        user.Name = this.Name;
        user.Surname1 = this.Surname1;
        user.Surname2 = this.Surname2;
        user.Email = this.Email;
        user.Dni = this.Dni;
        user.Password = this.Password
        this.UsersSvc.AddAsync(user)
            .then((response) => { this.OnAddedUser(response); });
    }
    OnAddedUser(response) {
        let user = new User(response.data); // response.data es un objeto que viene de un json
        this.Users.push(user);
        this.Clean();
        

    }

    Clean() {
            this.Name = "";
            this.Surname1 = "";
            this.Surname2 = "";
            this.Email = "";
            this.Dni = "";
            this.Password = "";
    }

    SaveUser(user) {
        this.SelectedUser = user;
        this.Name = user.Name;
        this.Surname1 = user.Surname1;
        this.Surname2 = user.Surname2;
        this.Email = user.Email;
        this.Dni = user.Dni;
        this.Password = user.Password;
        this.isInEditMode = true;
    }

        UpdateUser() {
        this.SelectedUser.Name = this.Name;
        this.SelectedUser.Surname1 = this.Surname1;
        this.SelectedUser.Surname2 = this.Surname2;
        this.SelectedUser.Email = this.Email;
        this.SelectedUser.Dni = this.Dni;
        this.SelectedUser.Password = this.Password;
        this.SaveEditUser();
        this.isInEditMode = false;
    }

    SaveEditUser() {

        this.UsersSvc.PutAsync(this.SelectedUser.Id, JSON.stringify(this.SelectedUser))
            .then((response) => {
                this.OnSuccesEdit(response);
            },
                response => console.log(response)
            );
    }

    OnSuccesEdit(response) {
        let user = new User(response.data)
        let index = this.Users.findIndex(x => x.Id == this.SelectedUser.Id);
        this.Users[index] = user;
        this.Clean();
        this.GetAllUsers();
    }

    RemoveUser(user) {
        this.UsersSvc.DeleteAsync(user.Id)
            .then((response) => {
                this.OnSuccesRemove(user);
            },
                response => console.log(response)
            );
    }

    OnSuccesRemove(user) {
        let index = this.Users.findIndex(x => x.Id == user.Id);
        this.Users.splice(index, 1);
        this.Clean();
    }
    isDataValid() {
        return this.Name != '' && this.Surname1 != '' && this.Surname2 != '' && this.Email && this.Password != '' && this.Dni != '';
    }
}

app.component('users',
    {
        templateUrl: './Scripts/Views/Users/UsersView.html',
        controller: UsersViewModel,
        controllerAs: "vm"
    });