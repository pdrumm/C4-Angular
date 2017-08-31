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
  self.playerTokens = [];
  self.playerTurn = 0;
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

  function findNextAvailableDiscInCol(colIdx) {
    let rowIdx = self.height - 1;
    for (; rowIdx >= 0; --rowIdx) {
      if (self.board[colIdx][rowIdx].token === self.emptyToken) {
        break;
      }
    }
    return rowIdx;
  }

  function removeHighlightsFromCol (colIdx) {
    self.board[colIdx].forEach( (disc) => {
      disc.isHighlighted = false;
    });
  }

  /*
   * Create factory object
   */
  return {
    init : (width, height, playerTokens) => {
      self.width = width;
      self.height = height;
      self.board = createBoard(width, height);
      self.playerTokens = playerTokens.slice();
    },

    getBoard : () => {
      return self.board;
    },

    getEmptyToken : () => {
      return self.emptyToken;
    },

    getPlayerTurn : () => {
      return self.playerTurn;
    },

    getPlayerTokens : () => {
      return self.playerTokens;
    },

    getCurrentPlayerToken : () => {
      return self.playerTokens[self.playerTurn];
    },

    dropDiscInCol : (colIdx) => {
      const rowIdx = findNextAvailableDiscInCol(colIdx);
      self.board[colIdx][rowIdx].token = self.playerTokens[self.playerTurn];
      self.playerTurn = ++self.playerTurn % self.playerTokens.length;
      removeHighlightsFromCol(colIdx);
    },

    highlightAvailableDiscInCol : (colIdx) => {
      const rowIdx = findNextAvailableDiscInCol(colIdx);
      self.board[colIdx][rowIdx].isHighlighted = true;
    },

    removeHighlightsFromCol : (colIdx) => {
      removeHighlightsFromCol(colIdx);
    }

  }
}