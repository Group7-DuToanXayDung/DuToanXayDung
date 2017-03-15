app.controller('cth_controller', ['$scope', '$http', '$window', '$compile', '$timeout', function ($scope, $http, $window, $compile, $timeout) {
	var refresh = function () {

		$http({
			method: 'GET',
			url: '/menu_CThoc'
		}).then(function successCallback(response) {

			$scope.list_server = response.data;
			loadtable();
		}, function errorCallback(response) {

		});
	}
	//end function refesh
	var loadtable = function () {
		var i = 1;
		angular.forEach($scope.list_server, function (obj) {
			obj.No = i;
			i++;
		});

		var t = jQuery("#data_table").DataTable({
			"aLengthMenu": [
				[10, 25, 50, 100, -1],
				[10, 25, 50, 100, "All"]
			],
			"iDisplayLength": 10,
			"retrieve": true,
			//"processing": true,
			"deferRender": true,
			"aaData": $scope.list_server,
			"rowId": "pro_id",
			"aoColumns": [
				{ "data": "No", "sWidth": "5%" },
				{ "data": "pro_id", "sWidth": "5%" },
				{ "data": "pro_code", "sClass": "text" },
				{ "data": "pro_name", "sClass": "text" },
				//pro_description
				{
					"data": null, mRender: function (data, type, row) {
						if (data.pro_description == "undefined" || data.pro_description == null)
							data.pro_description = "";
						return data.pro_description;
					}, "sClass": "text"
				},
				//pro_pro_status
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
						return "<button class='btn btn-warning btn-xs' data-toggle='modal' data-placement='top' title='Edit' data-target='#myModalEdit' ng-click='editt(" + index.row + ")'><span class='glyphicon glyphicon-edit'></span></button>&nbsp;"
							+ "<button class='btn btn-danger btn-xs' id=" + data.pro_id + " data-toggle='modal' data-placement='top' title='Remove'   ng-click='getremove(" + data.pro_id + ")'><span class='glyphicon glyphicon-remove'></span></button>";
					}, "sWidth": "7%"
				}
			],
			"order": [[1, "asc"]]
		});

		t.on('order.dt search.dt draw.dt page.dt destroy.dt', function () {
			$compile(document.getElementById('data_table'))($scope);
		}).draw();
		// highlight
		jQuery('#data_table tbody').on('click', 'tr', function () {
			t.$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
		});
	}
	refresh();




	//them
	$scope.adds = function () {
		// form add 
		if ($scope.frmAdd.$invalid || $scope.frmAdd.$pattern) {
			if ($scope.frmAdd.strongSecret.$error.required) {

				$scope.required = true;
				$timeout(function () {
					$scope.required = false;
				}, 2000);
			};
			if ($scope.frmAdd.strongSecret1.$error.required) {

				$scope.required1 = true;
				$timeout(function () {
					$scope.required1 = false;
				}, 2000);
			}
			return;
		}
		// lowercase show message success
		for (var i = 0; i < $scope.list_server.length; i++) {
			if (angular.lowercase($scope.list_server[i].pro_code) == angular.lowercase($scope.add_menu.pro_code)) {
				$scope.exiss = true;
				$timeout(function () {
					$scope.exiss = false;
				}, 3000);
				return;
			}
		}
		if ($scope.add_menu.pro_description == null)
			$scope.add_menu.pro_description = "";
		//insert into table 
		$http.post('/menu_CThoc', $scope.add_menu).then(function successCallback(response) {
			//get pro_id kiem tra trùng id
			$scope.add_menu.No = $scope.list_server.length + 1;
			$scope.add_menu.pro_id = response.data.insertId;
			$scope.list_server.push($scope.add_menu);
			//
			var dt = jQuery('#data_table').dataTable();
			dt.fnAddData($scope.add_menu);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			//trang thai = 1 
			$scope.add_menu.pro_status = 1;
			$scope.list_server.push($scope.add_menu);
			$scope.pro_code = $scope.add_menu.pro_code;
			$scope.pro_name = $scope.add_menu.pro_name;
			//
			$scope.visibility = true;
			$timeout(function () {
				$scope.visibility = false;
			}, 3000);
			//
			$scope.add_menu = null;
			refresh();

		}, function errorCallback(response) {

		});
	}
	// ./end function adds

	$scope.getremove = function (id) {
		$scope.id = id;
		jQuery("#myModalConfirm").modal('show');
	}
	//xoa
	$scope.remove = function () {
		var stt;
		$http.delete('/menu_CThoc/' + $scope.id).then(function successCallback(response) {
			var tr = jQuery('#' + $scope.id).closest('tr');
			var dt = jQuery('#data_table').dataTable();
			dt.fnDeleteRow(tr);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			$scope.message = 'Removed successfully';
			jQuery("#myModalmessage").modal('show');
			jQuery("#myModalmessage").on('hidden.bs.modal', function () {
				window.location.reload();
			});
			$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
		}, function errorCallback(response) {
		});
	}
	// ./end function remove




	//load form edit
	$scope.editt = function (index) {
		var toSelect = $scope.list_server[index];
		$scope.edit_menu = toSelect;
		jQuery("#myModalEdit").on('hidden.bs.modal', function () {
			$timeout(function () {
				window.location.reload();
			}, 500)
		});
	}


	//sua
	$scope.updates = function () {
		if ($scope.edit.$invalid || $scope.edit.$pattern) {
			if ($scope.edit.strongSecret.$error.required) {

				$scope.require = true;
				$timeout(function () {
					$scope.require = false;
				}, 2000);
			};
			if ($scope.edit.strongSecret1.$error.required) {

				$scope.required1 = true;
				$timeout(function () {
					$scope.required1 = false;
				}, 2000);
			}
			return;
		}
		for (var i = 0; i < $scope.list_server.length; i++) {
			if (angular.lowercase($scope.list_server[i].pro_code) == angular.lowercase($scope.edit_menu.pro_code) && $scope.list_server[i].pro_id != $scope.edit_menu.pro_id) {
				$scope.exiss = true;
				refresh();
				$timeout(function () {
					$scope.exiss = false;
				}, 3000);
				return;
			}
		}
		$http.put('/menu_CThoc/' + $scope.edit_menu.pro_id, $scope.edit_menu).then(function successCallback(response) {
			for (var i = 0; i < $scope.list_server.length; i++) {
				if ($scope.list_server[i].pro_id == $scope.edit_menu.pro_id) {
					$scope.list_server[i] = $scope.edit_menu;
				}
			}
			var dt = jQuery('#data_table').dataTable();
			var row = jQuery("tr#" + $scope.edit_menu.pro_id);
			dt.fnUpdate($scope.edit_menu, row); // Row
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			jQuery("#myModalEdit").modal('hide');
			$scope.message = 'Update Successful';
			jQuery("#myModalmessage").modal('show');
			$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
		}, function errorCallback(response) {

		});
	}
}]);
// ./end controller