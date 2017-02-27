app.controller('truonghoc_ctl', ['$scope', '$http', '$window', '$compile', function ($scope, $http, $window, $compile) {


	var refresh = function () {

		$http({
			method: 'GET',
			url: '/menu_School'
		}).then(function successCallback(response) {

			$scope.truonghoc_list = response.data;

			var t = jQuery("#data_table").DataTable({
				"aLengthMenu": [
					[10, 25, 50, 100, -1],
					[10, 25, 50, 100, "All"]
				],
				"iDisplayLength": 10,
				"retrieve": true,
				"bSort" : false,
				//"processing": true,
				"deferRender": true,
				"aaData": $scope.truonghoc_list,
				"rowId": "univer_id",
				"aoColumns": [
					{ "data": "univer_id" },
					{ "data": "univer_code" },
					{
						"data": null, mRender: function (data, type, row, index) {
							return "<div id='tooltip'>" + data.univer_name + "<span id='tooltiptext'>" + data.univer_address + "</span></div>";
						}
					},
					{ "data": "contact" },
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
							return "<button class='btn btn-danger' id=" + data.univer_id + " data-toggle='modal'  ng-click='getremove(" + data.univer_id + ")'><span class='glyphicon glyphicon-remove'></span> Remove</button>";
						}
					}
				],
				"order": [[1, "asc"]],
				"initComplete": function () {
					$compile(document.getElementById('data_table'))($scope);
				}
			});

			t.on('order.dt search.dt draw.dt', function () {
				t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
					cell.innerHTML = i+1;
					$compile(document.getElementById('data_table'))($scope);
				});
			}).draw();


		}, function errorCallback(response) {

		});
	}



	refresh();




	//them
	$scope.addtruonghoc = function () {
		for (var i = 0; i < $scope.truonghoc_list.length; i++) {
			if ($scope.truonghoc_list[i].univer_code == $scope.truonghoc.univer_code) {
				$window.alert('Mã truong hoc đã tồn tại');
				return;
			}
		}
		$http.post('/menu_School', $scope.truonghoc).then(function successCallback(response) {
			//refresh();
			//$window.location.reload();
			$scope.truonghoc.status = 1;
			$scope.truonghoc_list.push($scope.truonghoc);
			$scope.truonghoc.univer_id = response.data.insertId;
			$scope.truonghoc_list.push($scope.truonghoc);
			var dt = jQuery('#data_table').dataTable();
			dt.fnAddData($scope.truonghoc);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			$scope.truonghoc = null;
			refresh();
		}, function errorCallback(response) {

		});
	}


	$scope.getremove = function (id) {

		$scope.id = id;

	}



	//xoa
	$scope.remove = function () {
		$http.delete('/menu_School/' + $scope.id).then(function successCallback(response) {
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
		var toSelect = $scope.truonghoc_list[index];
		$scope.edittruonghoc = toSelect;
	}


	//sua
	$scope.updatetruonghoc = function () {
		$http.put('/menu_School/' + $scope.edittruonghoc.univer_id, $scope.edittruonghoc).then(function successCallback(response) {
			for (var i = 0; i < $scope.truonghoc_list.length; i++) {
				if ($scope.truonghoc_list[i].univer_id == $scope.edittruonghoc.univer_id) {
					$scope.truonghoc_list[i] = $scope.edittruonghoc;
				}
			}
			var dt = jQuery('#data_table').dataTable();
			var row = jQuery("tr#" + $scope.edittruonghoc.univer_id);
			dt.fnUpdate($scope.edittruonghoc, row); // Row
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			//refresh();

			//$scope.edittruonghoc = null;
		}, function errorCallback(response) {

		});
	}
}]);