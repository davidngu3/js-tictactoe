// DOM Elements
var tempbtn = document.getElementById('temprender');
var boardContainer = document.getElementById('board-container');


// gameboard module 
var gameBoard = (function() {
    var board = [['X', 'O', 'O'], ['O', 'X', 'X'], ['X', 'O', 'O']]; // tic tac toe board
    
    return {
        board
    };
})();


// displayController module
var displayController = (function() {
    var renderBoard = function() {
        var container = document.getElementById('board-container');
        container.innerHTML = ""; // clear board
        var board = gameBoard.board;
        
        for (let i = 0; i < 3; i++) {
            var row = document.createElement('div'); 
            row.className = "boardRow";
            for (let j = 0; j < 3; j++) {
                var square = document.createElement('div');
                square.innerText = board[i][j];
                square.setAttribute('data-row', i);
                square.setAttribute('data-col', j);
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
var player = function() {
    var score = 0;

    return {
        score
    };
}

tempbtn.addEventListener('click', () => {
    displayController.renderBoard();
});