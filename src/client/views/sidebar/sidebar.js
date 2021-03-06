'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .directive('sidebar', function() {
    return {
      templateUrl:'views/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:['$scope', '$cookieStore', function($scope, $cookieStore){
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        $scope.idemployee = $cookieStore.get('globals').currentUser.idemployee;
        
        $scope.check = function(x){
          
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };
        
        $scope.multiCheck = function(y){
          
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };

        $scope.show = function(role){
          if (role === $scope.idemployee){
            return true;
          }
          return false;
        };
      }]
    }
  });
