app.controller('dis_controller', ['$scope', '$http', '$window', '$compile', function ($scope, $http, $window, $compile) {


	var refresh = function () {

		$http({
			method: 'GET',
			url: '/menu_Monhoc'
		}).then(function successCallback(response) {

			$scope.monhoc_list = response.data;

			var t = jQuery("#data_table").DataTable({
				"aLengthMenu": [
					[10, 25, 50, 100, -1],
					[10, 25, 50, 100, "All"]
				],
				"iDisplayLength": 50,
				"retrieve": true,
				//"processing": true,
				"deferRender": true,
				"aaData": $scope.monhoc_list,
				"rowId": "dis_id",
				"aoColumns": [
					{ "data": "dis_id" },
                    { "data": "dis_code" },
					{ "data": "dis_name" },
					{ "data": "dis_hours" },
                    { "data": "credits" },
                    { "data": "dis_description" },
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
							return "<button class='btn btn-warning' data-toggle='modal' data-target='#myModalEdit' ng-click='editt(" + index.row + ")'><span class='glyphicon glyphicon-edit'></span> Edit</button>";
						}
					},
					{
						"data": null, mRender: function (data, type, row, index) {
							return "<button class='btn btn-danger' ng-click='remove(" + data.dis_id + ",$event)'><span class='glyphicon glyphicon-remove'></span> Remove</button>";
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



	refresh();




	//them
	$scope.addmonhoc = function () {
		for (var i = 0; i < $scope.monhoc_list.length; i++) {
            if ($scope.monhoc_list[i].dis_code == $scope.monhoc.dis_code) {
                $window.alert('Mã mon hoc đã tồn tại');
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
			$scope.monhoc = null;
			refresh();
		}, function errorCallback(response) {

		});
	}






	//xoa
	$scope.remove = function (id, $event, index) {
		jQuery(function () {
			var t = (confirm("Are you sure"));
			if (t == true) {
				$http.delete('/menu_Monhoc/' + id).then(function successCallback(response) {

					$scope.monhoc_list.splice(index, 1);

					var delButton = $event.target;
					var tr = jQuery(delButton).closest('tr');
					var dt = jQuery('#data_table').dataTable();
					dt.fnDeleteRow(tr);
					dt.fnDraw();
					refresh();
				}, function errorCallback(response) {

				});
			}
		});
	}




//load form edit
	$scope.editt = function (index) {
				var toSelect = $scope.monhoc_list[index];
				$scope.editmonhoc = toSelect;
			}


//sua
	$scope.updatemonhoc = function () {
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
					$compile(document.getElementById('data_table'))($scope);
					//refresh();

					//$scope.edittruonghoc = null;
				}, function errorCallback(response) {

				});
			}
}]);