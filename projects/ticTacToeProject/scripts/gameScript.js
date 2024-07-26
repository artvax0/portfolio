import { getWinnerLog, winnerLog } from "./storage.js";

const subtitle = document.querySelector('.subtitle');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

const winPatterns = [
    [0, 1, 2], // every element in this array is an index in board
    [3, 4, 5],
    [6, 7, 8], // ^ Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // ^ Columns
    [2, 4, 6],
    [0, 4, 8] // ^ Diagonals
];

subtitle.innerHTML = `It is ${currentPlayer}'s turn`;

document.querySelectorAll('.cell').forEach((cell, index, fullBoard) => cell.addEventListener('click', () => {
        makeMove(cell, index, fullBoard);
    })
);

function makeMove(cell, cellIndex, fullBoard) {
    if (board[cellIndex] == '' && checkWinner() == false) {
        board[cellIndex] = currentPlayer;
        cell.innerHTML = currentPlayer;
        if (checkWinner() == true) {
            subtitle.innerHTML = `The winner is ${currentPlayer}`;
            const winningPattern = winPatterns.find(pattern => pattern.every(index => board[index] == currentPlayer)); //find the pattern and return said pattern (not boolean)
            winningPattern.forEach(cellIndex => fullBoard[cellIndex].style.backgroundColor = 'rgb(107 180 255)'); // compare the pattern's values as the index of original cellboard's array to mark the winning cells.
            const log = getWinnerLog();
            const winner = { timeOfWin: new Date(), winner: currentPlayer};
            log.push(winner);
            winnerLog(log);
            return;
        }
        if (board.every((element) => board.element = element)) { //Check Tie Condition
            subtitle.innerHTML = `No one wins`;
            return;
        }
        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X'; // Toggle turn
        subtitle.innerHTML = `It is ${currentPlayer}'s turn`
    }
}

function checkWinner() {
    return winPatterns.some((winPattern) => { // checks if one of the pattern returns true
        return winPattern.every((boardIndex) => board[boardIndex] == currentPlayer); // when all of the pattern's match the board's index properly, return true
    })
}

document.getElementById('restart').addEventListener('click', () => {
    board.forEach((_,index) => board[index] = ''); 
    subtitle.innerHTML = `It is ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach((cell)  => {
        cell.innerHTML = '';
        cell.style.backgroundColor = '';
    })
})