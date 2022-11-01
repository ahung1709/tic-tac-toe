/*----- constants -----*/
// Step 1.1
const colors = {
    'null':'lightgray', //for empty
    '1':'blue', //for player 'X'
    '-1':'green' //for player 'O'
}

// Step 1.2
const winCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6], 
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


/*----- app's state (variables) -----*/

// Step 2.1
let arrBoard = []

// Step 2.2
let turn; // 1 represents player X, -1 represents player 0

// Step 2.3
let winner; 
// null represents no winner or tie yet
// 1 represents win by player 'X', -1 represents win by player 'O'
// 'T' represents a tie

/*----- cached element references -----*/
// Step 3
let boardEl = document.querySelector("div#board")
let turnEl = document.getElementById("playerTurn")
let replayEl = document.getElementById("replay")

// Step 3.1
let tileEls = document.querySelectorAll("div.tile")

/*----- event listeners -----*/
// Step 5
boardEl.addEventListener('click', function(evt) {
    // Step 5.1
    const clickedEl = evt.target
    let clickedIdx = 0

    tileEls.forEach(function(tileEl, idx) {
        if (clickedEl === tileEl) clickedIdx = idx
    })

    // Step 5.2
    if (arrBoard[clickedIdx] !== null) return
    
    // Step 5.3
    if (winner !== null) return
    
    // Step 5.4
    arrBoard[clickedIdx] = turn;
    
    // Step 5.5
    turn *= -1

    // Step 5.6.1
    winCombination.forEach(function(arrWin) {
        // Step 5.6.2 and 5.6.3
        let total = Math.abs(arrBoard[arrWin[0]] + arrBoard[arrWin[1]] + arrBoard[arrWin[2]])
        
        // Step 5.6.4
        if (total === 3) winner = arrBoard[arrWin[0]]
    })  

    // Step 5.7
    if(!arrBoard.includes(null) && winner === null) winner = "T"
    
    // Step 5.8
    render()   
})

// Step 6
replayEl.addEventListener('click', function(evt) {
    init()
    render()
})

/*----- functions -----*/

// Step 4.1
function init() {
    // Step 4.1.1
    arrBoard = [ 
        null, null, null, 
        null, null, null, 
        null, null, null
    ]
    
    // Step 4.1.2
    turn = 1; // Start with Player 'X'

    // Step 4.1.3
    winner = null; // null represent no winner or tie yet
}

// Step 4.2
function render() {
    // 4.2.1 Render the board
    tileEls.forEach(function(tileEl, idx) {
        tileEl.style.backgroundColor = colors[arrBoard[idx]]
    })

    // Step 4.2.2
    if (winner === null) {
        turnEl.textContent = 
        `Game still in progress.  It is ${displayPlayer(turn)} (${colors[turn]})'s turn.`.toUpperCase()
    } else if (winner === 'T') {
        turnEl.textContent = `IT IS TIE.`
    } else {
        turnEl.textContent = `Congratulations! ${displayPlayer(winner)} (${colors[winner]}) has won!`.toUpperCase()
    }

}

// Step 4.3
init()
render()

// BONUS - helper function to display Player 'X' or 'O'
function displayPlayer(turnOrWin) {
    if (colors[turnOrWin] === colors[1]) return "Player 'X'"
    if (colors[turnOrWin] === colors[-1]) return "Player 'O'"
    return ""
}

