// Author: David Nguyen
// Last modified: 6/2/2021
// Last action: Added congratulations display, reorganised code sections
// Game skeleton is pretty much complete
// Need to: Add gamecontroller player stuff, add text divs showing which player it is, fix playernames on win
// Clean up UI

// gameController module, controls game flow
var gameController = (function() {
    var activePlayer = 1;

    var getActivePlayer = function() {
        return activePlayer;
    }

    var setActivePlayer = function(playerNum) {
        activePlayer = playerNum;
    }

    var displayWinner = function(winner) {
        outcomeElement.innerText = `Player ${winner} is the winner!`;
    }

    var checkWin = function() {
        if (gameBoard.checkBoard()) {
            let winner = gameBoard.checkBoard();
            displayWinner(winner);
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
var startBtn = document.getElementById('startButton');
var boardContainer = document.getElementById('board-container');
var outcomeElement = document.getElementById('outcomeLabel');

var player1Field = document.getElementById('player1NameInput');
var player2Field = document.getElementById('player2NameInput');

// Set up players
playerOne = player(1);
playerTwo = player(2);

// Button handlers
startBtn.addEventListener('click', () => {
    if (player1Field.value && player2Field.value) {
        displayController.renderBoard();
    }
    else {
        alert("Please enter player names");
    }
});