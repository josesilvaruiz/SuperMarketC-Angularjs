     class ClientsViewModel {

    constructor($ClientsService) {
        this.Clean();
        this.Clients = [];
        this.SelectedClient = null;
        this.ClientsSvc = $ClientsService;
        this.GetAllClients();
        this.GridClients =
            {
                enableFiltering: false,
                data: 'vm.Clients',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'Name', field: 'Name' },
                    { name: 'Surname1', field: 'Surname1' },
                    { name: 'Surname2', field: 'Surname2' },
                    { name: 'Email', field: 'Email' },
                    { name: 'Edit', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" value="Select" ng-click="grid.appScope.SaveClient(row.entity)"></div>' },
                    { name: 'Delete', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" value="Delete" ng-click="grid.appScope.RemoveClient(row.entity)"></div>' }
                ]
            };
    }

    GetAllClients() {
        this.ClientsSvc.GetAllAsync()
            .then((response) => {
                this.OnGetData(response);
            });
    }

    OnGetData(response) {
        this.Clients.length = 0;
        for (let i in response.data) {
            let client = new Client(response.data[i]);
            this.Clients.push(client);
        }
    }

    AddNewClient() {
        let client = new Client();
        client.Name = this.Name;
        client.Surname1 = this.Surname1;
        client.Surname2 = this.Surname2;
        client.Email = this.Email;
        client.Password = this.Password
        this.ClientsSvc.AddAsync(client)
            .then((response) => { this.OnAddedClient(response); });
    }
    OnAddedClient(response) {
        let client = new Client(response.data); // response.data es un objeto que viene de un json
        this.Clients.push(client);
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

    SaveClient(client) {
        this.SelectedClient = client;
        this.Name = client.Name;
        this.Surname1 = client.Surname1;
        this.Surname2 = client.Surname2;
        this.Email = client.Email;
        this.Password = client.Password;
        this.isInEditMode = true;
    }

    UpdateClient() {
        this.SelectedClient.Name = this.Name;
        this.SelectedClient.Surname1 = this.Surname1;
        this.SelectedClient.Surname2 = this.Surname2;
        this.SelectedClient.Email = this.Email;
        this.SelectedClient.Password = this.Password;
        this.SaveEditClient();
        this.isInEditMode = false;
    }

    SaveEditClient() {

        this.ClientsSvc.PutAsync(this.SelectedClient)
            .then((response) => {
                this.OnSuccesEdit(response);
            },
                response => console.log(response)
            );
    }

    OnSuccesEdit(response) {
        let client = new Client(response.data)
        let index = this.Clients.findIndex(x => x.Id == this.SelectedClient.Id);
        this.Clients[index] = client;
        this.Clean();
        this.GetAllClients();
    }

    RemoveClient(client) {
        this.ClientsSvc.DeleteAsync(client.Id)
            .then((response) => {
                this.OnSuccesRemove(client);
            },
                response => console.log(response)
            );
    }

    OnSuccesRemove(client) {
        let index = this.Clients.findIndex(x => x.Id == client.Id);
        this.Clients.splice(index, 1);
        this.Clean();
    }
    isDataValid() {
        return this.Name != '' && this.Surname1 != '' && this.Surname2 != '' && this.Email && this.Password != '';
    }
}
app.component('clients',
    {
        templateUrl: './Scripts/Views/Clients/ClientsView.html',
        controller: ClientsViewModel,
        controllerAs: "vm"
    });
