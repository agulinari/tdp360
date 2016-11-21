    'use strict';

    angular
        .module('sbAdminApp')

        .directive("asEval", function () { return { restrict: 'E', replace: 'true', templateUrl: 'views/eval-admin/eval-listrow.view.html' } })       
         .controller('EvalAdminCtrl', ['$scope', '$state', '$stateParams', '$modal', '$log', 'Eval', function ($scope, $state, $stateParams, $modal, $log, Eval) {

            var evalId = $stateParams.evalId;

            $scope.searchText = '';
            $scope.evals = searchEvals();
            $scope.eval = null;
            $scope.currentEval = null;

            $scope.$watch('searchText', function (newVal, oldVal) {
            if (newVal != oldVal) {
                searchEvals();
            }
            }, true);


            function searchEvals() {
                //Employee.Search(self.searchText)
                Eval.Find()
                .then(function (data) {
                    $scope.evals = Eval.evals;
                });
            };

                // Add Customer
            $scope.addEval = function () {        
                $scope.eval = {};
               // self.open('sm');        
               $state.go('dashboard.eval.detail.new');
            }

                    // Edit Customer
            $scope.editEval = function () {
                $scope.eval = $scope.currentEval;
                //self.open('lg');
                $state.go('dashboard.eval.detail.edit');
            }


            $scope.deleteEval = function ($event, id) {
                var ans = confirm('Are you sure to delete it?');
                if (ans) {
                    Eval.Delete(id)
                    .then(function () {
                        var element = $event.currentTarget;
                        $(element).closest('div[class^="col-lg-12"]').hide();
                    })
                }
            };

            $scope.evalDetail = function (id) {
                if (!id) return;
                Eval.Detail(id).then(function (data) {
                    $scope.currentEval = Eval.currentEval;    
                    $state.go('dashboard.eval.detail', { 'evalId': id });
                });

            };
                /* Need to call after defining the function
               It will be called on page refresh        */
            $scope.currentEval = $scope.evalDetail(evalId);


        }]);
