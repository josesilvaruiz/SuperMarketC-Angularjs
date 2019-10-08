class OrdersViewModel {
    constructor($OrdersService) {
        this.Clean();
        this.Orders = [];
        this.SelectedOrder = null;
        this.OrdersSvc = $OrdersService;
        this.GetAllOrders();
        this.GridOptions =
            {
                enableFiltering: false,
                data: 'vm.Orders',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'ClientOrder', field: 'ClientOrder' },
                    { name: 'Products', field: 'products' },
                    { name: 'Edit', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" value="Select" ng-click="grid.appScope.SaveOrder(row.entity)"></div>' },
                    { name: 'Delete', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" value="Delete" ng-click="grid.appScope.RemoveOrder(row.entity)"></div>' }
                ]
            };
    }

    GetAllOrders() {
        this.OrdersSvc.GetAllAsync()
            .then((response) => {
                this.OnGetData(response);
            });
    }

    OnGetData(response) {
        this.Orders.length = 0;
        for (let i in response.data) {
            let order = new Order(response.data[i]);
            this.Orders.push(order);
        }
    }


    AddNewOrder() {
        let order = new Order();
        order.Code = this.Code;
        order.Color = this.Color;
        order.Capacity = this.Capacity;
        order.IsAdapted = this.IsAdapted
        this.OrdersSvc.AddAsync(order)
            .then((response) => { this.OnAddedOrder(response); });
    }
    OnAddedOrder(response) {
        let order = new Order(response.data); // response.data es un objeto que viene de un json
        this.Orders.push(order);

    }

    Clean() {
        this.Code = "";
        this.Color = "";
        this.Capacity = "";
        this.IsAdapted = false;

    }

    SaveOrder(order) {
        this.SelectedOrder = order;
        this.Code = order.Code;
        this.Color = order.Color;
        this.Capacity = order.Capacity;
        this.IsAdapted = order.IsAdapted;
        this.isInEditMode = true;
    }

    UpdateOrder() {
        this.SelectedOrder.Code = this.Code;
        this.SelectedOrder.Color = this.Color;
        this.SelectedOrder.Capacity = this.Capacity;
        this.SelectedOrder.IsAdapted = this.IsAdapted;
        this.SaveEditOrder();
        this.isInEditMode = false;
    }

    SaveEditOrder() {

        this.OrdersSvc.PutAsync(this.SelectedOrder.Id, JSON.stringify(this.SelectedOrder))
            .then((response) => {
                this.OnSuccesEdit(response);
            },
                response => console.log(response)
            );
    }

    OnSuccesEdit(response) {
        let order = new Order(response.data)
        let index = this.Orders.findIndex(x => x.Id == this.SelectedOrder.Id);
        this.Orders[index] = order;
        this.Clean();
        this.GetAllOrders();
    }

    RemoveOrder(order) {
        this.OrdersSvc.DeleteAsync(order.Id)
            .then((response) => {
                this.OnSuccesRemove(order);
            },
                response => console.log(response)
            );
    }

    OnSuccesRemove(order) {
        let index = this.Orders.findIndex(x => x.Id == order.Id);
        this.Orders.splice(index, 1);
        this.Clean();
    }
    isDataValid() {
        return this.Code != '' && this.Capacity != '' && this.Color != '';
    }
}
app.component('orders',
    {
        templateUrl: './Scripts/Views/Orders/OrdersView.html',
        controller: OrdersViewModel,
        controllerAs: "vm"
    });
