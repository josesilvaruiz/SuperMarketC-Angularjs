class ProductsViewModel {

    constructor($ProductsService) {
        this.Clean();
        this.Products = [];
        this.SelectedProduct = null;
        this.ProductsSvc = $ProductsService;
        this.GetAllProducts();
        this.GridProducts =
            {
                enableFiltering: false,
                data: 'vm.Products',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'ProductName', field: 'ProductName' },
                    { name: 'Price', field: 'Price' },
                    { name: 'Edit', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" value="Select" ng-click="grid.appScope.SaveProduct(row.entity)"></div>' },
                    { name: 'Delete', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" value="Delete" ng-click="grid.appScope.RemoveProduct(row.entity)"></div>' }
                ]
            };
    }

    GetAllProducts() {
        this.ProductsSvc.GetAllAsync()
            .then((response) => {
                this.OnGetData(response);
            });
    }

    OnGetData(response) {
        this.Products.length = 0;
        for (let i in response.data) {
            let product = new Product(response.data[i]);
            this.Products.push(product);
        }
    }

    AddNewProduct() {
        let product = new Product();
        product.ProductName = this.ProductName;
        product.Price = this.Price;
        this.ProductsSvc.AddAsync(product)
            .then((response) => { this.OnAddedProduct(response); });
    }
    OnAddedProduct(response) {
        let product = new Product(response.data); // response.data es un objeto que viene de un json
        this.Products.push(product);
        this.Clean();


    }

    Clean() {
        this.ProductName = "";
        this.Price = "";
    }

    SaveProduct(product) {
        this.SelectedProduct = product;
        this.ProductName = product.ProductName;
        this.Price = product.Price;
        this.isInEditMode = true;
    }

    UpdateProduct() {
        this.SelectedProduct.ProductName = this.ProductName;
        this.SelectedProduct.Price = this.Price;
        this.SaveEditProduct();
        this.isInEditMode = false;
    }

    SaveEditProduct() {

        this.ProductsSvc.PutAsync(this.SelectedProduct)
            .then((response) => {
                this.OnSuccesEdit(response);
            },
                response => console.log(response)
            );
    }

    OnSuccesEdit(response) {
        let product = new Product(response.data)
        let index = this.Products.findIndex(x => x.Id == this.SelectedProduct.Id);
        this.Products[index] = product;
        this.Clean();
        this.GetAllProducts();
    }

    RemoveProduct(product) {
        this.ProductsSvc.DeleteAsync(product.Id)
            .then((response) => {
                this.OnSuccesRemove(product);
            },
                response => console.log(response)
            );
    }

    OnSuccesRemove(product) {
        let index = this.Products.findIndex(x => x.Id == product.Id);
        this.Products.splice(index, 1);
        this.Clean();
    }
    isDataValid() {
        return this.ProductName != '' && this.Price != '';
    }
}
app.component('products',
    {
        templateUrl: './Scripts/Views/Products/ProductsView.html',
        controller: ProductsViewModel,
        controllerAs: "vm"
    });
