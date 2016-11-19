var app = angular.module("sbAdminApp")
app.controller('EmployeeEditCtrl', 
 ['$scope', '$modalInstance', 'Employee',
 function ($scope, $modalInstance, Employee) {

    $scope.employee = Employee.currentEmployee;
    $scope.headerTitle = 'Edit Employee';

    $scope.save = function () {
            Employee.Update($scope.employee).then(function (response) {
                $modalInstance.close(response.data);
            })        
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]); 