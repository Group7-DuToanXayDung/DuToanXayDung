app.controller('cth_controller', ['$scope', '$http', '$window', '$compile', '$timeout', function ($scope, $http, $window, $compile, $timeout) {
	var refresh = function () {

		$http({
			method: 'GET',
			url: '/menu_CThoc'
		}).then(function successCallback(response) {

			$scope.list_server = response.data;

			var t = jQuery("#data_table").DataTable({
				//  ===========new feature=========
				"scrollY": 300, // feature
				"ordering": true, // feature
				responsive: true,
				// ======================
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
			// highlight
			jQuery('#data_table tbody').on('click', 'tr', function () {
				t.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			});

		}, function errorCallback(response) {

		});
	};
	//end function refesh
	refresh();




	//them
	$scope.adds = function () {
		// form add 
		if ($scope.frmAdd.$invalid) {
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
		//insert into table 
		$http.post('/menu_CThoc', $scope.add_menu).then(function successCallback(response) {
			//get pro_id kiem tra trùng id
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
		$http.delete('/menu_CThoc/' + $scope.id).then(function successCallback(response) {
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
	// ./end function remove




	//load form edit
	$scope.editt = function (index) {
		var toSelect = $scope.list_server[index];
		$scope.edit_menu = toSelect;
	}


	//sua
	$scope.updates = function () {
		for (var i = 0; i < $scope.list_server.length; i++) {
			if (angular.lowercase($scope.list_server[i].pro_code) == angular.lowercase($scope.edit_menu.pro_code) && $scope.list_server[i].pro_id != $scope.edit_menu.pro_id) {
				$scope.message = 'Update Fail';
				jQuery("#myModalmessage").modal('show');
				$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
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
			$scope.message = 'Update Successful';
			jQuery("#myModalmessage").modal('show');
			$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
		}, function errorCallback(response) {

		});
	}
}]);
// ./end controller