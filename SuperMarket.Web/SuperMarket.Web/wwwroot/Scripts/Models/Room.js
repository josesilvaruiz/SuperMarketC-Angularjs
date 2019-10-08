class Room extends Entity
{
    constructor(json)
    {
        super( json);

        if (json)
        {
            this.Code = json.code;
            this.Color = json.color;
            this.Capacity = json.capacity;
            this.IsAdapted = json.isAdapted;
        }
        else
        {
            this.Code = "";
            this.Color = "";
            this.Capacity = null;
            this.IsAdapted = false;
        }
    }
}