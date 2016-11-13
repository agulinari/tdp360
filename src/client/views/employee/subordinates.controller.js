// Conatact controller
var app = angular.module("sbAdminApp");
app.controller("EmployeeSubsCtrl", ['$scope', '$state', '$stateParams', '$modal', '$log', 'Employee', 
   function ($scope, $state, $stateParams, $modal, $log, Employee) {

    var employeeId = $stateParams.employeeId;

    $scope.employeeSubs = function (id) {
        return Employee.employeeSubs(id)
        .then(function (data) {
            $scope.subs = Employee.subs;
        });
    };
    $scope.employeeSubs(employeeId);
}]);
