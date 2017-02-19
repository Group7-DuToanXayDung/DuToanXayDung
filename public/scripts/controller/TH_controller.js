app.controller('truonghoc_ctl', ['$scope','$http',function($scope, $http){


    var refresh = function(){
		$http({
			method: 'GET',
			url: '/menu_School'
		}).then(function successCallback(response){
			$scope.truonghoc_list = response.data;
		}, function errorCallback(response){
			
		});
	}

	refresh();

//xoa
    $scope.remove = function(id){
		$http.delete('/menu_School/' + id).then(function successCallback(response){
			refresh();
		}, function errorCallback(response){
			
		});
	}
//them
	$scope.addtruonghoc = function(){
		$http.post('/menu_School',$scope.truonghoc).then(function successCallback(response){
			$scope.truonghoc = null;
			refresh();
		},function errorCallback(response){
			
		});
	}
//load form edit
	$scope.editt = function(index){
		toSelect = $scope.truonghoc_list[index];
		$scope.edittruonghoc = toSelect;
		console.log(toSelect);
	}

//sua
	$scope.updatetruonghoc = function(){
		$http.put('/menu_School/' + $scope.edittruonghoc.id_th, $scope.edittruonghoc).then(function successCallback(response){
			$scope.edittruonghoc = null;
			refresh();
		}, function errorCallback(response){
			
		});
	}
}]);