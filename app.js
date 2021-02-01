// DOM Elements
var tempbtn = document.getElementById('temprender');
var boardContainer = document.getElementById('board-container');

// gameController module, controls game flow
var gameController = (function() {
    var activePlayer = 1;

    return {
        activePlayer
    };
})();


// gameboard module 
var gameBoard = (function() {
    var board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]; // tic tac toe board
    
    var setMarker = function(row, col, marker) {
        board[row][col] = marker;
    } 

    var getMarker = function(row, col) {
        return board[row][col];
    }

    return {
        setMarker,
        getMarker
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
                    if (gameBoard.getMarker(i, j) == ' ') {
                        if (gameBoard.activePlayer == 1) {
                            playerOne.placeMarker(i, j);
                        }
                        else {
                            playerTwo.placeMarker(i, j);
                        }
                        gameController.activePlayer = gameController.activePlayer == 1 ? 0 : 1;
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

    var placeMarker = function(xpos, ypos) {
        var marker = gameController.activePlayer == 1 ? 'X' : 'O';
        gameBoard.setMarker(xpos, ypos, marker);
        displayController.renderBoard();
    }

    return {
        score,
        placeMarker
    };
}

playerOne = player(1);
playerTwo = player(2);

tempbtn.addEventListener('click', () => {
    displayController.renderBoard();
});