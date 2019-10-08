class Product extends Entity
{
    constructor(json)
    {
        super( json);

        if (json)
        {
            this.ProductName = json.productName;
            this.Price = json.price;
        }
        else
        {
            this.ProductName = "";
            this.Price = "";
        }
    }
}