app.controller('dis_controller', ['$scope', '$http', '$window', '$compile', function ($scope, $http, $window, $compile) {


	var refresh = function () {

		$http({
			method: 'GET',
			url: '/menu_Monhoc'
		}).then(function successCallback(response) {

			$scope.monhoc_list = response.data;

			var t = jQuery("#data_table").DataTable({
				"aLengthMenu": [
					[10, 25, 50, 100, -1],
					[10, 25, 50, 100, "All"]
				],
				"iDisplayLength": 10,
				"retrieve": true,
				//"processing": true,
				"deferRender": true,
				"bSort": false,
				"aaData": $scope.monhoc_list,
				"rowId": "dis_id",
				"aoColumns": [
					{ "data": null },
					{ "data": "dis_code" },
					{ "data": "dis_name" },
					{ "data": "dis_hours" },
					{ "data": "credits" },
					{ "data": "dis_description" },
					{
						"data": null, mRender: function (data, type, row) {
							var str = "";
							if (data.status == 0) {
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
							return "<button class='btn btn-danger' id=" + data.dis_id + " data-toggle='modal' ng-click='getremove(" + data.dis_id + ")'><span class='glyphicon glyphicon-remove'></span> Remove</button>";
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
	$scope.addmonhoc = function () {
		for (var i = 0; i < $scope.monhoc_list.length; i++) {
			if ($scope.monhoc_list[i].dis_code == $scope.monhoc.dis_code) {
				$window.alert('Mã mon hoc đã tồn tại');
				return;
			}
		}
		$http.post('/menu_Monhoc', $scope.monhoc).then(function successCallback(response) {
			//refresh();
			//$window.location.reload();
			$scope.monhoc.status = 1;
			$scope.monhoc_list.push($scope.monhoc);
			$scope.monhoc.dis_id = response.data.insertId;
			$scope.monhoc_list.push($scope.monhoc);
			var dt = jQuery('#data_table').dataTable();
			dt.fnAddData($scope.monhoc);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			$scope.monhoc = null;
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
		$http.delete('/menu_Monhoc/' + $scope.id).then(function successCallback(response) {
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
		var toSelect = $scope.monhoc_list[index];
		$scope.editmonhoc = toSelect;
	}


	//sua
	$scope.updatemonhoc = function () {
		$http.put('/menu_Monhoc/' + $scope.editmonhoc.dis_id, $scope.editmonhoc).then(function successCallback(response) {
			for (var i = 0; i < $scope.monhoc_list.length; i++) {
				if ($scope.monhoc_list[i].dis_id == $scope.editmonhoc.dis_id) {
					$scope.monhoc_list[i] = $scope.editmonhoc;
				}
			}
			var dt = jQuery('#data_table').dataTable();
			var row = jQuery("tr#" + $scope.editmonhoc.dis_id);
			dt.fnUpdate($scope.editmonhoc, row); // Row
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			//refresh();

			//$scope.edittruonghoc = null;
		}, function errorCallback(response) {

		});
	}
}]);