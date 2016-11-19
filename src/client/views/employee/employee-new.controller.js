var app = angular.module("sbAdminApp")
app.controller('EmployeeNewCtrl', 
 ['$scope', '$modalInstance', 'Employee',
 function ($scope, $modalInstance, Employee) {

    $scope.employee = {};
    $scope.headerTitle = 'Add Employee';

    $scope.save = function () {
            Employee.Create($scope.employee).then(function (response) {
                $modalInstance.close(response.data);
            })        
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]); 