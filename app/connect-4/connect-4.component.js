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

  const width = 7,
      height = 6;
  connect4Factory.init(width, height);
  self.board = connect4Factory.getBoard();
  self.playerToken = connect4Factory.getPlayerToken();
  self.emptyToken = connect4Factory.getEmptyToken();

  /*
   * Define event helpers
   */
  function findNextAvailableDiscInCol(col) {
    let rowIdx = col.length - 1;
    for (; rowIdx >= 0; --rowIdx) {
      if (col[rowIdx].token === self.emptyToken) {
        break;
      }
    }
    return rowIdx;
  }

  self.dropDiscInCol = (col) => {
    const rowIdx = findNextAvailableDiscInCol(col);
    col[rowIdx].token = self.playerToken;
  };

  self.highlightAvailableDiscInCol = (col) => {
    const rowIdx = findNextAvailableDiscInCol(col);
    col[rowIdx].isHighlighted = true;
  };

  self.removeHighlightsFromCol = (col) => {
    col.forEach( (disc) => {
      disc.isHighlighted = false;
    });
  };

}
