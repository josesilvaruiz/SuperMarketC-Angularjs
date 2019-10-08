class EmployeesViewModel
{
    constructor($EmployeesService) {
        this.Clean();
        this.Employees = [];
        this.GridEmployees = null;
        this.SelectedEmployee = null;
        this.EmployeesSvc = $EmployeesService;
        this.GetAllEmployees();

        this.GridEmployees =
            {
                enableFiltering: false,
                data: 'vm.Employees',
                appScopeProvider: this,
                columnDefs:
                [
                    { name: 'Name', field: 'Name'},
                    { name: 'Surname1', field: 'Surname1'},
                    { name: 'Surname2', field: 'Surname2'},
                    { name: 'Email', field: 'Email'},
                    { name: 'Edit', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" value="Select" ng-click="grid.appScope.SaveEmployee(row.entity)"></div>' },
                    { name: 'Delete', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" value="Delete" ng-click="grid.appScope.RemoveEmployee(row.entity)"></div>' }
                ]
            };

    }
    GetAllEmployees() {
        this.EmployeesSvc.GetAllAsync()
            .then((response) => {
                this.OnGetData(response);
            });
    }

    OnGetData(response) {
        this.Employees.length = 0;
        for (let i in response.data) {
            let employee = new Employee(response.data[i]);
            this.Employees.push(employee);
        }
    }


    AddNewEmployee() {
        let employee = new Employee();
        employee.Name = this.Name;
        employee.Surname1 = this.Surname1;
        employee.Surname2 = this.Surname2;
        employee.Email = this.Email;
        employee.Password = this.Password
        this.EmployeesSvc.AddAsync(employee)
            .then((response) => { this.OnAddedEmployee(response); });
    }
    OnAddedEmployee(response) {
        let employee = new Employee(response.data); // response.data es un objeto que viene de un json
        this.Employees.push(employee);
        this.Clean();
    }

    Clean() {
        this.Name = "";
        this.Surname1 = "";
        this.Surname2 = "";
        this.Email = "";
        this.Password = "";
    }

    SaveEmployee(employee) {
        this.SelectedEmployee = employee;
        this.Name = employee.Name;
        this.Surname1 = employee.Surname1;
        this.Surname2 = employee.Surname2;
        this.Email = employee.Email;
        this.Password = employee.Password;
        this.isInEditMode = true;
    }

    UpdateEmployee() {
        this.SelectedEmployee.Name = this.Name;
        this.SelectedEmployee.Surname1 = this.Surname1;
        this.SelectedEmployee.Surname2 = this.Surname2;
        this.SelectedEmployee.Email = this.Email;
        this.SelectedEmployee.Password = this.Password;
        this.SaveEditEmployee();
        this.isInEditMode = false;
    }

    SaveEditEmployee() {

        this.EmployeesSvc.PutAsync(this.SelectedEmployee)
            .then((response) => {
                this.OnSuccesEdit(response);
            },
                response => console.log(response)
            );
    }

    OnSuccesEdit(response) {
        let employee = new Employee(response.data)
        let index = this.Employees.findIndex(x => x.Id == this.SelectedEmployee.Id);
        this.Employees[index] = employee;
        this.Clean();
        this.GetAllEmployees();
    }

    RemoveEmployee(employee) {
        this.EmployeesSvc.DeleteAsync(employee.Id)
            .then((response) => {
                this.OnSuccesRemove(employee);
            },
                response => console.log(response)
            );
    }

    OnSuccesRemove(employee) {
        let index = this.Employees.findIndex(x => x.Id == employee.Id);
        this.Employees.splice(index, 1);
        this.Clean();
    }
    isDataValid() {
        return this.Name != '' && this.Surname1 != '' && this.Surname2 != '' && this.Email && this.Password != '';
    }
}

app.component('employees',
    {
        templateUrl: './Scripts/Views/Employees/EmployeesView.html',
        controller: EmployeesViewModel,
        controllerAs: "vm"
    });