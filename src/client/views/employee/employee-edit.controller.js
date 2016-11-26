var app = angular.module("sbAdminApp")
app.controller('EmployeeEditCtrl', 
 ['$scope', '$modalInstance', 'Employee',
 function ($scope, $modalInstance, Employee) {

    $scope.employee = Employee.currentEmployee;
    $scope.headerTitle = 'Edit Employee';
    $scope.edit = true;

    $scope.jefes = findJefes();

    $scope.findJefes = findJefes;

    function findJefes(){
       Employee.Jefes($scope.employee.area)
                .then(function (data) {
                    $scope.jefes = Employee.jefes;
                    //elimino el actual porq no puede ser jefe de si mismo
                    for(i=0;i<$scope.jefes.length;i++){
                        if($scope.jefes[i]._id == $scope.employee._id){
                          $scope.jefes.splice(i, 1);
                        }
                    }
                });
    }

    $scope.save = function () {
            Employee.Update($scope.employee).then(function (response) {
                $modalInstance.close(response.data);
            })        
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]); 