'use strict';

angular
    .module('connect4')
    .component('connect4', {
      templateUrl: 'connect-4/connect-4.template.html',
      controller: Connect4Controller
    });

Connect4Controller.$inject = ['connect4Factory'];

function Connect4Controller(connect4Factory) {
  let self = this;

  self.playerToken = '1';
  self.opponentToken = '2';
  const width = 7,
      height = 6,
      playerTokens = [self.playerToken, self.opponentToken];
  connect4Factory.init(width, height, playerTokens);
  self.board = connect4Factory.getBoard();
  self.currentPlayerToken = connect4Factory.getCurrentPlayerToken();
  self.emptyToken = connect4Factory.getEmptyToken();

  /*
   * Define event handlers
   */
  self.dropDiscInCol = (colIdx) => {
    connect4Factory.dropDiscInCol(colIdx);
    self.currentPlayerToken = connect4Factory.getCurrentPlayerToken();
  };

  self.highlightAvailableDiscInCol = (colIdx) => {
    connect4Factory.highlightAvailableDiscInCol(colIdx);
  };

  self.removeHighlightsFromCol = (colIdx) => {
    connect4Factory.removeHighlightsFromCol(colIdx);
  };

}
