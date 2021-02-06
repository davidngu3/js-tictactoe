// Author: David Nguyen
// Last modified: 7/2/2021
// Last action: Added display to show whose turn it is
// Need to: Disable board on win

// gameController module, controls game flow
var gameController = (function() {
    var activePlayer = 1;

    var getActivePlayer = function() {
        return activePlayer;
    }

    var setActivePlayer = function(playerNum) {
        activePlayer = playerNum;
    }

    var displayWinner = function() {
        if (activePlayer == 2) {
            outcomeElement.innerText = `Player ${playerOne.getName()} wins!`;
        }
        else {
            outcomeElement.innerText = `Player ${playerTwo.getName()} wins!`;
        }
    }

    var displayTurn = function() {
        if (activePlayer == 1) {
            outcomeElement.innerText = `Player ${playerOne.getName()}'s turn`;
        }
        else {
            outcomeElement.innerText = `Player ${playerTwo.getName()}'s turn`;
        }
    }

    var checkResult = function() {
        let winner = gameBoard.checkBoard();

        if (winner) {
            displayWinner();
        }
        else {
            displayTurn();
        }
    }

    return {
        getActivePlayer,
        setActivePlayer,
        checkResult,
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
                return true;
            }
        }

        // vertical
        for (let i = 0; i < 3; i++) {
            if (board[0][i] && board[0][i] == board[1][i] && board[1][i] == board[2][i]) { // all 3 markers in column the same
                return true;
            }
        }

        // diagonal 
        if (board[0][0] && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
            return true;
        }
        if (board[0][2] && board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
            return true;
        }

        return false;
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
                        var newActivePlayerNum = gameController.getActivePlayer() == 1 ? 2 : 1;
                        gameController.setActivePlayer(newActivePlayerNum);
                        gameController.checkResult();
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
    var playerName = n;

    var getScore = function() {
        return score;
    }

    var getName = function() {
        return playerName;
    }

    var placeMarker = function(xpos, ypos) {
        var newMarker = gameController.getActivePlayer() == 1 ? 'X' : 'O';
        gameBoard.setMarker(xpos, ypos, newMarker);
        displayController.renderBoard();
    }

    return {
        getScore,
        getName,
        placeMarker
    };
}


// DOM Elements
var startBtn = document.getElementById('startButton');
var boardContainer = document.getElementById('board-container');
var outcomeElement = document.getElementById('outcomeLabel');

var player1Field = document.getElementById('player1NameInput');
var player2Field = document.getElementById('player2NameInput');


// Button handlers
startBtn.addEventListener('click', () => {
    if (player1Field.value && player2Field.value) {
        playerOne = player(player1Field.value)
        playerTwo = player(player2Field.value);
        displayController.renderBoard();
        gameController.checkResult();
    }
    else {
        alert("Please enter player names");
    }
});