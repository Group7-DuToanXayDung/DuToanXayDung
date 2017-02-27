app.controller('vnito_ctl', ['$scope','$http','$window','$compile',function($scope, $http, $window, $compile){
    var refresh = function(){
											
		$http({
			method: 'GET',
			url: '/menu_VNITO'
		}).then(function successCallback(response){
			$scope.vnito_list = response.data;
			var t = jQuery("#data_table").DataTable({
						"aLengthMenu": [
							  [10, 25, 50, 100, -1],
							  [10, 25, 50, 100, "All"]
						],
						"iDisplayLength": 10,
						"retrieve": true,
						"deferRender": true,
						"aaData": $scope.vnito_list,
						"rowId": "com_id",
						"aoColumns": [
							{ "data": "com_id", "bSortable": false},
							{ "data": "com_code", "bSortable": false},
							{ "data": null, mRender: function(data, type, row, index) {
								return "<div id='tooltip'>"+data.com_name+"<span id='tooltiptext'>"+data.com_address+"</span></div>";
							}, "bSortable": false},
							{ "data": "com_contact" },
							{ "data": null,  mRender: function (data, type, row) {
												var str = "";
												if(data.com_status == 0)
												{
													str = "Inactive";
												}
												else
												{
													str = "Active";
												}
												return str;
											}, "bSortable": false },
							{ "data": null, mRender: function (data, type, row, index) {
												return "<button class='btn btn-warning' data-toggle='modal' data-target='#myModalEdit' ng-click='editt(" + index.row + ")'><span class='glyphicon glyphicon-edit'></span> Edit</button>";
											}, "bSortable": false},		
							{ "data": null, mRender: function (data, type, row, index) {
												return "<button class='btn btn-danger' id="+index.row+" data-toggle='modal' data-target='#myModalConfirm'  ng-click='getremove("+data.com_id+","+index.row+")' ><span class='glyphicon glyphicon-remove'></span> Remove</button>";
											}, "bSortable": false}
						],
						"order": [[2, "asc"]],
						"initComplete": function () {
							$compile(document.getElementById('data_table'))($scope);						
						}
					});

				t.on('order.dt search.dt', function () {
					t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
						cell.innerHTML = i + 1;
					});
				}).draw();
			
			
		}, function errorCallback(response){
			
		});
	}
	
	
	
	refresh();




//them
	$scope.addvnito = function(){
		$http.post('/menu_VNITO',$scope.vnito).then(function successCallback(response){
			// refresh();
			// $window.location.reload();
			$scope.vnito.com_id = response.data.insertId;
			$scope.vnito_list.push($scope.vnito);
			
			var dt = jQuery('#data_table').dataTable();
			dt.fnAddData($scope.vnito);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			
			$scope.vnito.com_status = 1;
			$scope.vnito_list.push($scope.vnito);
			$scope.vnito = null;
			refresh();
		},function errorCallback(response){
			
		});
	};
	

//load form xoa
$scope.a;
$scope.c;
	$scope.getremove = function(id,index){

		$scope.idremove = id;
		$scope.indexremove = index;

	 }		
		

	

//xoa
    $scope.remove = function(){
		jQuery(function () {

							$http.delete('/menu_VNITO/' + $scope.idremove).then(function successCallback(response){	
								
								var tr = jQuery('#'+$scope.indexremove ).closest('tr');
								var dt = jQuery('#data_table').dataTable();
								dt.fnDeleteRow(tr);
								dt.fnDraw();
								$compile(document.getElementById('data_table'))($scope);
							}, function errorCallback(response){
								console.log($scope.a);
							});	
			
				
		})
				

	}
		




//load form edit
	$scope.editt = function(index){
		toSelect = $scope.vnito_list[index];
		$scope.editvnito = toSelect;
		// alert($scope.editvnito.);
	}		

	
//sua
	$scope.updatevnito = function(){
		$http.put('/menu_VNITO/' + $scope.editvnito.com_id, $scope.editvnito).then(function successCallback(response){
			for (var i = 0; i < $scope.vnito_list.length; i++) {
				
				if ($scope.vnito_list[i].com_id === $scope.editvnito.com_id) {
					$scope.vnito_list[i] = $scope.editvnito;
				}
			}
			var dt = jQuery('#data_table').dataTable();
			var row = jQuery("tr#" + $scope.editvnito.com_id);
			dt.fnUpdate($scope.editvnito, row); // Row
			dt.fnDraw();
			 $compile(document.getElementById('data_table'))($scope);
		}, function errorCallback(response){
			
		});
	}
}]);
	
	
	
	
	
