const boardEl = document.querySelector("#board");
const statusEl = document.querySelector("#status");
const scoreEl = document.querySelector("#score");
const modeEl = document.querySelector("#mode");
const sizeEl = document.querySelector("#size");
const winLengthEl = document.querySelector("#winLength");
const difficultyEl = document.querySelector("#difficulty");
const newGameEl = document.querySelector("#newGame");

let size = 3;
let winLength = 3;
let board = [];
let current = "X";
let gameOver = false;
let score = { X: 0, O: 0, draws: 0 };

function initSelectors() {
  for (let value = 3; value <= 9; value += 1) {
    sizeEl.add(new Option(`${value}x${value}`, String(value)));
  }
  sizeEl.value = "3";
  rebuildWinOptions();
}

function rebuildWinOptions() {
  const previous = Number(winLengthEl.value) || 3;
  winLengthEl.innerHTML = "";
  for (let value = 3; value <= Number(sizeEl.value); value += 1) {
    winLengthEl.add(new Option(`${value} in a row`, String(value)));
  }
  winLengthEl.value = String(Math.min(previous, Number(sizeEl.value)));
}

function newGame() {
  size = Number(sizeEl.value);
  winLength = Number(winLengthEl.value);
  board = Array.from({ length: size }, () => Array(size).fill(""));
  current = "X";
  gameOver = false;
  renderBoard();
  setStatus("Player X starts. The first move cannot be in the center.", "warn");
  updateScore();
}

function renderBoard(winningCells = []) {
  const winningSet = new Set(winningCells.map(([row, col]) => `${row},${col}`));
  boardEl.innerHTML = "";
  boardEl.style.setProperty("--cells", size);

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const cell = document.createElement("button");
      const symbol = board[row][col];
      cell.type = "button";
      cell.className = `cell ${symbol.toLowerCase()}${winningSet.has(`${row},${col}`) ? " win-cell" : ""}`;
      cell.textContent = symbol;
      cell.setAttribute("role", "gridcell");
      cell.setAttribute("aria-label", symbol ? `${symbol} at row ${row}, column ${col}` : `Empty row ${row}, column ${col}`);
      cell.disabled = Boolean(symbol) || gameOver;
      cell.addEventListener("click", () => playMove(row, col));
      boardEl.append(cell);
    }
  }
}

function playMove(row, col) {
  if (gameOver || board[row][col]) {
    return;
  }

  if (isForbiddenFirstMove(row, col)) {
    setStatus("Invalid first move: choose a square outside the center.", "warn");
    return;
  }

  board[row][col] = current;
  finishTurn();

  if (!gameOver && modeEl.value === "pvc" && current === "O") {
    window.setTimeout(computerTurn, 240);
  }
}

function finishTurn() {
  const result = findWinner();
  if (result) {
    gameOver = true;
    score[result.symbol] += 1;
    renderBoard(result.cells);
    setStatus(`Player ${result.symbol} wins.`, "win");
    updateScore();
    return;
  }

  if (board.flat().every(Boolean)) {
    gameOver = true;
    score.draws += 1;
    renderBoard();
    setStatus("Draw.", "warn");
    updateScore();
    return;
  }

  current = current === "X" ? "O" : "X";
  renderBoard();
  setStatus(`Player ${current}'s turn.`, "");
}

function computerTurn() {
  const move = chooseComputerMove();
  if (move) {
    board[move.row][move.col] = "O";
    finishTurn();
  }
}

function chooseComputerMove() {
  if (difficultyEl.value !== "easy") {
    const win = findBestImmediateMove("O");
    if (win) return win;

    const block = findBestImmediateMove("X");
    if (block) return block;
  }

  if (difficultyEl.value === "hard") {
    const center = preferredCenterMove();
    if (center) return center;
  }

  const empty = [];
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (!board[row][col] && !isForbiddenFirstMove(row, col)) {
        empty.push({ row, col });
      }
    }
  }
  return empty[Math.floor(Math.random() * empty.length)];
}

function findBestImmediateMove(symbol) {
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (board[row][col] || isForbiddenFirstMove(row, col)) {
        continue;
      }
      board[row][col] = symbol;
      const wins = findWinner();
      board[row][col] = "";
      if (wins) {
        return { row, col };
      }
    }
  }
  return null;
}

function preferredCenterMove() {
  const positions = [];
  const middle = (size - 1) / 2;
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (!board[row][col] && !isForbiddenFirstMove(row, col)) {
        positions.push({ row, col, distance: Math.abs(row - middle) + Math.abs(col - middle) });
      }
    }
  }
  positions.sort((a, b) => a.distance - b.distance);
  return positions[0] || null;
}

function isForbiddenFirstMove(row, col) {
  if (board.flat().some(Boolean)) {
    return false;
  }

  if (size % 2 === 1) {
    const center = Math.floor(size / 2);
    return row === center && col === center;
  }

  const upper = size / 2 - 1;
  const lower = size / 2;
  return (row === upper || row === lower) && (col === upper || col === lower);
}

function findWinner() {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const symbol = board[row][col];
      if (!symbol) continue;

      for (const [dr, dc] of directions) {
        const cells = [];
        for (let step = 0; step < winLength; step += 1) {
          const r = row + dr * step;
          const c = col + dc * step;
          if (r < 0 || r >= size || c < 0 || c >= size || board[r][c] !== symbol) {
            break;
          }
          cells.push([r, c]);
        }
        if (cells.length === winLength) {
          return { symbol, cells };
        }
      }
    }
  }
  return null;
}

function setStatus(message, type) {
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
}

function updateScore() {
  scoreEl.textContent = `X ${score.X} | O ${score.O} | Draws ${score.draws}`;
}

sizeEl.addEventListener("change", () => {
  rebuildWinOptions();
  newGame();
});
winLengthEl.addEventListener("change", newGame);
modeEl.addEventListener("change", () => {
  difficultyEl.disabled = modeEl.value !== "pvc";
  newGame();
});
difficultyEl.addEventListener("change", newGame);
newGameEl.addEventListener("click", newGame);

initSelectors();
difficultyEl.disabled = true;
newGame();
