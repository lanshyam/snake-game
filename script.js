const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
const gridSize = canvas.width / boxSize;

let snake = [
  { x: 10, y: 10 },
];

let food = { x: 5, y: 5 };

let dx = 1;
let dy = 0;

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
    resetGame();
  }
}

function collision(obj, array) {
  return array.some((segment) => segment.x === obj.x && segment.y === obj.y);
}

function resetGame() {
  alert("Game Over!");
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
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

setInterval(gameLoop, 100);
