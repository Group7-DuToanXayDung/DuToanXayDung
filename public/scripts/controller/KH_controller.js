app.controller('khoahoc_ctl', ['$scope', '$http', '$window', '$compile', function ($scope, $http, $window, $compile) {


    var refresh = function () {

        $http({
            method: 'GET',
            url: '/menu_Khoahoc'
        }).then(function successCallback(response) {

            $scope.khoahoc_list = response.data;

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
                    { "data": "int_id", "bSortable": false  },
                    { "data": "int_code","bSortable": false },
                    { "data": "int_name","bSortable": false },
                    { "data": "int_description","bSortable": false },
                    {
                        "data": null, mRender: function (data, type, row) {
                            var str = "";
                            var date_star = new Date(data.startdate);
                            var month = date_star.getMonth() + 1;
                            str = (month > 10 ? month : "0" + month) + "/" + date_star.getDate() + "/" + date_star.getFullYear();
                            return str;
                        },"bSortable": false
                    },
                    {
                        "data": null, mRender: function (data, type, row) {
                            var str = "";
                            var date_end = new Date(data.enddate);
                            var month = date_end.getMonth() + 1;
                            str = (month > 10 ? month : "0" + month) + "/" + date_end.getDate() + "/" + date_end.getFullYear();
                            return str;
                        },"bSortable": false
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
                        },"bSortable": false
                    },
                    {
                        "data": null, mRender: function (data, type, row, index) {
                            return "<button class='btn btn-warning' data-toggle='modal' data-target='#myModalEdit' ng-click='editt(" + index.row + ")'><span class='glyphicon glyphicon-edit'></span> Edit</button>";
                        },"bSortable": false
                    },
                    {
                        "data": null, mRender: function (data, type, row, index) {
                            console.log(index.row);
                            return "<button class='btn btn-danger' id="+data.int_id+" data-toggle='modal' data-target='#myModalConfirm'  ng-click='getremove("+data.int_id+","+data.int_id+")'><span class='glyphicon glyphicon-remove'></span> Remove</button>";
                        },"bSortable": false
                    }
                ],
                //"order": [[0, "asc"]],
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
    $scope.addkhoahoc = function () {
        for (var i = 0; i < $scope.khoahoc_list.length; i++) {
            if ($scope.khoahoc_list[i].int_code == $scope.khoahoc.int_code) {
                $window.alert('Mã khoa hoc đã tồn tại');
                return;
            }
        }
        $http.post('/menu_Khoahoc', $scope.khoahoc).then(function successCallback(response) {
            //refresh();
            //$window.location.reload();
            $scope.khoahoc.int_id = response.data.insertId;
            $scope.khoahoc_list.push($scope.khoahoc);

            var dt = jQuery('#data_table').dataTable();
            dt.fnAddData($scope.khoahoc);
            dt.fnDraw();
            $compile(document.getElementById('data_table'))($scope);

            $scope.khoahoc.status = 1;
            $scope.khoahoc_list.push($scope.khoahoc);
            $scope.khoahoc = null;
            refresh();
        }, function errorCallback(response) {

        });
    }



    $scope.getremove = function(id,id2){
	console.log(id);
		$scope.idremove = id;
		$scope.indexremove = id2;

	 }	


    //xoa
    $scope.remove = function () {
        $http.delete('/menu_Khoahoc/' + $scope.idremove).then(function successCallback(response) {
            var tr = jQuery('#' + $scope.indexremove).closest('tr');
            var dt = jQuery('#data_table').dataTable();
            dt.fnDeleteRow(tr);
            dt.fnDraw();
            $compile(document.getElementById('data_table'))($scope);
        }, function errorCallback(response) {
        });
    }




    //load form edit
    $scope.editt = function (index) {
        toSelect = $scope.khoahoc_list[index];
        $scope.editkhoahoc = toSelect;
        var date_end = new Date(toSelect.enddate);
        var month1 = date_end.getMonth() + 1;
        var str1 = (month1 > 10 ? month1 : "0" + month1) + "/" + date_end.getDate() + "/" + date_end.getFullYear();
        $scope.editkhoahoc.enddate = str1;

        var date_star = new Date(toSelect.startdate);
        var month2 = date_star.getMonth() + 1;
        var str2 = (month2 > 10 ? month2 : "0" + month2) + "/" + date_star.getDate() + "/" + date_star.getFullYear();
        $scope.editkhoahoc.startdate = str2;
    }


    //sua
    $scope.updatekhoahoc = function () {
        /*for (var i = 0; i < $scope.khoahoc_list.length; i++) {
            if ($scope.khoahoc_list[i].int_code == $scope.editkhoahoc.int_code && $scope.khoahoc_list[i].int_id != $scope.editkhoahoc.int_id) {
                $window.alert('Mã khóa học đã tồn tại');
                return;
            }
        }bị tí lỗi chưa debug dc*/
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
            //refresh();

            //$scope.edittruonghoc = null;
        }, function errorCallback(response) {

        });
    }
}]);