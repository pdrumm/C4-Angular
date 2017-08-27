'use strict';

angular
    .module('connect4')
    .component('connect4', {
      templateUrl: 'connect-4/connect-4.template.html',
      controller: function Connect4Controller() {
        let self = this;

        /*
         * Instantiate model
         */
        self.emptyToken = '.';
        self.player = '1';
        self.opponent = '2';
        self.boardWidth = 7;
        self.boardHeight = 6;

        function Board(width, height) {
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
        self.board = Board(self.boardWidth, self.boardHeight);

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
          col[rowIdx].token = self.player;
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
    });
