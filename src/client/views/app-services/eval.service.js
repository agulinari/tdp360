 'use strict';

angular.module('sbAdminApp')
       .factory('Eval', ['$q', '$http', function ($q, $http) {

    var baseUrl = 'api/evals/';

    var evalService = {};
    evalService.evals = [];
    evalService.currentEval = {};

    evalService.Find = function () {
       var deferred = $q.defer();
       return $http({
           url: baseUrl,
           method: 'GET',
           cache: false
       }).success(function (data) {
           deferred.resolve(
               evalService.evals = data);
       }).error(function (error) {
           deferred.reject(error);
       })
       return deferred.promise;
    }

    // Search Evals
    evalService.Search = function (text) {
       var deferred = $q.defer();
       return $http({
           url: baseUrl + 'search',
           method: 'GET',
           params: { 'searchText': text },
           cache: false
       }).success(function (data) {
           deferred.resolve(
               evalService.evals = data);
       }).error(function (error) {
           deferred.reject(error);
       })
       return deferred.promise;
    }

    // New Eval
    evalService.Create = function (evaluation) {
       var deferred = $q.defer();
       return $http.post(baseUrl, evaluation)
        .success(function (data) {
            deferred.resolve(evalService.evaluation = data);
        })
        .error(function (error) {
            deferred.reject(error);
        })
        return deferred.promise;
    }

    // Update Eval
    evalService.Update = function (evaluation) {
        var deferred = $q.defer();
        return $http.put(baseUrl + evaluation._id, evaluation)
        .success(function (data) {
            deferred.resolve(evalService.evaluation = data);
        })
        .error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }    

   evalService.Detail = function (id) {
       var deferred = $q.defer();
       return $http.get(baseUrl + id)
            .success(function (data) {
                deferred.resolve(
                    evalService.currentEval = data);
            })
       .error(function (error) {
           deferred.reject(error);
       })
       return deferred.promise;
    }

    // delete Eval
    evalService.Delete = function (id) {
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



    return evalService;
}]);