var app = angular.module("sbAdminApp")
app.directive("asCustomer", function () { return { restrict: 'E', replace: 'true', templateUrl: 'views/employee/employeeListRow.html' } });
app.controller('EmployeeCtrl', ['$scope', '$state', '$stateParams', '$modal', '$log', 'Employee', function ($scope, $state, $stateParams, $modal, $log, Employee) {

    var customerId = $stateParams.customerId;

    $scope.searchText = '';
    $scope.employees = searchEmployees();
    $scope.contacts = [];
    $scope.employee = {};
    $scope.currentEmployee = {};

    $scope.$watch('searchText', function (newVal, oldVal) {
    if (newVal != oldVal) {
        searchEmployees();
    }
    }, true);

    function searchEmployees() {
        Employee.search($scope.searchText)
        .then(function (data) {
            $scope.employees = Employee.employees;
        });
    };

    $scope.deleteEmployee = function ($event, id) {
        var ans = confirm('Are you sure to delete it?');
        if (ans) {
            Employee.delete(id)
            .then(function () {
                var element = $event.currentTarget;
                $(element).closest('div[class^="col-lg-12"]').hide();
            })
        }
    };

    $scope.employeeDetail = function (id) {
    if (!id) return;
    Employee.employeeDetail(id)
    .then(function (data) {
        $scope.currentEmployee = Employee.currentEmployee;
        $state.go('employee.detail', { 'employeeId': id });
    });
};

}]);
