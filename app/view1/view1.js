'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope) {
  $scope.emptyGrid = '.';
  $scope.player = '1';
  $scope.opponent = '2';
  $scope.boardWidth = 7;
  $scope.boardHeight = 6;
  function Board(width, height) {
    let board = [];
    for (let i=0; i<width; ++i) {
      board.push(Array(height).fill($scope.emptyGrid));
    }
    return board;
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

.directive('c4Col', function($timeout) {

  function getNextAvailableGrid(col, emptyGrid) {
    let nextGrid = -1;
    for (let i=0; i<col.length; ++i) {
      if (col[i] === emptyGrid) {
        nextGrid = i;
      }
    }
    return nextGrid;
  }

  function animateDrop(discElems, stopIdx) {
    for (let i=0; i<=stopIdx; ++i) {
      $timeout(function() {
        angular.element(discElems[i]).addClass('disc-player');
        angular.element(discElems[i-1]).removeClass('disc-player');
      }, i * 400);
    }
  }

  function link(scope, element, attrs) {
    element.on('mouseenter', function() {
      let nextGridIdx = getNextAvailableGrid(scope.col, scope.$parent.$parent.$parent.emptyGrid);
      if (nextGridIdx < 0)
        return;
      let nextDisc = angular.element(element.find('c4-disc')[nextGridIdx]);
      nextDisc.addClass('disc-hover');
    });

    element.on('mouseleave', function() {
      element.find('c4-disc').removeClass('disc-hover');
    });

    element.on('click', function() {
      let nextGridIdx = getNextAvailableGrid(scope.col, scope.$parent.$parent.$parent.emptyGrid);
      if (nextGridIdx < 0)
        return;
      scope.col[nextGridIdx] = scope.$parent.$parent.$parent.player;
      let nextDisc = angular.element(element.find('c4-disc')[nextGridIdx]);
      nextDisc.removeClass('disc-hover');

      animateDrop(angular.element(element.find('c4-disc')), nextGridIdx);
    });
  }

  return {
    restrict: 'E',
    scope: {
      col: '='
    },
    templateUrl: 'view1/c4Col.html',
    link: link
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