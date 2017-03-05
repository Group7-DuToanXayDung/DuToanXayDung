app.controller('vnito_ctl', ['$scope', '$http', '$window', '$compile', '$timeout', function ($scope, $http, $window, $compile, $timeout) {
	var refresh = function () {

		$http({
			method: 'GET',
			url: '/menu_VNITO'
		}).then(function successCallback(response) {
			$scope.vnito_list = response.data;
			var t = jQuery("#data_table").DataTable({
				"aLengthMenu": [
					[10, 25, 50, 100, -1],
					[10, 25, 50, 100, "All"]
				],
				"iDisplayLength": 10,
				"retrieve": true,
				"deferRender": true,
				"aaData": $scope.vnito_list,
				"rowId": "com_id",
				"aoColumns": [
					{ "data": "com_id", "sWidth": "5%" },
					{ "data": "com_code", "sClass": "text" },
					{ "data": "com_name", "sClass": "text" },
					{
						"data": null, mRender: function (data, type, row, index) {
							if (data.com_address == "undefined")
								data.com_address = "";
							return data.com_address;
						}, "sClass": "text"
					},
					{
						"data": null, mRender: function (data, type, row, index) {
							if (data.com_contact == "undefined")
								data.com_contact = "";
							return data.com_contact;
						}, "sClass": "text"
					},
					{
						"data": null, mRender: function (data, type, row) {
							var str = "";
							if (data.com_status == 0) {
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
								+ "<button class='btn btn-danger btn-xs' id='R" + data.com_id + "' data-toggle='modal'  ng-click='getremove(" + data.com_id + ")' ><span class='glyphicon glyphicon-remove'></span></button>";
						}, "sWidth": "7%"
					}
				],
				"order": [[0, "asc"]],
				"initComplete": function () {
					$compile(document.getElementById('data_table'))($scope);
				}
			});

			t.on('order.dt search.dt page.dt draw.dt', function () {
				t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
					cell.innerHTML = i + 1;
					$compile(document.getElementById('data_table'))($scope);
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




	//them
	$scope.addvnito = function () {
		if ($scope.add.$invalid) {
			return;
		}
		for (var i = 0; i < $scope.vnito_list.length; i++) {
			if (angular.lowercase($scope.vnito_list[i].com_code) == angular.lowercase($scope.vnito.com_code)) {
				$scope.exiss = true;
				$timeout(function () {
					$scope.exiss = false;
				}, 3000);
				return;
			}
		}
		$http.post('/menu_VNITO', $scope.vnito).then(function successCallback(response) {
			// refresh();
			// $window.location.reload();
			$scope.vnito.com_id = response.data.insertId;
			$scope.vnito_list.push($scope.vnito);

			var dt = jQuery('#data_table').dataTable();
			dt.fnAddData($scope.vnito);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);

			$scope.vnito.com_status = 1;
			$scope.vnito_list.push($scope.vnito);
			$scope.com_code = $scope.vnito.com_code;
			$scope.com_name = $scope.vnito.com_name;
			$scope.visibility = true;
			$timeout(function () {
				$scope.visibility = false;
			}, 3000);
			$scope.vnito = null;
		}, function errorCallback(response) {

		});
	};


	//load form xoa
	$scope.getremove = function (id) {

		$scope.idremove = id;
		jQuery("#myModalConfirm").modal('show');
	}
	//xoa
	$scope.remove = function () {
		jQuery(function () {

			$http.delete('/menu_VNITO/' + $scope.idremove).then(function successCallback(response) {

				var tr = jQuery('#R' + $scope.idremove).closest('tr');
				var dt = jQuery('#data_table').dataTable();
				dt.fnDeleteRow(tr);
				dt.fnDraw();
				$compile(document.getElementById('data_table'))($scope);
				$scope.message = 'Removed successfully';
				jQuery("#myModalmessage").modal('show');
				$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
			}, function errorCallback(response) {
				console.log($scope.a);
			});


		})


	}





	//load form edit
	$scope.editt = function (index) {
		toSelect = $scope.vnito_list[index];
		$scope.editvnito = toSelect;
		// alert($scope.editvnito.);
	}


	//sua
	$scope.updatevnito = function () {
		for (var i = 0; i < $scope.vnito_list.length; i++) {
			if ($scope.vnito_list[i].com_id != $scope.editvnito.com_id && angular.lowercase($scope.vnito_list[i].com_code) == angular.lowercase($scope.editvnito.com_code)) {
				$scope.message = 'Update Fail';
				jQuery("#myModalmessage").modal('show');
				$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
				return;
			}
		}
		$http.put('/menu_VNITO/' + $scope.editvnito.com_id, $scope.editvnito).then(function successCallback(response) {
			for (var i = 0; i < $scope.vnito_list.length; i++) {

				if ($scope.vnito_list[i].com_id === $scope.editvnito.com_id) {
					$scope.vnito_list[i] = $scope.editvnito;
				}
			}
			var dt = jQuery('#data_table').dataTable();
			var row = jQuery("tr#" + $scope.editvnito.com_id);
			dt.fnUpdate($scope.editvnito, row); // Row
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			$scope.message = 'Update Successful';
			jQuery("#myModalmessage").modal('show');
			$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
		}, function errorCallback(response) {

		});
	}
}]);





