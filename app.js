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
        var board = gameBoard.board;
        
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

var tempbtn = document.getElementById('temprender');

tempbtn.addEventListener('click', () => {
    displayController.renderBoard();
});