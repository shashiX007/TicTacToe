const board = document.getElementById('board')
const squares = document.getElementsByClassName('square')
const players = ['❌', '⭕']
let currentPlayer = players[0]
const endMessage = document.createElement('h2')
endMessage.textContent = "❌'s turn!"
endMessage.style.marginTop = '30px'
endMessage.style.color = "white"
endMessage.style.textAlign = 'center'
board.after(endMessage)
const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
function setLatestValues() {
    document.getElementById('❌win').value = 'X Wins '+window.localStorage.getItem('❌win');
    document.getElementById('draw').value = 'Draws '+window.localStorage.getItem('draw');
    document.getElementById('⭕win').value = 'O Wins '+window.localStorage.getItem('⭕win');
}

function resetStorage(){
    if(confirm("Are you sure you want to reset the stats?")){
    window.localStorage.setItem(players[0] + 'win', 0);
    window.localStorage.setItem(players[1] + 'win', 0);
    window.localStorage.setItem('draw', 0);
    setLatestValues();
    alert('Reset Done');
}
}
if (window.localStorage.getItem(players[0] + 'win')<1) {
    window.localStorage.setItem(players[0] + 'win', 0);
}
if (window.localStorage.getItem(players[1] + 'win')<1) {
    window.localStorage.setItem(players[1] + 'win', 0);
}
if (window.localStorage.getItem('draw')<1) {
    window.localStorage.setItem('draw', 0);
}

function checkWin(currentPlayer) {
    for (let i = 0; i < winning_combinations.length; i++) {
        const [a, b, c] = winning_combinations[i]
        if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
            return true
        }
    }
    return false
}
function checkTie() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            return false;
        }
    }
    return true
}
function restartButton() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = ""
    }
    endMessage.textContent = "❌'s turn!"
    currentPlayer = players[0]
}
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        setLatestValues();
        if (checkWin(currentPlayer) || checkTie()) {
            return
        }
        if (squares[i].textContent !== '') {
            return
        }
        squares[i].textContent = currentPlayer
        if (checkWin(currentPlayer)) {
            endMessage.textContent = `Game over! ${currentPlayer} wins!`
            localStorage.setItem(currentPlayer + 'win', Number(localStorage.getItem(currentPlayer + 'win')) + 1);
            setLatestValues();
            return
        }
        if (checkTie()) {
            endMessage.textContent = "Game is tied!"
            localStorage.setItem('draw', Number(localStorage.getItem('draw')) + 1);
            setLatestValues();
            return
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0]
        if (currentPlayer == players[0]) {
            endMessage.textContent = "❌'s turn!"
        } else {
            endMessage.textContent = "⭕'s turn!"
        }
    })
}

setLatestValues();