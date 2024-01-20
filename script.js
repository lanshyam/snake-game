const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const playerNameInput = document.getElementById("playerName");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const topPlayersDisplay = document.getElementById("topPlayers");

let playerName = "";
let score = 0;
let highestScore = 0;
let topPlayers = [];

let snake = [];
let food = { x: 5, y: 5 };
let dx = 1;
let dy = 0;

function startGame() {
  playerName = playerNameInput.value || "Player";
  resetGame();
  setInterval(gameLoop, 100);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#4CAF50";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
  }

  ctx.fillStyle = "#FF0000";
  ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
    updateHighestScore();
  } else {
    snake.pop();
  }

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= gridSize ||
    head.y >= gridSize ||
    collision(head, snake.slice(1))
  ) {
    endGame();
  }
}

function collision(obj, array) {
  return array.some((segment) => segment.x === obj.x && segment.y === obj.y);
}

function updateHighestScore() {
  if (score > highestScore) {
    highestScore = score;
    highScoreDisplay.textContent = `All-Time Highest Score: ${highestScore} by ${playerName}`;
  }
}

function resetGame() {
  playerNameInput.disabled = true;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
}

function endGame() {
  playerNameInput.disabled = false;
  alert(`Game Over, ${playerName}! Your Score: ${score}`);

  // Update top players
  if (score > 0) {
    topPlayers.push({ name: playerName, score });
    topPlayers.sort((a, b) => b.score - a.score);
    topPlayers = topPlayers.slice(0, 5); // Keep only the top 5 players
    displayTopPlayers();
  }

  resetGame();
}

function displayTopPlayers() {
  topPlayersDisplay.innerHTML = "<strong>Top Players:</strong><br>";
  for (let i = 0; i < topPlayers.length; i++) {
    topPlayersDisplay.innerHTML += `${i + 1}. ${topPlayers[i].name}: ${topPlayers[i].score}<br>`;
  }
}

function gameLoop() {
  update();
  draw();
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      dx = 0;
      dy = -1;
      break;
    case "ArrowDown":
      dx = 0;
      dy = 1;
      break;
    case "ArrowLeft":
      dx = -1;
      dy = 0;
      break;
    case "ArrowRight":
      dx = 1;
      dy = 0;
      break;
  }
});
