    'use strict';

    angular
        .module('sbAdminApp')
        .controller('EvalCtrl', function($scope) {
    
            // we will store all of our form data in this object
            $scope.formData = {};

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
    
        });
    
