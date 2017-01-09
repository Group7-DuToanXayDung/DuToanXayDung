
app.controller("myCtrl1",function($scope, $window){
	var userdata=[
	{
		username:'thanhnam',
		password:'nam123'
	},
	{
		username:'quoctu',
		password:'tu123'
	}];
	$scope.login = function(){
		angular.forEach(userdata, function(value, key){
		  	if($scope.user==value.username&& $scope.pass==value.password){			
					var url =("index.html");
					$window.location.href=url;
				};									 
			});
		

	  };
});