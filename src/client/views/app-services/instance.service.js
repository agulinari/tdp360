 'use strict';

angular.module('sbAdminApp')
       .factory('Instance', ['$q', '$http', function ($q, $http) {

    var baseUrl = 'api/instances/';

    var instanceService = {};
    instanceService.instances = [];
    instanceService.currentInstance = {};

    instanceService.Find = function () {
       var deferred = $q.defer();
       return $http({
           url: baseUrl,
           method: 'GET',
           cache: false
       }).success(function (data) {
           deferred.resolve(
               instanceService.instances = data);
       }).error(function (error) {
           deferred.reject(error);
       })
       return deferred.promise;
    }

    // New Instance
    instanceService.Create = function (instance) {
       var deferred = $q.defer();
       return $http.post(baseUrl, instance)
        .success(function (data) {
            deferred.resolve(instanceService.instance = data);
        })
        .error(function (error) {
            deferred.reject(error);
        })
        return deferred.promise;
    }

    // Update Instance
    instanceService.Update = function (instance) {
        var deferred = $q.defer();
        return $http.put(baseUrl + instance._id, instance)
        .success(function (data) {
            deferred.resolve(instanceService.instance = data);
        })
        .error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }    

   instanceService.Detail = function (id) {
       var deferred = $q.defer();
       return $http.get(baseUrl + id)
            .success(function (data) {
                deferred.resolve(
                    instanceService.currentInstance = data);
            })
       .error(function (error) {
           deferred.reject(error);
       })
       return deferred.promise;
    }

    // delete Instance
    instanceService.Delete = function (id) {
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



    return instanceService;
}]);