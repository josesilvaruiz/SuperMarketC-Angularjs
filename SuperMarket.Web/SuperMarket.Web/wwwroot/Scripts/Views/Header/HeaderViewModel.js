class HeaderViewModel {
  constructor($location, $route, $TokenService)
  {
    this.Location = $location;
      this.Route = $route;
      this.TokenService = $TokenService;
  }

  ShowView(option)
  {
    this.Location.path("/" + option);
    }
}

app.component("header",
{
  templateUrl: "./Scripts/Views/Header/HeaderView.html",
  controller: HeaderViewModel,
  controllerAs: "vm"
});
