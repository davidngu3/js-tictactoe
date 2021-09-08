// Author: David Nguyen
// Last modified: 8/9/21
// Last action: Completed the game
// Need to: Make it look nicer TM

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

    var playTurn = function() {
        if (gameBoard.checkBoardForWinner()) {
            displayController.renderWinner();
            gameBoard.disable();
        }
        else if (gameBoard.checkBoardForStalemate()) {
            displayController.renderDraw();
            gameBoard.disable();
        }
        else {
            gameController.switchActivePlayer();
            displayController.renderTurn();
        }
    }

    var startGame = function() {
        if (player1Field.value && player2Field.value) {
            playerOne = player(player1Field.value, 'X')
            playerTwo = player(player2Field.value, 'O');
            gameController.setActivePlayer(playerOne);
            gameBoard.clear();
            gameBoard.enable();
            displayController.createBoard();
            displayController.renderBoard();
            playTurn();
        }
        else {
            alert("Please enter player names");
        }
    }

    return {
        getActivePlayer,
        setActivePlayer,
        switchActivePlayer,
        playTurn,
        startGame
    };
})();


// gameboard module 
var gameBoard = (function() {
    var disabled = false;

    var board = [['', '', ''], ['', '', ''], ['', '', '']]; // tic tac toe board
    
    var clear = function() {
        board = [['', '', ''], ['', '', ''], ['', '', '']];
    }

    var enable = function() {
        disabled = false;
    }

    var disable = function() {
        disabled = true;
    }

    var setMarker = function(row, col, marker) {
        board[row][col] = marker;
    } 

    var getMarker = function(row, col) {
        return board[row][col];
    }

    var boardClick = function(i, j) {
        if (!board[i][j] && !disabled) {
            gameController.getActivePlayer().placeMarker(i, j);
            gameController.playTurn();
        }
    }

    var checkBoardForWinner = function() {
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

    var checkBoardForStalemate = function() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    return false;
                }
            }
        }
        return true;
    }

    return {
        setMarker,
        getMarker,
        checkBoardForWinner,
        checkBoardForStalemate,
        boardClick,
        clear,
        disable,
        enable
    };
})();


// displayController module
var displayController = (function() {
    var createBoard = function() {
        var container = document.getElementById('board-container');
        container.innerHTML = ""; // clear board

        for (let i = 0; i < 3; i++) {
            var row = document.createElement('div'); 
            row.className = "boardRow";
            for (let j = 0; j < 3; j++) {
                var square = document.createElement('div');
                square.className = "square";
                square.addEventListener('click', () => gameBoard.boardClick(i, j));
                row.appendChild(square);
            }
            container.appendChild(row);
        }
    }

    var renderBoard = function() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                var selectedSquare = document.querySelector(`#board-container div:nth-child(${i+1}) div:nth-child(${j+1})`);
                selectedSquare.innerText = gameBoard.getMarker(i, j);
            }
        }
    };

    var renderWinner = function() {
        var outcomeElement = document.getElementById('outcomeLabel');
        outcomeElement.innerText = `Player ${gameController.getActivePlayer().getName()} wins!`
    }

    var renderDraw = function() {
        var outcomeElement = document.getElementById('outcomeLabel');
        outcomeElement.innerText = `Draw! Nobody Wins`
    }

    var renderTurn = function() {
        var outcomeElement = document.getElementById('outcomeLabel');
        outcomeElement.innerText = `Player ${gameController.getActivePlayer().getName()}'s turn`;
    }

    return { 
        renderBoard,
        renderWinner,
        renderDraw,
        renderTurn,
        createBoard
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

var player1Field = document.getElementById('player1NameInput');
var player2Field = document.getElementById('player2NameInput');


// Button handlers
startBtn.addEventListener('click', () => {
    gameController.startGame();
});