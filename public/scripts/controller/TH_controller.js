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

//xoa
    $scope.remove = function(id){
		console.log(id);
		$http.delete('/menu_School/' + id).then(function successCallback(response){
			refresh();
		}, function errorCallback(response){
			
		});
	}
//them
	$scope.addtruonghoc = function(){
		$http.post('/menu_School',$scope.truonghoc).then(function successCallback(response){
			refresh();
		},function errorCallback(response){
			
		});
	}
//load form edit
	$scope.edit = function(id){
		console.log(id);
		$http.get('/menu_School/' + id).then(function successCallback(response){
			$scope.truonghoc = response.data[0];
		}, function errorCallback(response){
			
		});
	}
//sua
	$scope.updatetruonghoc = function(){
		console.log("id la: " + $scope.truonghoc.id_th);
		$http.put('/menu_School/' + $scope.truonghoc.id_th, $scope.truonghoc).then(function successCallback(response){
			refresh();
		}, function errorCallback(response){
			
		});
	}
}]);