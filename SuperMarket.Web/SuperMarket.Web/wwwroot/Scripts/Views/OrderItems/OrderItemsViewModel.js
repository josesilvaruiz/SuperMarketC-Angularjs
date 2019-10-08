class OrderItemsViewModel {
    constructor($ClientsService, $ProductsService, $OrdersService)
    {
        this.OrdersSvc = $OrdersService;
        this.ClientsSvc = $ClientsService;
        this.ProductsSvc = $ProductsService;

        this.selectedClient = null;
        this.selectedProduct = null;
        this.selectedOrder = null;

        this.Clients = [];
        this.Products = [];
        this.Orders = [];       
        this.GetAllClients().then(() =>
        {
            this.GetAllProducts().then(() =>
            {
                this.GenerateOrders();
            });
        });
        alert
        this.GridProducts =
            {
                enableFiltering: false,
                data: 'vm.Products',
                appScopeProvider: this,
                columnDefs:
                    [
                        { name: 'ProductName', field: 'ProductName' },
                        { name: 'Price', field: 'Price' },
                        { name: 'Edit', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" value="Add" ng-click="grid.appScope.addProductToClient(row.entity)"></div>' },
                    ]
            };
        this.GridSelectedProducts =
            {
                enableFiltering: false,
                data: 'vm.selectedOrder.products',
                appScopeProvider: this,
                columnDefs:
                    [
                        { name: 'ProductName', field: 'ProductName' },
                        { name: 'Quantity', field: 'orderQuantity' },
                        { name: 'Devolver', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" value="Devolver" ng-click="grid.appScope.removeProductFromClient(row.entity)"></div>' },
                    ]
            };

    }

    GenerateOrders() {
        this.Orders = this.Clients.map(c => {
            return {
                client: c,
                products: []
            }
        });
    }

    GetAllClients()
    {
        return this.ClientsSvc.GetAllAsync()
            .then((response) =>
            {
                this.OnGetDataClient(response);
            });
    }
    OnGetDataClient(response)
    {
        this.Clients = response.data.map(client => new Client(client));
    }

    addProductToClient(product)
    {
        if (this.selectedOrder !== null)
        {
            let found = false;
            for (let j = 0; j < this.selectedOrder.products.length; j++)
            {
                let productOrder = this.selectedOrder.products[j];
                console.log(this.selectedOrder);
                if (product.Id === productOrder.Id)
                {
                    found = true;
                    productOrder.orderQuantity++;
                }
            }
            if (!found)
            {
                this.selectedOrder.products.push({ ...product, orderQuantity: 1 });
            }
        }
    }
    removeProductFromClient(product)
    {
        if (this.selectedOrder !== null)
        {
            let indexToDelete = -1;
            for (let j = 0; j < this.selectedOrder.products.length; j++)
            {
                let productOrder = this.selectedOrder.products[j];
                if (product.Id === productOrder.Id)
                    alert(productOrder);
                {
                    productOrder.orderQuantity--;
                    if (productOrder.orderQuantity === 0)
                    {
                        indexToDelete = j;
                    }
                }
            }
            if (indexToDelete >= 0)
            {
                this.selectedOrder.products.splice(indexToDelete, 1);
            }
        }
    }

    CalculatePrice()
    {
        let price = 0;
        if (this.selectedOrder !== null)
        {
            for (let j = 0; j < this.selectedOrder.products.length; j++)
            {
                let productOrder = this.selectedOrder.products[j];
                price = price += productOrder.orderQuantity * productOrder.Price;
            }
        }
        return price;
    }

    

    GetAllProducts()
    {
        return this.ProductsSvc.GetAllAsync()
            .then((response) =>
            {
                this.OnGetDataProduct(response);
            });
    }
    OnGetDataProduct(response)
    {
        this.Products.length = 0;  //esto limpia el array cuando lo subimos

        for (let i in response.data)  // response.data es una lista de objetos que viene de un json
        {
            let product = new Product(response.data[i]);
            this.Products.push(product);
        }
    }
    SelectClientOrder()
    {
        for (let i = 0; i < this.Orders.length; i++)
        {
            let order = this.Orders[i];
            if (order.client.Id === this.selectedClient.Id)
            {
                this.selectedOrder = order;
            }
        }
    }
    AddNewOrder()
    {
        let order = new Order();
        order.selectedOrder = this.selectedOrder;
        this.OrdersSvc.AddAsync(order)
            .then((response) => { this.OnAddedOrder(response); });
    }
    OnAddedOrder(response)
    {
        let order = new Order(response.data); // response.data es un objeto que viene de un json
        this.Orders.push(order);
    }

}

app.component('orderitems',
    {
        templateUrl: './Scripts/Views/OrderItems/OrderItemsView.html',
        controller: ['$ClientsService', '$ProductsService', '$OrdersService', OrderItemsViewModel],
        controllerAs: "vm"
    });