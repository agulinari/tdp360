    'use strict';

    angular
        .module('sbAdminApp')
         .directive("asMyeval", function () { return { restrict: 'E', replace: 'true', templateUrl: 'views/eval/eval-listrow.view.html' } })
          .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'data', '$state', function ($scope, $modalInstance, data, $state) {
              $scope.data = data;
              $scope.close = function(/*result*/){
                $modalInstance.close($scope.data);
                $state.go('dashboard.evaluate', {}, { reload: true });
              };
            }])   
         .controller('EvalCtrl', ['$scope', '$cookieStore', '$state', '$stateParams', '$modal', '$log', 'Instance', 'Employee', 'Eval', function ($scope, $cookieStore, $state, $stateParams, $modal, $log, Instance, Employee, Eval) {
    
            // we will store all of our form data in this object
            $scope.formData = {};


            var instanceId = $stateParams.instanceId;

            $scope.instances = searchInstances();            
            //$scope.currentInstance = null;
            $scope.evaluado = null;
           
            function searchInstances() {
                //Employee.Search(self.searchText)
                var idemployee = $cookieStore.get('globals').currentUser.idemployee;
   
                Instance.Search(idemployee)
                .then(function (data) {
                    var insts = Instance.instances;
                    insts.forEach(function (inst){
                        Employee.Detail(inst.evaluado).then(function(data){
                           inst.evaluado = Employee.currentEmployee;
                        });
                        Eval.Detail(inst.eval).then(function(data){
                           inst.eval = Eval.currentEval;
                        });                        
                    });
                    $scope.instances = insts;
                    angular.forEach($scope.instances, function(value, key){
                        if (value._id === instanceId){
                            $scope.currentInstance = value;
                        }
                    });
                });
            };


            $scope.instanceDetail = function (instance) {
                if (!instance) return;
                    $scope.currentInstance = instance;   
                    $state.go('dashboard.evaluate.detail.comunicacion', { 'instanceId': instance._id });
            };
                /* Need to call after defining the function
               It will be called on page refresh        */
            //$scope.currentInstance = $scope.instanceDetail(instanceId);    

            // function to process the form
            $scope.processForm = function() {
                var instanceRes = {
                                     _id: '',
                                     evaluador: '',
                                     evaluado: '',
                                     eval: '',
                                     comunicacion: [],
                                     desempenio: [],
                                     factorhumano: [],
                                     liderazgo: [],
                                     habilidades: []  
                                    }
                instanceRes._id = $scope.currentInstance._id;
                instanceRes.evaluador = $scope.currentInstance.evaluador;
                instanceRes.evaluado = $scope.currentInstance.evaluado._id;
                instanceRes.eval = $scope.currentInstance.eval._id;
                angular.forEach($scope.currentInstance.eval.comunicacion, function(value, key){
                    var item = {puntaje:0};

                    if (value.hasOwnProperty('seleccion')){
                        switch (value.seleccion){
                            case 'malo':
                                item.puntaje = 1;
                                break;
                            case 'regular':
                                item.puntaje = 5;
                                break;
                            case 'bueno':
                                item.puntaje = 10;
                                break;
                            case 'excelente':
                                item.puntaje = 20;
                                break;
                        }
                    }
                    instanceRes.comunicacion.push(item);
                });

                angular.forEach($scope.currentInstance.eval.desempenio, function(value, key){
                    var item = {puntaje:0};

                    if (value.hasOwnProperty('seleccion')){
                        switch (value.seleccion){
                            case 'malo':
                                item.puntaje = 1;
                                break;
                            case 'regular':
                                item.puntaje = 5;
                                break;
                            case 'bueno':
                                item.puntaje = 10;
                                break;
                            case 'excelente':
                                item.puntaje = 20;
                                break;
                        }
                    }
                    instanceRes.desempenio.push(item);
                });

                angular.forEach($scope.currentInstance.eval.factorhumano, function(value, key){
                    var item = {puntaje:0};

                    if (value.hasOwnProperty('seleccion')){
                        switch (value.seleccion){
                            case 'malo':
                                item.puntaje = 1;
                                break;
                            case 'regular':
                                item.puntaje = 5;
                                break;
                            case 'bueno':
                                item.puntaje = 10;
                                break;
                            case 'excelente':
                                item.puntaje = 20;
                                break;
                        }
                    }
                    instanceRes.factorhumano.push(item);
                });


                angular.forEach($scope.currentInstance.eval.liderazgo, function(value, key){
                    var item = {puntaje:0};

                    if (value.hasOwnProperty('seleccion')){
                        switch (value.seleccion){
                            case 'malo':
                                item.puntaje = 1;
                                break;
                            case 'regular':
                                item.puntaje = 5;
                                break;
                            case 'bueno':
                                item.puntaje = 10;
                                break;
                            case 'excelente':
                                item.puntaje = 20;
                                break;
                        }
                    }
                    instanceRes.liderazgo.push(item);
                });

                angular.forEach($scope.currentInstance.eval.habilidades, function(value, key){
                    var item = {puntaje:0};

                    if (value.hasOwnProperty('seleccion')){
                        switch (value.seleccion){
                            case 'malo':
                                item.puntaje = 1;
                                break;
                            case 'regular':
                                item.puntaje = 5;
                                break;
                            case 'bueno':
                                item.puntaje = 10;
                                break;
                            case 'excelente':
                                item.puntaje = 20;
                                break;
                        }
                    }
                    instanceRes.habilidades.push(item);
                });
                instanceRes.status = 'F';
                Instance.Update(instanceRes).then(function (response) {                
                    $scope.open('success');
                })      
            };


            $scope.data = {
              boldTextTitle: "Exito",
              textAlert : "La evaluación ha concluido y los resultados serán evaluados",
              mode : 'success'
            }  

           $scope.open = function (mode) {

                $scope.data.mode = mode;

                var modalInstance = $modal.open({
                  templateUrl: 'views/eval/alertmodal.html',
                  controller: 'ModalInstanceCtrl',
                  backdrop: true,
                  keyboard: true,
                  backdropClick: true,
                  size: 'lg',
                  resolve: {
                    data: function () {
                      return $scope.data;
                    }
                  }
                 });


                modalInstance.result.then(function (selectedItem) {
                  $scope.selected = selectedItem;
                    //alert( $scope.selected);
                }, function () {
                  $log.info('Modal dismissed at: ' + new Date());                
                });

             }

    
        }]);
   

