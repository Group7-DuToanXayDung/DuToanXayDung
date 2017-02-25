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
					{ "data": "lastname" },
					{ "data": "firstname" },
					{ "data": "username" },
					{ "data": "phone" },
					{ "data": "email" },
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
	//xoa
	$scope.remove = function (user_id, $event, index) {
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
		if ($scope.admin == true)
			$scope.roles.push(1);
		if ($scope.registrar == true)
			$scope.roles.push(2);
		if ($scope.lecturer == true)
			$scope.roles.push(3);
		if ($scope.student == true)
			$scope.roles.push(4);
		for (var i = 0; i < $scope.thanhvien_list.length; i++) {
			if ($scope.thanhvien_list[i].user_code == $scope.thanhvien.user_code) {
				$window.alert('Mã user đã tồn tại');
				return;
			}
		}
		var indata = { 'thanhvien': $scope.thanhvien, 'roles': $scope.roles };
		console.log(indata);
		$http.post('/menu_Users', indata).then(function successCallback(response) {
			$scope.thanhvien.user_id = response.data.insertId;
			$scope.thanhvien.user_status = 1;
			$scope.thanhvien_list.push($scope.thanhvien);

			var dt = jQuery('#data_table').dataTable();
			dt.fnAddData($scope.thanhvien);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			$scope.thanhvien = null;
			$scope.roles = [];
		}, function errorCallback(response) {

		});
	}


	//load form edit
	$scope.editt = function (index) {
		var role_user = [];
		toSelect = $scope.thanhvien_list[index];
		$scope.editthanhvien = toSelect;
		$http({
			method: 'GET',
			url: '/rolesUser/' + toSelect.user_code
		}).then(function successCallback(response) {
			role_user = response.data;
		}, function errorCallback(response) {

		});
		for (var i = 0; i < role_user.length; i++) {
			if (role_user[i].access_id == 1)
				$scope.admin_u = 1;
			if (role_user[i].access_id == 2)
				$scope.registra_u = 2;
			if (role_user[i].access_id == 3)
				$scope.lecturer_u = 3;
			if (role_user[i].access_id == 4)
				$scope.student_u = 4;
		}

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