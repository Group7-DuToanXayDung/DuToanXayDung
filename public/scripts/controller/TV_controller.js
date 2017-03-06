app.controller('thanhvien_ctl', ['$scope', '$http', '$window', '$compile', '$timeout', function ($scope, $http, $window, $compile, $timeout) {


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
				"iDisplayLength": 10,
				"retrieve": true,
				//"processing": true,
				"deferRender": true,
				"aaData": $scope.thanhvien_list,
				"rowId": "user_id",
				"aoColumns": [
					{ "data": "user_id", "sWidth": "5%" },
					{ "data": "user_code", "sClass": "text" },
					{ "data": "lastname", "sClass": "text" },
					{ "data": "firstname", "sClass": "text" },
					{ "data": "username", "sClass": "text" },
					{
						"data": null, mRender: function (data, type, row) {
							if (data.phone == "" || data.phone == null) {
								data.phone = "";
							}
							return data.phone;
						}, "sClass": "number"
					},
					{
						"data": null, mRender: function (data, type, row) {
							if (data.email == "undefined" || data.email == null) {
								data.email = "";
							}
							return data.email;
						}, "sClass": "text"
					},
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
						}, "sWidth": "5%"
					},
					{
						"data": null, mRender: function (data, type, row, index) {
							return "<button class='btn btn-warning btn-xs' data-toggle='modal' data-target='#myModalEdit' ng-click='editt(" + index.row + ")'><span class='glyphicon glyphicon-edit'></span></button>&nbsp;"
								+ "<button class='btn btn-danger btn-xs' id=" + data.user_id + " data-toggle='modal'  ng-click='getremove(" + data.user_id + ")'><span class='glyphicon glyphicon-remove'></span></button>";
						}, "sWidth": "7%"
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
				});
			}).draw();

			jQuery('#data_table tbody').on('click', 'tr', function () {
				t.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			});


		}, function errorCallback(response) {

		});
	}

	refresh();

	$scope.roles = [];

	$scope.getremove = function (id) {
		jQuery("#myModalConfirm").modal('show');
		$scope.id = id;

	}

	//xoa
	$scope.remove = function () {
		$http.delete('/menu_Users/' + $scope.id).then(function successCallback(response) {
			var tr = jQuery('#' + $scope.id).closest('tr');
			var dt = jQuery('#data_table').dataTable();
			dt.fnDeleteRow(tr);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			$scope.message = 'Removed successfully';
			jQuery("#myModalmessage").modal('show');
			$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
		}, function errorCallback(response) {

		});
	}




	//them
	$scope.addthanhvien = function () {
		if ($scope.add.$invalid) {
			return;
		}
		if ($scope.admin == true)
			$scope.roles.push(1);
		if ($scope.registrar == true)
			$scope.roles.push(2);
		if ($scope.lecturer == true)
			$scope.roles.push(3);
		if ($scope.student == true)
			$scope.roles.push(4);
		if ($scope.roles.length == 0) {
			
		}
		for (var i = 0; i < $scope.thanhvien_list.length; i++) {
			if (angular.lowercase($scope.thanhvien_list[i].user_code) == angular.lowercase($scope.thanhvien.user_code) && $scope.thanhvien_list[i].user_id != $scope.thanhvien.user_id) {
				$scope.exiss = true;
				$timeout(function () {
					$scope.exiss = false;
				}, 3000);
				return;
			}
			if (angular.lowercase($scope.thanhvien_list[i].username) == angular.lowercase($scope.thanhvien.username) && $scope.thanhvien_list[i].user_id != $scope.thanhvien.user_id) {
				$scope.exiss1 = true;
				$timeout(function () {
					$scope.exiss1 = false;
				}, 3000);
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
			$scope.user_code = $scope.thanhvien.user_code;
			$scope.lastname = $scope.thanhvien.lastname;
			$scope.firstname = $scope.thanhvien.firstname;
			$scope.visibility = true;
			$timeout(function () {
				$scope.visibility = false;
			}, 3000);
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

		$scope.confirm = $scope.editthanhvien.password;
		$http({
			method: 'GET',
			url: '/rolesUser/' + toSelect.user_code
		}).then(function successCallback(response) {
			$scope.role_user = response.data;
			//console.log(role_user);

			//set lai checkbox
			jQuery("#admin_u").prop('checked', false);
			jQuery("#registra_u").prop('checked', false);
			jQuery("#lecturer_u").prop('checked', false);
			jQuery("#student_u").prop('checked', false);


			//kiem tra su ly checkbox
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
		var role_current = [];
		if (jQuery("#admin_u").is(':checked') == true)
			role_current.push(1);
		if (jQuery("#registra_u").is(':checked') == true)
			role_current.push(2);
		if (jQuery("#lecturer_u").is(':checked') == true)
			role_current.push(3);
		if (jQuery("#student_u").is(':checked') == true)
			role_current.push(4);

		for (var i = 0; i < $scope.truonghoc_list.length; i++) {
			if ($scope.thanhvien_list[i].user_id != $scope.editthanhvien.user_id && angular.lowercase($scope.thanhvien_list[i].user_code) == angular.lowercase($scope.editthanhvien.user_code)) {
				$scope.message = 'Update Fail';
				jQuery("#myModalmessage").modal('show');
				$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
				return;
			}
		}
		//var indata = { 'thanhvien': $scope.editthanhvien, 'roles': role_current };

		$http.put('/menu_Users/' + $scope.editthanhvien.user_id, $scope.editthanhvien).then(function successCallback(response) {
			for (var i = 0; i < $scope.thanhvien_list.length; i++) {
				if ($scope.thanhvien_list[i].user_id == $scope.editthanhvien.user_id) {
					$scope.thanhvien_list[i] = $scope.editthanhvien;
				}
			}
			var dt = jQuery('#data_table').dataTable();
			var row = jQuery("tr#" + $scope.editthanhvien.user_id);
			dt.fnUpdate($scope.editthanhvien, row); // Row
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
		}, function errorCallback(response) {

		});

		$http.put('/rolesUser/' + $scope.editthanhvien.user_code, role_current).then(function successCallback(response) {
			var tr = jQuery('#' + index).closest('tr');
			var dt = jQuery('#data_table').dataTable();
			dt.fnDeleteRow(tr);
			dt.fnDraw();
		}, function errorCallback(response) {

		});
		$scope.message = 'Update Successful';
		jQuery("#myModalmessage").modal('show');
		$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
	}
}]);

app.directive("compareTo", function () {
	return {
		require: "ngModel",
		scope:
		{
			confirmPassword: "=compareTo"
		},
		link: function (scope, elecemt, attributes, modelVal) {
			modelVal.$validators.compareTo = function (val) {
				return val == scope.confirmPassword;
			};
			scope.$watch("confirmPassword", function () {
				modelVal.$validate();
			});
		}
	};
});