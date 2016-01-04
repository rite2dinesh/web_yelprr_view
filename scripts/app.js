'use strict';

var app = angular
  .module('TaskNinjaApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'firebase',
    'toaster',
    'angularMoment',
    'ngCookies'
  ])
  .constant('FURL', 'https://task-ninja.firebaseio.com/')
  .run(function ($rootScope, $location) {
      $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
          // We can catch the error thrown when the $requireAuth promise is rejected
          // and redirect the user back to the login page
          if (error === "AUTH_REQUIRED") {
              $location.path("/index");
          }
      });
  })
  .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
            templateUrl: 'View/bodypart.html',
            controller: 'BrowseController'
        })
          .when('/browse', {
              templateUrl: 'View/browse.html',
              controller: 'BrowseController'
          })
        .when('/browse/:taskId', {
            templateUrl: 'View/browse.html',
            controller: 'BrowseController',
        })
        .when('/register', {
            templateUrl: 'View/register.html',
            controller: 'AuthController'
        })
        .when('/login', {
            templateUrl: 'View/login.html',
            controller: 'AuthController'
        })
        .when('/dashboard', {
            templateUrl: 'View/browse.html',
            controller: 'DashboardController',
            resolve: {
                currentAuth: function (Auth) {
                    return Auth.requireAuth();
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });



  });
