let currentPlayer='X';
let gameActive = true;
let gameState=["","","","","","","","",""]
const currentPlayerTurn = ()=> `Now ${currentPlayer}'s turn`;
let statusDisplay = document.querySelector(".game--status");
statusDisplay.innerHTML = currentPlayerTurn();
const winningMsg = ()=> `${currentPlayer} has won`;
const drawMsg = ()=> 'Game end in a draw';
const winningConditions=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]

function resultValidation(){
    let thisRoundWon = false;
    for(let i=0;i<winningConditions.length;i++){
        let eachWinCond = winningConditions[i];
        let a = gameState[eachWinCond[0]] //firstGrid
        let b = gameState[eachWinCond[1]] //secondGrid
        let c = gameState[eachWinCond[2]] //thirdGrid

        if(a==="" || b===""|| c==="")
            continue;
        if(a==b && b==c){
            thisRoundWon=true;
            break;
        }
    }
    if(thisRoundWon){
        statusDisplay.innerHTML = winningMsg();
        gameActive=false;
        return;
    }
        //check for draw before changing player
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML =drawMsg();
        gameActive=false;
        return;
    }
    currentPlayer = currentPlayer==='X'?'O':'X'; 
    statusDisplay.innerHTML = currentPlayerTurn(); 
}

function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));
    // check if game is active or not & not already clicked
    if(gameState[clickedCellIndex]!=="" || !gameActive)
        return;
    
    clickedCell.innerHTML = currentPlayer;
    gameState[clickedCellIndex]=currentPlayer;
    resultValidation();
}
document.querySelectorAll(".cell").forEach((cell)=> cell.addEventListener('click',handleCellClick));

function restartGame(){
    gameActive=true;
    gameState=["","","","","","","","",""]
    currentPlayer='X';
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell)=> cell.innerHTML="");
}
document.querySelector(".game--restart").addEventListener('click',restartGame);