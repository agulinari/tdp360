    'use strict';

    angular
        .module('sbAdminApp')
         .directive("asMyeval", function () { return { restrict: 'E', replace: 'true', templateUrl: 'views/eval/eval-listrow.view.html' } })       
         .controller('EvalCtrl', ['$scope', '$state', '$stateParams', '$modal', '$log', 'Instance', 'Employee', 'Eval', function ($scope, $state, $stateParams, $modal, $log, Instance, Employee, Eval) {
    
            // we will store all of our form data in this object
            $scope.formData = {};


            var instanceId = $stateParams.instanceId;

            $scope.searchText = '';
            $scope.instances = searchInstances();            
            //$scope.currentInstance = null;
            $scope.evaluado = null;
                 

            $scope.$watch('searchText', function (newVal, oldVal) {
            if (newVal != oldVal) {
                searchInstances();
            }
            }, true);


            function searchInstances() {
                //Employee.Search(self.searchText)
                Instance.Find()
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


            $scope.comunicacion =  [
                                    { id: 1 , descripcion: 'Su forma de comunicación es permanente', seleccion: ''},
                                    { id: 2, descripcion: 'Se comunica de forma clara y objetiva', seleccion: ''},
                                    { id: 3, descripcion: 'Se comunica cuando requiere', seleccion: ''},
                                    { id: 4, descripcion: 'Se comunica bien en equipo', seleccion: ''}
                                  ];
    


            $scope.desempenio =  [
                                    { id: 1 , descripcion: 'En todo su equipo se aprecia un buen ambiente', seleccion: ''},
                                    { id: 2, descripcion: 'Fomenta el trabajo en equipo', seleccion: ''},
                                    { id: 3, descripcion: 'Realiza juntas de equipo conjuntas', seleccion: ''},
                                    { id: 4, descripcion: 'Apoya a su equipo de trabajo', seleccion: ''},
                                    { id: 5, descripcion: 'Propone nuevos cambios', seleccion: ''}
                                  ];



            $scope.factorhumano =  [
                                    { id: 1 , descripcion: 'Deja a su equipo laburar tarde', seleccion: ''},
                                    { id: 2, descripcion: 'Delega actividades', seleccion: ''},
                                    { id: 3, descripcion: 'Recluta el personal adecuado', seleccion: ''},
                                    { id: 4, descripcion: 'Consigue una colaboración activa', seleccion: ''},
                                    { id: 5, descripcion: 'Capacidad analítica', seleccion: ''}
                                  ];


            $scope.liderazgo =  [
                                    { id: 1 , descripcion: 'Tiene iniciativa de cambio', seleccion: ''},
                                    { id: 2, descripcion: 'Es una fuente de inspiración', seleccion: ''},
                                    { id: 3, descripcion: 'Fomenta la participación', seleccion: ''},
                                    { id: 4, descripcion: 'Cuenta con el apoyo del equipo', seleccion: ''},
                                    { id: 5, descripcion: 'Representa bien al área', seleccion: ''}
                                  ];


            $scope.habilidades =  [
                                    { id: 1 , descripcion: 'Cuenta con iniciativa', seleccion: ''},
                                    { id: 2, descripcion: 'Tiene creatividad', seleccion: ''},
                                    { id: 3, descripcion: 'Es adaptable al cambio', seleccion: ''},
                                    { id: 4, descripcion: 'Responde bajo presión', seleccion: ''},
                                    { id: 5, descripcion: 'Manejo de conflictos', seleccion: ''}
                                  ];




            // function to process the form
            $scope.processForm = function() {
                alert('awesome!');
            };
    
        }]);
    
