const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]')
const restartButton = document.querySelector('[data-restartButton]')

let isCircleTurn;


const winningCombination = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const checkDraw =() =>{
  return [... cellElements].every(cell => {
    return cell.classList.contains('x') ||  cell.classList.contains('circle');
  })
};

const startGame = () =>{
  for(const cell of cellElements){
    cell.classList.remove('circle');
    cell.classList.remove('x');
    cell.removeEventListener('click' ,handleClick)
    cell.addEventListener('click', handleClick, {once:true});
  }

   isCircleTurn = false;

   setBoardHover();
   winningMessage.classList.remove('show-winning-message');
};

const endGame = (isDraw) =>{
  if(isDraw){
    winningMessageTextElement.innerText = 'Empate!'
  } else {
    winningMessageTextElement.innerText = isCircleTurn ? 'Circulo Venceu!' 
    :
    'X Venceu! '
}

winningMessage.classList.add('show-winning-message');

};

const checkWin = (cuurentPlayer) =>{
  return winningCombination.some(combination =>{
    return combination.every(index =>{
      return cellElements[index].classList.contains(cuurentPlayer);
    });
  });
}
 
const placeMark = (cell, addToclass) =>{
  cell.classList.add(addToclass);
};


const setBoardHover = () =>{
  board.classList.remove('circle')
  board.classList.remove('x')

  if(isCircleTurn){
    board.classList.add('circle');
  }else{
    board.classList.add('x');
}
}

const swapTurns = () =>{
  isCircleTurn = !isCircleTurn

 setBoardHover();
};

const handleClick = (e) =>{
  const cell= e.target;
    const addToclass = isCircleTurn ? 'circle' : 'x' ;
   placeMark(cell, addToclass);

   const isWin = checkWin(addToclass);

   const isDraw = checkDraw();

   if(isWin){
    endGame(false);
   } else if(isDraw){
    endGame(true)
   }else{
    swapTurns();
   }

  

  
};

startGame();

restartButton.addEventListener('click', startGame)