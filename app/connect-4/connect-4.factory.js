'use strict';

angular
    .module('connect4')
    .factory('connect4Factory', connect4Factory);

function connect4Factory() {
  let self = this;

  /*
   * Instantiate the Connect 4 Board
   */
  self.emptyToken = '.';
  self.playerToken = '1';
  self.opponentToken = '2';
  self.width = null;
  self.height = null;
  self.board = null;

  function createBoard(width, height) {
    let board = [];
    for (let i=0; i<width; ++i) {
      board.push([]);
      for (let j=0; j<height; ++j) {
        board[i].push({
          token: self.emptyToken,
          isHighlighted: false
        });
      }
    }
    return board;
  }

  /*
   * Create factory object
   */
  return {
    init : (width, height) => {
      self.width = width;
      self.height = height;
      self.board = createBoard(width, height);
    },

    getBoard : () => {
      return self.board;
    },

    getEmptyToken : () => {
      return self.emptyToken;
    },

    getPlayerToken : () => {
      return self.playerToken;
    }
  }
}