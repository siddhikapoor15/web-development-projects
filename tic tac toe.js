const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let cells = Array(9).fill(null);
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];

function drawBoard() {
  board.innerHTML = "";
  cells.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.textContent = value;
    cell.addEventListener("click", onCellClick);
    board.appendChild(cell);
  });
}

function onCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  drawBoard();
  checkWinner();
}

function checkWinner() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }
  }

  if (!cells.includes(null)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  drawBoard();
}

drawBoard();
