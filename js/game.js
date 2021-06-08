const button = document.getElementsByClassName("buttonInitGame");
const divStartGame = document.getElementById("startGame");
const divGameOver = document.getElementById("gameOver");
const canvas = document.getElementById("canvasGame");
let context = canvas.getContext("2d");
const box = 32;
let snake = [0];
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

snake[0] = {
  x: 8 * box,
  y: 8 * box
}

let game;

function createBackground() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for(let i=0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x , food.y, box, box);
}

function resetGame() {
  snake = [];
  snake[0] = {
    x: 8 * box,
    y: 8 * box
  }
  food.x = Math.floor(Math.random() * 15 + 1) * box;
  food.y = Math.floor(Math.random() * 15 + 1) * box;
  game = setInterval(initGame, 100);
}

function verifyCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      gameOver();
    }
  }
}

function startGame() {
  game = setInterval(initGame, 100);
  divGameOver.style.display = "none";
  divStartGame.style.display = "none";
  canvas.style.display = "flex"
}

function startAgain() {
  divGameOver.style.display = "none";
  resetGame();
  canvas.style.display = "flex"
}

function gameOver() {
  clearInterval(game);
  canvas.style.display = "none";
  divGameOver.style.display = "flex";
}

function updateDirection(event) {
  if(event.keyCode == 37 && direction !== "right") direction = "left";
  if(event.keyCode == 38 && direction !== "down") direction = "up";
  if(event.keyCode == 39 && direction !== "left") direction = "right";
  if(event.keyCode == 40 && direction !== "up") direction = "down";
}

document.addEventListener("keydown", updateDirection);

function initGame() {
  if (snake[0].x > 15 * box && direction === "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction === "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction === "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction === "up") snake[0].y = 16 * box;
  
  verifyCollision();
  createBackground();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "right") snakeX += box;
  if (direction === "left") snakeX -= box;
  if (direction === "up") snakeY -= box;
  if (direction === "down") snakeY += box;

  if (snakeX !== food.x || snakeY !==  food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);
}
