var app =angular.module("myApp",[]);
var app2 = angular.module("myApp2", ["ngRoute"]);
app2.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/createProject.html"
    })
    .when("/changepass", {
        templateUrl : "templates/changePass.html"
    })
    .when("/index", {
        templateUrl : "templates/index.html"
    });
    
});