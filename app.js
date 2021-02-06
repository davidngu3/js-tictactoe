// Author: David Nguyen
// Last modified: 7/2/2021
// Last action: Added display to show whose turn it is
// Need to: Disable board on win

// gameController module, controls game flow
var gameController = (function() {
    var activePlayer;

    var getActivePlayer = function() {
        return activePlayer;
    }

    var setActivePlayer = function(player) {
        activePlayer = player;
    }

    var switchActivePlayer = function() {
        if (activePlayer == playerOne) {
            activePlayer = playerTwo;
        }
        else {
            activePlayer = playerOne;
        }
    }

    var displayWinner = function() {
        if (activePlayer == playerOne) {
            outcomeElement.innerText = `Player ${playerTwo.getName()} wins!`;
        }
        else {
            outcomeElement.innerText = `Player ${playerOne.getName()} wins!`;
        }
    }

    var displayTurn = function() {
        outcomeElement.innerText = `Player ${activePlayer.getName()}'s turn`;
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
        switchActivePlayer,
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

    var boardClick = function(i, j) {
        if (!board[i][j]) {
            gameController.getActivePlayer().placeMarker(i, j);
            gameController.switchActivePlayer();
            gameController.checkResult();
        }
    }

    var checkBoard = function() {
        // horizontal
        if (board.some(row => row[0] && row.every(marker => marker === row[0]))) {
            return true;
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
        checkBoard,
        boardClick
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
                square.addEventListener('click', () => gameBoard.boardClick(i, j));
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
var player = function(name, marker) {
    var playerName = name;
    var playerMarker = marker;

    var getName = function() {
        return playerName;
    }

    var placeMarker = function(xpos, ypos) {
        gameBoard.setMarker(xpos, ypos, playerMarker);
        displayController.renderBoard();
    }

    return {
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
        playerOne = player(player1Field.value, 'X')
        playerTwo = player(player2Field.value, 'O');
        gameController.setActivePlayer(playerOne);
        displayController.renderBoard();
        gameController.checkResult();
    }
    else {
        alert("Please enter player names");
    }
});