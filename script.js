
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

let gameRunning = true;
let score = 0;
let interval;
let player = { x: 50, y: 150, width: 30, height: 30, vy: 0, gravity: 1.5, jumpPower: -15, grounded: false };

let obstacle = { x: canvas.width, y: 150, width: 20, height: 30, speed: 6 };

function resetGame() {
  player.y = 150;
  player.vy = 0;
  obstacle.x = canvas.width;
  score = 0;
  gameRunning = true;
  restartBtn.style.display = "none";
  interval = setInterval(updateGame, 1000 / 60);
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update player
  player.vy += player.gravity;
  player.y += player.vy;
  if (player.y >= 150) {
    player.y = 150;
    player.vy = 0;
    player.grounded = true;
  } else {
    player.grounded = false;
  }

  // Draw player
  ctx.fillStyle = "black";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Update obstacle
  obstacle.x -= obstacle.speed;
  if (obstacle.x + obstacle.width < 0) {
    obstacle.x = canvas.width;
    score++;
    scoreElement.textContent = score;
  }

  // Draw obstacle
  ctx.fillStyle = "red";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

  // Collision detection
  if (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  ) {
    endGame();
  }
}

function endGame() {
  clearInterval(interval);
  gameRunning = false;
  restartBtn.style.display = "block";
}

function jump() {
  if (player.grounded) {
    player.vy = player.jumpPower;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

canvas.addEventListener("click", () => {
  if (gameRunning) jump();
});

restartBtn.addEventListener("click", resetGame);

// Adjust speed for mobile
if (/Mobi|Android/i.test(navigator.userAgent)) {
  obstacle.speed = 3;
}

resetGame();
