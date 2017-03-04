var app = angular.module("myApp",["ngRoute","ngMessages"]);
app.config(function($routeProvider){
  $routeProvider
  .when('/menu_Chuongtrinhhoc',{
    templateUrl : 'page/menu_Chuongtrinhhoc.html'
  })
  // .when('/Class',{
    // templateUrl: 'page/Class.html'
  // })
  // .when('/Student',{
    // templateUrl: 'page/student.html'
  // })
  // .when('/createStudent',{
    // templateUrl: 'page/createStudent.html'
  // })
  .when('/menu_School',{
    templateUrl: 'page/menu_School.html'
  })
  // .when('/Diem',{
    // templateUrl: 'page/Diem.html'
  // })
  // .when('/infomation',{
    // templateUrl: 'page/TTCN.html'
  // })
  .when('/menu_Monhoc',{
    templateUrl: 'page/menu_Monhoc.html'
  })
  .when('/menu_Users',{
    templateUrl: 'page/menu_Users.html'
  })
  .when('/menu_VNITO',{
    templateUrl: 'page/menu_VNITO.html'
  })
  .when('/menu_Khoahoc',{
    templateUrl: 'page/menu_Khoahoc.html'
  })  
});







