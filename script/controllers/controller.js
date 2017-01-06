
app.controller("myCtrl1",function($scope){
	/*var userdata=[
	{
		username:'thanhnam',
		password:'nam123'
	},
	{
		username:'quoctu',
		password:'tu123'
	}];*/
	$scope.login = function(){
	if($scope.user=='admin' && $scope.pass=='123'){
		alert('thanh cong');
	}else alert('that bai')
	};

});