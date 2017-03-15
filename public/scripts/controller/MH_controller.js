app.controller('dis_controller', ['$scope', '$http', '$window', '$compile', '$timeout', function ($scope, $http, $window, $compile, $timeout) {


	var refresh = function () {

		$http({
			method: 'GET',
			url: '/menu_Monhoc'
		}).then(function successCallback(response) {

			$scope.monhoc_list = response.data;
			loadtable();

		}, function errorCallback(response) {

		});
	}

	var loadtable = function () {
		var i = 1;
		angular.forEach($scope.monhoc_list, function (obj) {
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
			"aaData": $scope.monhoc_list,
			"rowId": "dis_id",
			"aoColumns": [
				{ "data": "No", "sClass": "text","sWidth":"5%" },
				{ "data": "dis_code", "sClass": "text" },
				{ "data": "dis_name", "sClass": "text" },
				{ "data": "dis_hours", "sClass": "number" },
				{ "data": "credits", "sClass": "number" },
				{
					"data": null, mRender: function (data, type, row) {
						if (data.dis_description == "undefined" || data.dis_description == null)
							data.dis_description = "";
						return data.dis_description;
					}, "sClass": "text"
				},
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
						return "<button class='btn btn-warning btn-xs' data-toggle='modal' data-target='#myModalEdit' ng-click='editt(" + index.row + ")'><span class='glyphicon glyphicon-edit'></span></button>&nbsp;"
							+ "<button class='btn btn-danger btn-xs' id=" + data.dis_id + " data-toggle='modal' ng-click='getremove(" + data.dis_id + ")'><span class='glyphicon glyphicon-remove'></span></button>";
					}, "sWidth": "7%"
				}
			],
			"order": [[1, "asc"]]
		});

		t.on('order.dt search.dt draw.dt page.dt destroy.dt', function () {
			$compile(document.getElementById('data_table'))($scope);
		}).draw();

		jQuery('#data_table tbody').on('click', 'tr', function () {
			t.$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
		});
	}


	refresh();




	//them
	$scope.addmonhoc = function () {

		if ($scope.add.$invalid || $scope.add.$pattern) {
			if ($scope.add.strongSecret.$error.required) {
			
				$scope.required = true;
				$timeout(function () {
					$scope.required = false;
				}, 2000);
			};
			if ($scope.add.strongSecret1.$error.required) {
				
				$scope.required1 = true;
				$timeout(function () {
					$scope.required1 = false;
				}, 2000);
			}
			if ($scope.add.strongSecret2.$error.required) {
				
				$scope.required2 = true;
				$timeout(function () {
					$scope.required2 = false;
				}, 2000);
			}
			if ($scope.add.strongSecret3.$error.required) {
				
				$scope.required3 = true;
				$timeout(function () {
					$scope.required3 = false;
				}, 2000);
			}
            return;
        }	
		for (var i = 0; i < $scope.monhoc_list.length; i++) {
			if (angular.lowercase($scope.monhoc_list[i].dis_code) == angular.lowercase($scope.monhoc.dis_code)) {
				$scope.exiss = true;
				$timeout(function () {
					$scope.exiss = false;
				}, 3000);
				return;
			}
		}
		$http.post('/menu_Monhoc', $scope.monhoc).then(function successCallback(response) {
			//refresh();
			//$window.location.reload();
			$scope.monhoc.No = $scope.monhoc_list.length + 1;
			$scope.monhoc.status = 1;
			$scope.monhoc_list.push($scope.monhoc);
			$scope.monhoc.dis_id = response.data.insertId;
			$scope.monhoc_list.push($scope.monhoc);
			var dt = jQuery('#data_table').dataTable();
			dt.fnAddData($scope.monhoc);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			$scope.dis_code = $scope.monhoc.dis_code;
			$scope.dis_name = $scope.monhoc.dis_name;
			$scope.visibility = true;
			$timeout(function () {
				$scope.visibility = false;
			}, 3000);
			$scope.monhoc = null;
		}, function errorCallback(response) {

		});
		refresh();
	}



	$scope.getremove = function (id) {
		$scope.id = id;
		jQuery("#myModalConfirm").modal('show');
	}


	//xoa
	$scope.remove = function () {
		var stt;
		$http.delete('/menu_Monhoc/' + $scope.id).then(function successCallback(response) {
			var tr = jQuery('#' + $scope.id).closest('tr');
			var dt = jQuery('#data_table').dataTable();
			dt.fnDeleteRow(tr);
			$compile(document.getElementById('data_table'))($scope);
			$scope.message = 'Removed successfully';
			jQuery("#myModalmessage").modal('show');
			jQuery("#myModalmessage").on('hidden.bs.modal', function(){
					window.location.reload();
			});
			$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
		}, function errorCallback(response) {

		});
	}




	//load form edit
	$scope.editt = function (index) {
		var toSelect = $scope.monhoc_list[index];
		$scope.editmonhoc = toSelect;
		jQuery("#myModalEdit").on('hidden.bs.modal', function () {
			$timeout(function () {
				window.location.reload();
			}, 500)
		});
	}


	//sua
	$scope.updatemonhoc = function () {
		if ($scope.edit.$invalid || $scope.edit.$pattern ) {
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
			if ($scope.edit.strongSecret2.$error.required) {
				
				$scope.required2 = true;
				$timeout(function () {
					$scope.required2 = false;
				}, 2000);
			}
			if ($scope.edit.strongSecret3.$error.required) {
				
				$scope.required3 = true;
				$timeout(function () {
					$scope.required3 = false;
				}, 2000);
			}
            return;
        }

		for (var i = 0; i < $scope.monhoc_list.length; i++) {
			if (angular.lowercase($scope.monhoc_list[i].dis_code) == angular.lowercase($scope.editmonhoc.dis_code) && $scope.monhoc_list[i].dis_id != $scope.editmonhoc.dis_id) {
				$scope.exiss = true;
				refresh();
				$timeout(function () {
                    $scope.exiss = false;
                }, 3000);
				return;
			}
		}
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
			jQuery("#myModalEdit").modal('hide');
			$scope.message = 'Update Successful';
			jQuery("#myModalmessage").modal('show');
			$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
		}, function errorCallback(response) {

		});
	}
}]);