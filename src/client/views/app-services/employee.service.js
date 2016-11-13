 'use strict';

angular.module('sbAdminApp')
       .factory('Employee', ['$q', '$http', function ($q, $http) {

    var baseUrl = 'api/customer/';
    var subsBaseUrl = 'api/Contact/';

    var employeeService = {};
    employeeService.employees = [];
    employeeService.currentEmployee = {};

    // Search Customers
    employeeService.search = function (text) {
       var deferred = $q.defer();
       return $http({
           url: baseUrl + 'search',
           method: 'GET',
           params: { 'searchText': text },
           cache: true
       }).success(function (data) {
           deferred.resolve(
               employeeService.employees = data);
       }).error(function (error) {
           deferred.reject(error);
       })
       return deferred.promise;
    }

   employeeService.employeeDetail = function (id) {
       var deferred = $q.defer();
       return $http.get(baseUrl + "detail/" + id)
            .success(function (data) {
                deferred.resolve(
                    employeeService.currentEmployee = data);
            })
       .error(function (error) {
           deferred.reject(error);
       })
       return deferred.promise;
    }


    employeeService.employeeSubs = function (id) {
       var deferred = $q.defer();
       return $http.get(subsBaseUrl + "ByEmployeeId/" + id)
            .success(function (data) {
                deferred.resolve(employeeService.subs = data);
            }).error(function (error) {
                deferred.reject(error);
            })
       return deferred.promise;
    }

    return employeeService;
}]);