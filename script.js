const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;
let gameActive = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
  [0, 4, 8], [2, 4, 6]              // diagonals
];

function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.classList.contains('x') || cell.classList.contains('o')) return;

  const currentClass = isXTurn ? 'x' : 'o';
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();

  if (checkWin(currentClass)) {
    statusText.textContent = `${currentClass.toUpperCase()} wins! 🎉`;
    gameActive = false;
  } else if (isDraw()) {
    statusText.textContent = `It's a draw! 😐`;
    gameActive = false;
  } else {
    isXTurn = !isXTurn;
    statusText.textContent = `Turn: ${isXTurn ? 'X' : 'O'}`;
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function restartGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
  });
  isXTurn = true;
  gameActive = true;
  statusText.textContent = "Turn: X";
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

// Set initial status
statusText.textContent = "Turn: X";
