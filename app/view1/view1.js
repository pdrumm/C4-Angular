'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope) {
  $scope.emptySlot = ".";
  $scope.boardWidth = 7;
  $scope.boardHeight = 6;
  function Board(width, height) {
    const row = Array(width).fill($scope.emptySlot);
    return Array(height).fill(row);
  }
  $scope.board = Board($scope.boardWidth, $scope.boardHeight);
})

.directive('c4Board', function() {
  return {
    restrict: 'E',
    scope: {
      board: '='
    },
    templateUrl: 'view1/c4Board.html'
  }
})

.directive('c4Row', function() {
  return {
    restrict: 'E',
    scope: {
      row: '='
    },
    templateUrl: 'view1/c4Row.html'
  }
})

.directive('c4Grid', function() {
  return {
    restrict: 'E',
    scope: {
      value: '@'
    },
    templateUrl: 'view1/c4Grid.html'
  }
})

.directive('c4Disc', function() {
  return {
    restrict: 'E',
    scope: {
      value: '@'
    },
    templateUrl: 'view1/c4Disc.html'
  }
});