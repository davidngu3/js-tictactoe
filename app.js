// Author: David Nguyen
// Last modified: 5/2/2021
// Last action: Added gameController.checkWin, only manual activation at this point. 
// Next, work on step 6: 
// Probably will have to plan out the flow using pen and paper
// Clean up UI and allow players to enter names, start/restart button and congratulations display box

// gameController module, controls game flow
var gameController = (function() {
    var activePlayer = 1;

    var getActivePlayer = function() {
        return activePlayer;
    }

    var setActivePlayer = function(playerNum) {
        activePlayer = playerNum;
    }

    var checkWin = function() {
        if (gameBoard.checkBoard()) {
            console.log('The winner is player ' + gameBoard.checkBoard());
        }
    }

    return {
        getActivePlayer,
        setActivePlayer,
        checkWin
    };
})();


// gameboard module 
var gameBoard = (function() {
    var board = [['', '', ''], ['', '', ''], ['', '', '']]; // tic tac toe board
    
    var setMarker = function(row, col, marker) {
        board[row][col] = marker;
    } 

    var getMarker = function(row, col) {
        return board[row][col];
    }

    var checkBoard = function() {
        // horizontal
        for (let i = 0; i < 3; i++) {
            if (board[i][0] && board[i][0] == board[i][1] && board[i][0] == board[i][2]) { // all 3 markers in row the same
                return board[i][0]; // return marker
            }
        }

        // vertical
        for (let i = 0; i < 3; i++) {
            if (board[0][i] && board[0][i] == board[1][i] && board[1][i] == board[2][i]) { // all 3 markers in column the same
                return board[0][i];
            }
        }

        // diagonal 
        if (board[0][0] && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
            return board[0][0];
        }
        if (board[0][2] && board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
            return board[0][2];
        }

        return null;
    }

    return {
        setMarker,
        getMarker,
        checkBoard
    };
})();


// displayController module
var displayController = (function() {
    var renderBoard = function() {
        var container = document.getElementById('board-container');
        container.innerHTML = ""; // clear board
        
        for (let i = 0; i < 3; i++) {
            var row = document.createElement('div'); 
            row.className = "boardRow";
            for (let j = 0; j < 3; j++) {
                var square = document.createElement('div');
                square.className = "square";
                square.innerText = gameBoard.getMarker(i, j);
                square.setAttribute('data-row', i);
                square.setAttribute('data-col', j);
                square.addEventListener('click', () => {
                    if (gameBoard.getMarker(i, j) == '') {
                        if (gameBoard.activePlayer == 1) {
                            playerOne.placeMarker(i, j);
                        }
                        else {
                            playerTwo.placeMarker(i, j);
                        }
                        var newActivePlayerNum = gameController.getActivePlayer() == 1 ? 0 : 1;
                        gameController.setActivePlayer(newActivePlayerNum);
                    }
                });
                row.appendChild(square);
            }
            container.appendChild(row);
        }
    };

    return { 
        renderBoard
    };
})();


// player factory
var player = function(n) {
    var score = 0;
    var playerNum = n;

    var getScore = function() {
        return score;
    }

    var placeMarker = function(xpos, ypos) {
        var newMarker = gameController.getActivePlayer() == 1 ? 'X' : 'O';
        gameBoard.setMarker(xpos, ypos, newMarker);
        displayController.renderBoard();
    }

    return {
        getScore,
        placeMarker
    };
}


// DOM Elements
var tempbtn = document.getElementById('temprender');
var boardContainer = document.getElementById('board-container');

// Set up players
playerOne = player(1);
playerTwo = player(2);

// Button handlers
tempbtn.addEventListener('click', () => {
    displayController.renderBoard();
});