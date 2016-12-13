    'use strict';

    angular
        .module('sbAdminApp')

        .directive("asCustomer", function () { return { restrict: 'E', replace: 'true', templateUrl: 'views/employee/employee-listrow.view.html' } })       
         .controller('EmployeeCtrl', ['$scope', '$state', '$stateParams', '$modal', '$log', 'Employee', function ($scope, $state, $stateParams, $modal, $log, Employee) {

            var employeeId = $stateParams.employeeId;
          
            $scope.employees = searchEmployees();
            $scope.contacts = [];
            $scope.employee = null;
            $scope.currentEmployee = null;
            $scope.jefe = null;
            $scope.subs = [];            

           /* $scope.$watch('searchText', function (newVal, oldVal) {
            if (newVal != oldVal) {
                searchEmployees();
            }
            }, true); */


            function findJefe(){
                if ($scope.currentEmployee.jefe){
                    Employee.Boss($scope.currentEmployee.jefe)
                    .then(function (data) {
                        $scope.jefe = Employee.boss;
                    });
                }
            }

            function findSubs(){
                Employee.Subs($scope.currentEmployee._id)
                .then(function (data) {
                    $scope.subs = Employee.subs;
                });
            }

            function searchEmployees() {
                //Employee.Search($scope.searchText)
                Employee.Find()
                .then(function (data) {
                    $scope.employees = Employee.employees;
                });
            };

                // Add Customer
            $scope.addEmployee = function () {        
                $scope.employee = {};
               // self.open('sm');        
               $state.go('dashboard.employee.detail.new');
            }

                    // Edit Customer
            $scope.editEmployee = function () {
                $scope.employee = $scope.currentEmployee;
                //self.open('lg');
                $state.go('dashboard.employee.detail.edit');
            }


            $scope.deleteEmployee = function ($event, id) {
                var ans = confirm('Are you sure to delete it?');
                if (ans) {
                    Employee.Delete(id)
                    .then(function () {
                        var element = $event.currentTarget;
                        $(element).closest('div[class^="col-lg-12"]').hide();
                    })
                }
            };

            $scope.createEval = function(id){
                $state.go('dashboard.employee.detail.eval', {idEvaluado : id});
            }

            $scope.employeeDetail = function (id) {
                if (!id) return;
                Employee.Detail(id).then(function (data) {
                    $scope.currentEmployee = Employee.currentEmployee;
                    $scope.jefe = findJefe();
                    $scope.subs = findSubs();
                    $state.go('dashboard.employee.detail', { 'employeeId': id });
                });

            };
                /* Need to call after defining the function
               It will be called on page refresh        */
            $scope.currentEmployee = $scope.employeeDetail(employeeId);


        }]);
