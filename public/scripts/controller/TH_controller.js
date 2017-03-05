app.controller('truonghoc_ctl', ['$scope', '$http', '$window', '$compile', '$timeout', function ($scope, $http, $window, $compile, $timeout) {


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
				//"processing": true,
				"deferRender": true,
				"aaData": $scope.truonghoc_list,
				"rowId": "univer_id",
				"aoColumns": [
					{ "data": "univer_id"},
					{ "data": "univer_code","sClass":"text" },
					{
						"data": "univer_name","sClass":"text"
					},
					{
						"data": "univer_address","sClass":"text"
					},
					{ "data": "contact","sClass":"text" },
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
							+"<button class='btn btn-danger btn-xs' id=" + data.univer_id + " data-toggle='modal'  ng-click='getremove(" + data.univer_id + ")'><span class='glyphicon glyphicon-remove'></span></button>";
						},"sWidth": "7%"
					}
				],
				"order": [[1, "asc"]],
				"initComplete": function () {
					$compile(document.getElementById('data_table'))($scope);
				},
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



	$scope.exiss = false;
	//them
	$scope.addtruonghoc = function () {
		if ($scope.add.$invalid) {
			return;
		}

		for (var i = 0; i < $scope.truonghoc_list.length; i++) {
			if (angular.lowercase($scope.truonghoc_list[i].univer_code) == angular.lowercase($scope.truonghoc.univer_code)) {
				
				$scope.exiss = true;
				$timeout(function () {
					$scope.exiss = false;
				}, 3000);
				return;
			}
		}

		if ($scope.truonghoc.univer_address == null || $scope.truonghoc.contact == null) {
			$scope.truonghoc.univer_address = "";
			$scope.truonghoc.contact = "";
		}
		$http.post('/menu_School', $scope.truonghoc).then(function successCallback(response) {
			
			$scope.truonghoc.status = 1;
			$scope.truonghoc_list.push($scope.truonghoc);
			$scope.truonghoc.univer_id = response.data.insertId;
			$scope.truonghoc_list.push($scope.truonghoc);
			var dt = jQuery('#data_table').dataTable();
			dt.fnAddData($scope.truonghoc);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			$scope.univer_code = $scope.truonghoc.univer_code;
			$scope.univer_name = $scope.truonghoc.univer_name;
			$scope.visibility = true;
			$timeout(function () {
				$scope.visibility = false;
			}, 3000);
			$scope.truonghoc = null;
		}, function errorCallback(response) {

		});
	}


	$scope.getremove = function (id) {

		$scope.id = id;
		jQuery("#myModalConfirm").modal('show');
	}



	//xoa
	$scope.remove = function () {
		$http.delete('/menu_School/' + $scope.id).then(function successCallback(response) {
			var tr = jQuery('#' + $scope.id).closest('tr');
			var dt = jQuery('#data_table').dataTable();
			dt.fnDeleteRow(tr);
			dt.fnDraw();
			$compile(document.getElementById('data_table'))($scope);
			$scope.message = 'Removed successfully';
			jQuery("#myModalmessage").modal('show');
			$timeout(function(){jQuery("#myModalmessage").modal('hide')},2000);
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
		for (var i = 0; i < $scope.truonghoc_list.length; i++) {
			if ($scope.truonghoc_list[i].univer_id != $scope.edittruonghoc.univer_id && angular.lowercase($scope.truonghoc_list[i].univer_code) == angular.lowercase($scope.edittruonghoc.univer_code)) {
				$scope.message = 'Update Fail';
				jQuery("#myModalmessage").modal('show');
				$timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
				return;
			}
		}
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
			$scope.disabled = false;
			$scope.message = 'Update Successful';
			jQuery("#myModalmessage").modal('show');
			$timeout(function(){jQuery("#myModalmessage").modal('hide')},2000);
		}, function errorCallback(response) {

		});
	}
}]);