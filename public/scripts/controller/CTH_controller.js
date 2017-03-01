app.controller('cth_controller', ['$scope', '$http', '$window', '$compile', function ($scope, $http, $window, $compile) {


	var refresh = function () {

		$http({
			method: 'GET',
			url: '/menu_CThoc'
		}).then(function successCallback(response) {

			$scope.cth_list = response.data;

			var t = jQuery("#data_table").DataTable({
				"aLengthMenu": [
					[10, 25, 50, 100, -1],
					[10, 25, 50, 100, "All"]
				],
				"iDisplayLength": 10,
				"retrieve": true,
				//"processing": true,
				"deferRender": true,
				"aaData": $scope.cth_list,
				"rowId": "pro_id",
				"aoColumns": [
					{ "data": "pro_code" },
					{ "data": "pro_name" },
					{ "data": "pro_description" },
					{
						"data": null, mRender: function (data, type, row) {
							var str = "";
							if (data.pro_status == 0) {
								str = "Inactive";
							}
							else {
								str = "Active";
							}
							return str;
						}
					},
					{
						"data": null, mRender: function (data, type, row, index) {
							return "<button class='btn btn-warning' data-toggle='modal' data-target='#myModalEdit' ng-click='editt(" + index.row + ")'><span class='glyphicon glyphicon-edit'></span> Edit</button>";
						}
					},
					{
						"data": null, mRender: function (data, type, row, index) {
							return "<button class='btn btn-danger' id='R" + data.pro_id + "' data-toggle='modal'  ng-click='getremove(" + data.pro_id + ")'><span class='glyphicon glyphicon-remove'></span> Remove</button>";
						}
					}
				],
				"order": [[0, "asc"]],
				"initComplete": function () {
					$compile(document.getElementById('data_table'))($scope);
				}
			});

			t.on('order.dt search.dt draw.dt', function () {
				t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
					cell.innerHTML = i + 1;
					$compile(document.getElementById('data_table'))($scope);
				});
			}).draw();


		}, function errorCallback(response) {

		});
	}



	refresh();




	//them
	$scope.addcth = function () {
		for (var i = 0; i < $scope.cth_list.length; i++) {
			if ($scope.cth_list[i].pro_code == $scope.cth.pro_code) {
				$window.alert('Mã chuong trinh hoc đã tồn tại');
				return;
			}
		}
		$http.post('/menu_CThoc', $scope.cth).then(function successCallback(response) {
			$scope.cth.pro_status = 1;
			$scope.cth.pro_id = response.data.insertId;
			console.log(response.data.insertId);
			$scope.cth_list.push($scope.cth);
			var dt = jQuery('#data_table').dataTable();
			dt.fnAddData($scope.cth);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			$scope.cth = null;
			refresh();
		}, function errorCallback(response) {

		});
	}

	$scope.getremove = function (id) {
		$scope.id = id;
		jQuery("#myModalConfirm").modal('show');
	}



	//xoa

	$scope.remove = function () {
		$http.delete('/menu_CThoc/' + $scope.id).then(function successCallback(response) {
			var tr = jQuery('#' + $scope.id).closest('tr');
			var dt = jQuery('#data_table').dataTable();
			dt.fnDeleteRow(tr);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
		}, function errorCallback(response) {

		});
	}




	//load form edit
	$scope.editt = function (index) {
		var toSelect = $scope.cth_list[index];
		$scope.editcth = toSelect;
	}


	//sua
	$scope.updatecth = function () {
		$http.put('/menu_CThoc/' + $scope.editcth.pro_id, $scope.editcth).then(function successCallback(response) {
			for (var i = 0; i < $scope.cth_list.length; i++) {
				if ($scope.cth_list[i].pro_id == $scope.editcth.pro_id) {
					$scope.cth_list[i] = $scope.editcth;
				}
			}
			var dt = jQuery('#data_table').dataTable();
			var row = jQuery("tr#" + $scope.editcth.pro_id);
			dt.fnUpdate($scope.editcth, row); // Row
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
		}, function errorCallback(response) {

		});
	}
}]);