'use strict';

angular
    .module('myApp')
    .config(['$locationProvider', '$routeProvider',
      function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/view2', {
              templateUrl: '/view2/view2.html'
            })
            .when('/connect4', {
              template: '<connect4></connect4>'
            })
            .otherwise({redirectTo: '/connect4'});
      }]);
