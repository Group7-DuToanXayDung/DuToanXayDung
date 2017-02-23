app.controller('thanhvien_ctl', ['$scope', '$http', '$window', '$compile', function ($scope, $http, $window, $compile) {


	var refresh = function () {
		$http({
			method: 'GET',
			url: '/menu_Users'
		}).then(function successCallback(response) {
			$scope.thanhvien_list = response.data;

			var t = jQuery("#data_table").DataTable({
				"aLengthMenu": [
					[10, 25, 50, 100, -1],
					[10, 25, 50, 100, "All"]
				],
				"iDisplayLength": 50,
				"retrieve": true,
				//"processing": true,
				"deferRender": true,
				"aaData": $scope.thanhvien_list,
				"rowId": "user_id",
				"aoColumns": [
					{ "data": "user_id" },
					{ "data": "user_code" },
					{ "data": "firstname" },
					{ "data": "lastname" },
					{ "data": "phone" },
					{ "data": "email" },
					{ "data": "useraddress" },
					{
						"data": null, mRender: function (data, type, row) {
							var str = "";
							if (data.user_status == 1) {
								str = "Active";
							}
							else {
								str = "Inactive";
							}
							return str;
						}
					},
					{ "data": "username" },
					{
						"data": null, mRender: function (data, type, row, index) {
							return "<button class='btn btn-warning' data-toggle='modal' data-target='#myModalEdit' ng-click='editt(" + index.row + ")'><span class='glyphicon glyphicon-edit'></span> Edit</button>";
						}
					},
					{
						"data": null, mRender: function (data, type, row, index) {
							return "<button class='btn btn-danger' ng-click='remove(" + data.user_id + ",$event,$index)'><span class='glyphicon glyphicon-remove'></span> Remove</button>";
						}
					}
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


		}, function errorCallback(response) {

		});
	}

	$http({
		method: 'GET',
		url: '/menu_School'
	}).then(function successCallback(response) {
		$scope.truonghoc_list_tv = response.data;
	}, function errorCallback(response) {

	});
	$http({
		method: 'GET',
		url: '/roles'
	}).then(function successCallback(response) {
		$scope.roles_list = response.data;
	}, function errorCallback(response) {

	});

	refresh();

	$scope.roles = [];
	$scope.checkedrole = function (access_id) {
		$scope.roles.push(access_id);
	}

	//xoa
	$scope.remove = function (user_id, $event, index) {
		console.log(user_id);
		$http.delete('/menu_Users/' + user_id).then(function successCallback(response) {
			$scope.thanhvien_list.splice(index, 1);
			var delButton = $event.target;
			var tr = jQuery(delButton).closest('tr');
			var dt = jQuery('#data_table').dataTable();
			dt.fnDeleteRow(tr);
			dt.fnDraw();

		}, function errorCallback(response) {

		});
	}
	//them
	$scope.addthanhvien = function () {
		var indata = { 'thanhvien': $scope.thanhvien, 'roles': $scope.roles };
		$http.post('/menu_Users', indata).then(function successCallback(response) {
			$scope.thanhvien.user_id = response.data.insertId;
			$scope.thanhvien.user_status = 1;
			$scope.thanhvien_list.push($scope.thanhvien);

			var dt = jQuery('#data_table').dataTable();
			dt.fnAddData($scope.thanhvien);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			$scope.thanhvien = null;
			$scope.roles = null;
		}, function errorCallback(response) {

		});
	}
	//load form edit
	$scope.editt = function (index) {
		toSelect = $scope.truonghoc_list[index];
		$scope.edittruonghoc = toSelect;
	}

	//sua
	$scope.updatetruonghoc = function () {
		$http.put('/menu_Users/' + $scope.edittruonghoc.id_th, $scope.edittruonghoc).then(function successCallback(response) {
			$scope.edittruonghoc = null;
			refresh();
		}, function errorCallback(response) {

		});
	}
}]);