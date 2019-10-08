class MenuViewModel {
    constructor() {
    }
  }
  
  app.component("menuItem", {
    templateUrl: "./Scripts/Views/Menu/MenuItem.html",
    controller: MenuViewModel,
    controllerAs: "vm"
  });
  