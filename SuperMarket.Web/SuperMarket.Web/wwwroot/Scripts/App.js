var app = angular.module("SuperMarketApp", ["ngAnimate", "ngRoute", 'ui.grid']);

app.config(function ($routeProvider, $locationProvider) {
   $routeProvider.when("/login", {
      template: "<login></login>",
      activetab: 'login'
   });
    $routeProvider.when("/registers", {
        template: "<registers></registers>",
        activetab: 'registers'
    });
  $routeProvider.when("/employees", {
      template: "<employees></employees>",
      activetab: 'employees'
  });
  $routeProvider.when("/clients", {
      template: "<clients></clients>",
      activetab: 'clients'
  });
  $routeProvider.when("/products", {
      template: "<products></products>",
      activetab: 'products'
  });
    $routeProvider.when("/orderitems", {
        template: "<orderitems></orderitems>",
        activetab: 'orderitems'
    });
    $routeProvider.when("/orders", {
        template: "<orders></orders>",
        activetab: 'orders'
    });
  $routeProvider.otherwise({
    template: "<landing></landing>"
  });

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
});
