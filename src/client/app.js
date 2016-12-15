'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'angular-loading-bar',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });
	
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/home/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return  $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                }),
                $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[                    
                    'views/header/header.js',
                    'views/header/header-notification/header-notification.js',
                    'views/sidebar/sidebar.js',
                    'views/sidebar/sidebar-search/sidebar-search.js'
                    ]
                })
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                })
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
	.state('login', {
		  url: '/login',
		  controller: 'LoginController',
		  templateUrl: 'views/login/login.view.html',
		  resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                }),
			$ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
			  'views/app-services/authentication.service.js',
			  'views/app-services/flash.service.js',
			  'views/app-services/user.service.js',
			  'views/app-services/user.service.local-storage.js',
              'views/login/login.controller.js',    
              ]
            })
          }
        }
	  })
	  	.state('register', {
		  url: '/register',
		  controller: 'RegisterController',
		  templateUrl: 'views/register/register.view.html',
		  resolve: {
          loadMyFiles:function($ocLazyLoad) {
			return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
			  'views/app-services/flash.service.js',
			  'views/app-services/user.service.js',
			  'views/app-services/user.service.local-storage.js',
              'views/register/register.controller.js',    
              ]
            })
          }
        }
	  })
       .state('dashboard.home',{
        url:'/home',
        controller: 'HomeCtrl',
        templateUrl:'views/home/home.view.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'views/home/home.controller.js'
              /*'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'*/
              ]
            })
          }
        }
      })
      .state('dashboard.stats', {
            url: '/stats',
            templateUrl: 'views/stats/stats.view.html',
            controller: 'StatsCtrl',
            resolve: {
            loadMyFiles:function($ocLazyLoad) {
             return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                                    'views/app-services/employee.service.js',  
                      'views/app-services/instance.service.js',   
                'views/app-services/stats.service.js',               
                'views/stats/stats.controller.js'                    
              ]
            })
          }
        }
        })
        .state('dashboard.employee', {
            url: '/employee',
            templateUrl: 'views/employee/employee.view.html',
            controller: 'EmployeeCtrl',
            resolve: {
            loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'views/app-services/employee.service.js',               
                'views/employee/employee.controller.js'                    
              ]
            })
          }
        }
        })
        .state('dashboard.employee.detail.new', {
          url: '/new',
          onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
            $modal.open({
                templateUrl: 'views/employee/employee-modal.view.html',
                controller: 'EmployeeNewCtrl',
                resolve: {
                  loadMyFiles:function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                      'views/employee/employee-new.controller.js'                            
                    ]
                  })   
                  } 
                }      
        }).result.finally(function() {
             $state.go('^',  {}, { reload: 'dashboard.employee'});
        });
    }]         
        })
        .state('dashboard.employee.detail.edit', {
          url: '/edit',
          onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
            $modal.open({
                templateUrl: 'views/employee/employee-modal.view.html',
                controller: 'EmployeeEditCtrl',
                resolve: {
                  loadMyFiles:function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                      'views/employee/employee-edit.controller.js'                            
                    ]
                  })   
                  } 
                }      
        }).result.finally(function() {

            $state.go('^',  {}, { reload: 'dashboard.employee'});
        });
    }]         
        })
        .state('dashboard.employee.detail.eval', {
          url: '/eval/:idEvaluado',
          onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
            $modal.open({
                templateUrl: 'views/employee/employee-eval.view.html',
                controller: 'EmployeeEvalCtrl',
                resolve: {
                  loadMyFiles:function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                      'views/app-services/employee.service.js',  
                      'views/app-services/eval.service.js', 
                      'views/app-services/instance.service.js',   
                      'views/employee/employee-eval.controller.js'                            
                    ]
                  })   
                  } 
                }      
        }).result.finally(function() {

            $state.go('^',  {}, { reload: 'dashboard.employee'});
        });
    }]         
        })
        .state('dashboard.employee.detail', {
            url: '/detail/:employeeId',
            templateUrl: 'views/employee/detail.view.html',
            controller: 'EmployeeCtrl',
            resolve: {
            loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'views/app-services/employee.service.js',               
                'views/employee/employee.controller.js'              ]
            })
          }
        }
        })
        .state('dashboard.employee.detail.subordiantes', {
            url: '/subordiantes/:employeeId',
            templateUrl: 'views/employee/subordiantes.view.html',
            controller: 'EmployeeSubsCtrl',
            resolve: {
            loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'views/app-services/employee.service.js',               
                'views/employee/subordiantes.controller.js'              ]
            })
          }
        }
        }) 

        .state('dashboard.eval', {
            url: '/eval',
            templateUrl: 'views/eval-admin/eval-admin.view.html',
            controller: 'EvalAdminCtrl',
            resolve: {
            loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'views/app-services/eval.service.js',               
                'views/eval-admin/eval-admin.controller.js'                    
              ]
            })
          }
        }
        })

        .state('dashboard.eval.detail', {
            url: '/detail/:evalId',
            templateUrl: 'views/eval-admin/detail.view.html',
            controller: 'EvalAdminCtrl',
            resolve: {
            loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'views/app-services/eval.service.js',               
                'views/eval-admin/eval-admin.controller.js'              
              ]
            })
          }
        }
        })

        .state('dashboard.eval.detail.new', {
          url: '/new',
          onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
            $modal.open({
                templateUrl: 'views/eval-admin/eval-modal.view.html',
                controller: 'EvalNewCtrl',
                resolve: {
                  loadMyFiles:function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                      'views/eval-admin/eval-new.controller.js'                            
                    ]
                  })   
                  } 
                }      
            }).result.finally(function() {
               $state.go('^',  {}, { reload: 'dashboard.eval'});
            });
          }]         
        })


        // route to show our basic form (/form)
        .state('dashboard.evaluate', {
            url: '/evaluate',
            templateUrl: 'views/eval/evalmain.view.html',
            controller: 'EvalCtrl',
                    resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
               'views/app-services/eval.service.js',   
               'views/app-services/instance.service.js',   
                'views/app-services/employee.service.js',   
              'views/eval/eval.controller.js',    
              ]
            })
          }
        }
        })
        .state('dashboard.evaluate.detail', {
            url: '/detail/:instanceId',
            templateUrl: 'views/eval/eval.view.html',
            controller: 'EvalCtrl',
            resolve: {
            loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'views/app-services/eval.service.js',          
                'views/eval-admin/eval-admin.controller.js' 
              ]
            })
          }
        }
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/eval/comunicacion)
        .state('dashboard.evaluate.detail.comunicacion', {
            url: '/comunicacion',
            templateUrl: 'views/eval/comunicacion/comunicacion.view.html'
        })
        
        // url will be /eval/desempenio
        .state('dashboard.evaluate.detail.desempenio', {
            url: '/desempenio',
            templateUrl: 'views/eval/desempenio/desempenio.view.html'
        })
        
        // url will be /eval/factorhumano
        .state('dashboard.evaluate.detail.factorhumano', {
            url: '/factorhumano',
            templateUrl: 'views/eval/factorhumano/factorhumano.view.html'
        })
                // url will be /eval/liderazgo
        .state('dashboard.evaluate.detail.liderazgo', {
            url: '/liderazgo',
            templateUrl: 'views/eval/liderazgo/liderazgo.view.html'
        })
                // url will be /eval/habilidades
        .state('dashboard.evaluate.detail.habilidades', {
            url: '/habilidades',
            templateUrl: 'views/eval/habilidades/habilidades.view.html'
        })
                        // url will be /eval/comentarios
        .state('dashboard.evaluate.detail.comentarios', {
            url: '/comentarios',
            templateUrl: 'views/eval/comentarios/comentarios.view.html'
        });

  }]);

    
