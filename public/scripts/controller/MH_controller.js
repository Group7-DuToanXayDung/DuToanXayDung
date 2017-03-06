app.controller('dis_controller', ['$scope', '$http', '$window', '$compile', '$timeout', function ($scope, $http, $window, $compile, $timeout) {


	var refresh = function () {

		$http({
			method: 'GET',
			url: '/menu_Monhoc'
		}).then(function successCallback(response) {

			$scope.monhoc_list = response.data;

			var t = jQuery("#data_table").DataTable({
				"scrollY": 300, // feature
				"ordering": true, // feature
				responsive: true,
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
					{ "data": null, "orderable": false, "sWidth": "5%" },
					{ "data": "dis_code", "sClass": "text", "sWidth": "10%" },
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
			jQuery('#data_table tbody').on('click', 'tr', function () {
				t.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			});

		}, function errorCallback(response) {

		});
	}



	refresh();




	//them
	$scope.addmonhoc = function () {
		if ($scope.add.$invalid) {
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
			$scope.message = 'Removed successfully';
			jQuery("#myModalmessage").modal('show');
			$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
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
		for (var i = 0; i < $scope.monhoc_list.length; i++) {
			if (angular.lowercase($scope.monhoc_list[i].dis_code) == angular.lowercase($scope.editmonhoc.dis_code) && $scope.monhoc_list[i].dis_id != $scope.editmonhoc.dis_id) {
				$scope.message = 'Update Fail';
				jQuery("#myModalmessage").modal('show');
				$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
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
			$scope.message = 'Update Successful';
			jQuery("#myModalmessage").modal('show');
			$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
		}, function errorCallback(response) {

		});
	}
}]);