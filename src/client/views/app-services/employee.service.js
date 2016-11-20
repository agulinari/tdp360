 'use strict';

angular.module('sbAdminApp')
       .factory('Employee', ['$q', '$http', function ($q, $http) {

    var baseUrl = 'api/employees/';

    var employeeService = {};
    employeeService.employees = [];
    employeeService.jefes = [];
    employeeService.boss = {};
    employeeService.currentEmployee = {};

    employeeService.Find = function () {
       var deferred = $q.defer();
       return $http({
           url: baseUrl,
           method: 'GET',
           cache: false
       }).success(function (data) {
           deferred.resolve(
               employeeService.employees = data);
       }).error(function (error) {
           deferred.reject(error);
       })
       return deferred.promise;
    }

    // Search Employees
    employeeService.Search = function (text) {
       var deferred = $q.defer();
       return $http({
           url: baseUrl + 'search',
           method: 'GET',
           params: { 'searchText': text },
           cache: false
       }).success(function (data) {
           deferred.resolve(
               employeeService.employees = data);
       }).error(function (error) {
           deferred.reject(error);
       })
       return deferred.promise;
    }

    // New Employees
    employeeService.Create = function (employee) {
       var deferred = $q.defer();
       return $http.post(baseUrl, employee)
        .success(function (data) {
            deferred.resolve(employeeService.employee = data);
        })
        .error(function (error) {
            deferred.reject(error);
        })
        return deferred.promise;
    }

    // Update Employee
    employeeService.Update = function (employee) {
        var deferred = $q.defer();
        return $http.put(baseUrl + employee._id, employee)
        .success(function (data) {
            deferred.resolve(employeeService.employee = data);
        })
        .error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }    

   employeeService.Detail = function (id) {
       var deferred = $q.defer();
       return $http.get(baseUrl + id)
            .success(function (data) {
                deferred.resolve(
                    employeeService.currentEmployee = data);
            })
       .error(function (error) {
           deferred.reject(error);
       })
       return deferred.promise;
    }

    employeeService.Boss = function (id) {
       var deferred = $q.defer();
       return $http.get(baseUrl + id)
            .success(function (data) {
                deferred.resolve(
                    employeeService.boss = data);
            })
       .error(function (error) {
           deferred.reject(error);
       })
       return deferred.promise;
    }

    // delete Employees
    employeeService.Delete = function (id) {
        var deferred = $q.defer();
        return $http.delete(baseUrl + id)
        .success(function (data) {
             deferred.resolve();
        })
        .error(function (error) {
            deferred.reject(error);
        })
        return deferred.promise;
     }

    employeeService.Subs = function (id) {
       var deferred = $q.defer();
       return $http.get(baseUrl + id +"/subs")
            .success(function (data) {
                deferred.resolve(employeeService.subs = data);
            }).error(function (error) {
                deferred.reject(error);
            })
       return deferred.promise;
    }

    employeeService.Jefes = function(area) {
             var deferred = $q.defer();
       return $http.get(baseUrl + "area/" + area)
            .success(function (data) {
                deferred.resolve(employeeService.jefes = data);
            }).error(function (error) {
                deferred.reject(error);
            })
       return deferred.promise;
    }

    return employeeService;
}]);