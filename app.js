// DOM Elements
var tempbtn = document.getElementById('temprender');
var boardContainer = document.getElementById('board-container');


// gameboard module 
var gameBoard = (function() {
    var board = [['X', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]; // tic tac toe board
    
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
                square.addEventListener('click', player.placeMarker);
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

    var placeMarker = function(e) {
        var xpos = e.target.getAttribute('data-row');
        var ypos = e.target.getAttribute('data-col');
        var marker = playerNum == n ? 'X' : 'O';
        gameBoard.setMarker(xpos, ypos, marker);
    }

    return {
        score,
        placeMarker
    };
}

tempbtn.addEventListener('click', () => {
    displayController.renderBoard();
});