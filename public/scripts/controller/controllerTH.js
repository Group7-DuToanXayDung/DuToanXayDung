app.controller('truonghoc_ctl', ['$scope','$http',function($scope, $http){
	console.log('Hello world from controller');
    var refresh = function(){
		$http({
			method: 'GET',
			url: '/menu_School'
		}).then(function successCallback(response){
			console.log("I got the data I requested");
			$scope.truonghoc_list = response.data;
			console.log($scope.truonghoc_list);
		}, function errorCallback(response){
			
		});
	}
	refresh();
    $scope.remove = function(id){
		console.log(id);
		$http.delete('/menu_School/' + id).then(function successCallback(response){
			refresh();
		}, function errorCallback(response){
			
		});
	}
}]);