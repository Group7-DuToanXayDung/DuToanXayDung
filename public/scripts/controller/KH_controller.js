app.controller('khoahoc_ctl', ['$scope', '$http', '$window', '$compile', '$timeout', function ($scope, $http, $window, $compile, $timeout) {


    var refresh = function () {

        $http({
            method: 'GET',
            url: '/menu_Khoahoc'
        }).then(function successCallback(response) {

            $scope.khoahoc_list = response.data;
            loadtable();
        }, function errorCallback(response) {

        });
    }

    var loadtable = function () {
        var i = 1;
        angular.forEach($scope.khoahoc_list, function (obj) {
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
            "aaData": $scope.khoahoc_list,
            "rowId": "int_id",
            "aoColumns": [
                { "data": "No","sWidth":"5%" },
                { "data": "int_code", "sClass": "text" },
                { "data": "int_name", "sClass": "text" },
                {
                    "data": null, mRender: function (data, type, row) {
                        if (data.int_description == "undefined" || data.int_description == null)
                            data.int_description = "";
                        return data.int_description;
                    }, "sClass": "text"
                },
                {
					"data": null, mRender: function (data, type, row) {
								var str = "";
								var date_star = new Date(data.startdate);
								var date = date_star.getDate();
								var month = date_star.getMonth() + 1;
								str = (month > 10 ? month : "0" + month) + "/" + (date > 10 ? date : "0" + date) + "/" + date_star.getFullYear();
								return str;
					}		
				},
                {
					"data": null, mRender: function (data, type, row) {
						var str = "";
						var date_end = new Date(data.enddate);
						var date = date_end.getDate();
						var month = date_end.getMonth() + 1;
						str = (month > 10 ? month : "0" + month) + "/" + (date > 10 ? date : "0" + date) + "/" + date_end.getFullYear();
						return str;
					}
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
                            + "<button class='btn btn-danger btn-xs' id=" + data.int_id + " data-toggle='modal'  ng-click='getremove(" + data.int_id + ")'><span class='glyphicon glyphicon-remove'></span></button>";
                    }, "sWidth": "7%"
                }
            ],
            "order": [[0, "asc"]]
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
    $scope.addkhoahoc = function () {
        if ($scope.add.$invalid || $scope.add.$pattern ) {
			if ($scope.add.strongSecret.$error.required) {
			
				$scope.require1 = true;
				$timeout(function () {
					$scope.require1 = false;
				}, 2000);
			};
			if ($scope.add.strongSecret1.$error.required) {
				
				$scope.require2 = true;
				$timeout(function () {
					$scope.require2 = false;
				}, 2000);
			}
			if ($scope.add.strongSecret2.$error.required ||$scope.add.strongSecret2.$error.pattern ) {
			
				$scope.date1 = true;
				$timeout(function () {
					$scope.date1 = false;
				}, 2000);
			};
			if ($scope.add.strongSecret3.$error.required ||$scope.add.strongSecret3.$error.pattern ) {
			
				
				$scope.date2 = true;
				$timeout(function () {
					$scope.date2 = false;
				}, 2000);
			}
            return;
        }
		
		
		
		
		
		
		// check id existed
        for (var i = 0; i < $scope.khoahoc_list.length; i++) {
            if (angular.lowercase($scope.khoahoc_list[i].int_code) == angular.lowercase($scope.khoahoc.int_code)) {
                $scope.exiss = true;
                $timeout(function () {
                    $scope.exiss = false;
                }, 3000);
                return;
            }
        }
		
		
		// comparedate
		
				var timeStart = new Date($scope.khoahoc.startdate);
				var timeEnd = new Date($scope.khoahoc.enddate);
				if(timeStart.getFullYear() >= timeEnd.getFullYear()){
					if(timeStart.getMonth() + 1 >= timeEnd.getMonth() + 1){
							if(timeStart.getDate() >= timeEnd.getDate()){
								$scope.comparedate = true;
								$timeout(function () {
								$scope.comparedate = false;
								}, 3000);
								return;
							}
					}					
				} 
					
				
					

		
		
		
		
		
        $http.post('/menu_Khoahoc', $scope.khoahoc).then(function successCallback(response) {
            //refresh();
            //$window.location.reload();
             $scope.khoahoc.No = $scope.khoahoc_list.length + 1;
            $scope.khoahoc.int_id = response.data.insertId;
            $scope.khoahoc.status = 1;
            $scope.khoahoc_list.push($scope.khoahoc);
			var dt = jQuery('#data_table').dataTable();
            dt.fnAddData($scope.khoahoc);
            dt.fnDraw();
            $compile(document.getElementById('data_table'))($scope);
            $scope.int_code = $scope.khoahoc.int_code;
            $scope.int_name = $scope.khoahoc.int_name;
            $scope.visibility = true;
            $timeout(function () {
                $scope.visibility = false;
            }, 3000);
            $scope.khoahoc = null;
        }, function errorCallback(response) {

        });
    }



    $scope.getremove = function (id) {
        $scope.id = id;
        jQuery("#myModalConfirm").modal('show');
    }


    //xoa
    $scope.remove = function () {
		var stt;
        $http.delete('/menu_Khoahoc/' + $scope.id).then(function successCallback(response) {
			 $scope.message = 'Remove Successful';
			jQuery("#myModalmessage").modal('show');
            var tr = jQuery('#' + $scope.id).closest('tr');
            var dt = jQuery('#data_table').dataTable();
            dt.fnDeleteRow(tr);
			dt.fnDraw();
            $compile(document.getElementById('data_table'))($scope);

           jQuery("#myModalmessage").on('hidden.bs.modal', function(){
					window.location.reload();
			});
			
            $timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
        }, function errorCallback(response) {
        });
    }




    //load form edit
    $scope.editt = function (index) {
        toSelect = $scope.khoahoc_list[index];
        $scope.editkhoahoc = toSelect;
        var date_end = new Date(toSelect.enddate);
		var date =  date_end.getDate();
        var month = date_end.getMonth() + 1;
        var str1 = (month > 10 ? month : "0" + month) + "/" + (date > 10 ? date : "0" + date) + "/" + date_end.getFullYear();
        $scope.editkhoahoc.enddate = str1;

        var date_star = new Date(toSelect.startdate);
		var date = date_star.getDate();
        var month = date_star.getMonth() + 1;
        var str2 = (month > 10 ? month : "0" + month) + "/" + (date > 10 ? date : "0" + date) + "/" + date_star.getFullYear();
        $scope.editkhoahoc.startdate = str2;
        jQuery("#myModalEdit").on('hidden.bs.modal', function () {
			$timeout(function () {
				window.location.reload();
			}, 500)
		});
    }


    //sua
    $scope.updatekhoahoc = function () {

		if ($scope.edit.$invalid || $scope.edit.$pattern ) {
			if ($scope.edit.strongSecret.$error.required) {
			
				$scope.require1 = true;
				$timeout(function () {
					$scope.require1 = false;
				}, 2000);
			};
			if ($scope.edit.strongSecret1.$error.required) {
				
				$scope.require2 = true;
				$timeout(function () {
					$scope.require2 = false;
				}, 2000);
			}
			if ($scope.edit.strongSecret2.$error.required ||$scope.edit.strongSecret2.$error.pattern ) {
			
				$scope.date1 = true;
				$timeout(function () {
					$scope.date1 = false;
				}, 3000);
			};
			if ($scope.edit.strongSecret3.$error.required ||$scope.edit.strongSecret3.$error.pattern ) {
			
				
				$scope.date2 = true;
				$timeout(function () {
					$scope.date2 = false;
				}, 3000);
			}
            return;
        }

		
		
		
		// comparedate
		
				var timeStart = new Date($scope.editkhoahoc.startdate);
				var timeEnd = new Date($scope.editkhoahoc.enddate);
				if(timeStart.getFullYear() >= timeEnd.getFullYear()){
					if(timeStart.getMonth() + 1 >= timeEnd.getMonth() + 1){
							if(timeStart.getDate() >= timeEnd.getDate()){
								$scope.comparedate = true;
								$timeout(function () {
								$scope.comparedate = false;
								}, 3000);
								return;
							}
					}					
				} 
		
        for (var i = 0; i < $scope.khoahoc_list.length; i++) {
            if (angular.lowercase($scope.khoahoc_list[i].int_code) == angular.lowercase($scope.editkhoahoc.int_code) && $scope.khoahoc_list[i].int_id != $scope.editkhoahoc.int_id) {
                $scope.message = 'Update Fail';
                jQuery("#myModalmessage").modal('show');
                refresh();
				$scope.exiss = true;
				$timeout(function () {
                    $scope.exiss = false;
                }, 3000);
                $timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
                return;
            }
        }
        $http.put('/menu_Khoahoc/' + $scope.editkhoahoc.int_id, $scope.editkhoahoc).then(function successCallback(response) {
            for (var i = 0; i < $scope.khoahoc_list.length; i++) {
                if ($scope.khoahoc_list[i].int_id == $scope.editkhoahoc.int_id) {
                    $scope.khoahoc_list[i] = $scope.editkhoahoc;
                }
            }
            var dt = jQuery('#data_table').dataTable();
            var row = jQuery("tr#" + $scope.editkhoahoc.int_id);
            dt.fnUpdate($scope.editkhoahoc, row); // Row
            dt.fnDraw();
            $compile(document.getElementById('data_table'))($scope);
            $scope.message = 'Update Successful';
            jQuery("#myModalmessage").modal('show');
            jQuery("#myModalEdit").modal('hide');
            $timeout(function () { jQuery("#myModalmessage").modal('hide') }, 2000);
        }, function errorCallback(response) {

        });
    }
}]);