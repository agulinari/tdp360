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
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'views/header/header.js',
                    'views/header/header-notification/header-notification.js',
                    'views/sidebar/sidebar.js',
                    'views/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
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
        .state('dashboard.employee.detail', {
            url: '^/employee/detail/{employeeId:[0-9]{1,5}}',
            templateUrl: 'views/employee/detail.view.html',
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
        .state('dashboard.employee.detail.subordiantes', {
            url: '^/employee/detail/subordiantes/{employeeId:[0-9]{1,5}}',
            templateUrl: 'vies/employee/subordiantes.view.html',
            controller: 'EmployeeSubsCtrl',
            resolve: {
            loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                'views/app-services/employee.service.js',               
                'views/employee/subordiantes.controller.js'    
              ]
            })
          }
        }
        }) 
        // route to show our basic form (/form)
        .state('dashboard.eval', {
            url: '/eval',
            templateUrl: 'views/eval/eval.view.html',
            controller: 'EvalCtrl',
                    resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'views/eval/eval.controller.js',    
              ]
            })
          }
        }
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/eval/comunicacion)
        .state('dashboard.eval.comunicacion', {
            url: '/comunicacion',
            templateUrl: 'views/eval/comunicacion/comunicacion.view.html'
        })
        
        // url will be /eval/desempenio
        .state('dashboard.eval.desempenio', {
            url: '/desempenio',
            templateUrl: 'views/eval/desempenio/desempenio.view.html'
        })
        
        // url will be /eval/factorhumano
        .state('dashboard.eval.factorhumano', {
            url: '/factorhumano',
            templateUrl: 'views/eval/factorhumano/factorhumano.view.html'
        })
                // url will be /eval/liderazgo
        .state('dashboard.eval.liderazgo', {
            url: '/liderazgo',
            templateUrl: 'views/eval/liderazgo/liderazgo.view.html'
        })
                // url will be /eval/habilidades
        .state('dashboard.eval.habilidades', {
            url: '/habilidades',
            templateUrl: 'views/eval/habilidades/habilidades.view.html'
        });

  }]);

    
