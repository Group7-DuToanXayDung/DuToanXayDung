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
		if($scope.roles.length == 0)
		{
			$window.alert('Chưa chọn vai trò của thành viên');
			return;
		}
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
	$scope.role_user = [];
	$scope.editt = function (index) {
		var toSelect = $scope.thanhvien_list[index];
		$scope.editthanhvien = toSelect;
		$http({
			method: 'GET',
			url: '/rolesUser/' + toSelect.user_code
		}).then(function successCallback(response) {
			$scope.role_user = response.data;
			//console.log(role_user);


			jQuery("#admin_u").prop('checked', false);
			jQuery("#registra_u").prop('checked', false);
			jQuery("#lecturer_u").prop('checked', false);
			jQuery("#student_u").prop('checked', false);



			for (var i = 0; i < $scope.role_user.length; i++) {
				if ($scope.role_user[i].access_id == 1) {
					jQuery("#admin_u").prop('checked', true);
				}

				if ($scope.role_user[i].access_id == 2) {
					jQuery("#registra_u").prop('checked', true);
				}

				if ($scope.role_user[i].access_id == 3) {
					jQuery("#lecturer_u").prop('checked', true);
				}

				if ($scope.role_user[i].access_id == 4) {
					jQuery("#student_u").prop('checked', true);
				}
			}
		}, function errorCallback(response) {

		});

	}

	//sua
	$scope.updatethanhvien = function () {
		var insert_r=[];
		var delete_r=[];
		var role_current = [];
		if(jQuery("#admin_u").is(':checked')==true)
			role_current.push(1);
		if(jQuery("#registra_u").is(':checked')==true)
			role_current.push(2);
		if(jQuery("#lecturer_u").is(':checked')==true)
			role_current.push(3);
		if(jQuery("#student_u").is(':checked')==true)
			role_current.push(4);


		for(var i=0;i<role_current.length;i++)
		{
			for(var j=0;j<$scope.role_user.length;j++)
			{
				if(role_current[i] != $scope.role_user[j])
					insert_r.push(role_current[i]);
			}
		}
		for(var x=0;x<$scope.role_user.length;x++)
		{
			for(var y=0;y<role_current.length;y++)
			{
				if($scope.role_user[x] != role_current[y])
					delete_r.push($scope.role_user[x].access_id);
			}
		}

		console.log(delete_r);
		console.log(insert_r);
		/*$http.put('/menu_Users/' + $scope.editthanhvien.user_id, $scope.editthanhvien).then(function successCallback(response) {
			for (var i = 0; i < $scope.truonghoc_list.length; i++) {
				if ($scope.thanhvien_list[i].user_id == $scope.editthanhvien.user_id) {
					$scope.thanhvien_list[i] = $scope.editthanhvien;
				}
			}
			var dt = jQuery('#data_table').dataTable();
			var row = jQuery("tr#" + $scope.editthanhvien.user_id);
			dt.fnUpdate($scope.editthanhvien, row); // Row
			dt.fnDraw();
		}, function errorCallback(response) {

		});*/
	}
}]);