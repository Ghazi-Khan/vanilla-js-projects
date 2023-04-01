// variables
const SPEED = 2;
const GRID_SIZE = { start: 0, end: 19 };
let lastTime = 0;
let snakeDirection = { x: 0, y: 0 };
let snake = [{ x: 11, y: 15 }];
let snakeFood = { x: 7, y: 17 }

// utility functions
function isCollideWithBodyPart(head, bodyPart) {
  return  head.x === bodyPart.x && head.y === bodyPart.y;
}

function isCollideWithWall(head) {
  return (
    head.x <= GRID_SIZE.start ||
    head.x >= GRID_SIZE.end ||
    head.y <= GRID_SIZE.start ||
    head.y >= GRID_SIZE.end
  );
}

function isCollide() {
  //  bump into itself
  const snakeHead = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (isCollideWithBodyPart(snakeHead, snake[i])) {
      return true;
    }
  }

  if (isCollideWithWall(snakeHead)) {
    return true;
  }

  return false;

}

function isSnakeEatenFood() {
  const snakeHead = snake[0];

  return snakeFood.x === snakeHead.x && snakeFood.y === snakeHead.y;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// game functions

function main(currentTime) {
  window.requestAnimationFrame(main);

  if ((currentTime - lastTime) / 1000 < 1 / SPEED) {
    return;
  }
  lastTime = currentTime;
  gameEngine();
}

function gameEngine() {
  // Part 1 : Update the snake array and food
  if (isCollide()) {
    snakeDirection.x = 0;
    snakeDirection.y = 0;
    alert('Game Over! Press any key to play again');
    snake = [{ x: 11, y: 15 }];
  }

  // Snake eaten the food
  if (isSnakeEatenFood()) {
    const snakeHead = snake[0];
    const snakeNewBodyPart = {
      x: snakeHead.x + snakeDirection.x,
      y: snakeHead.y + snakeDirection.y
    };
    snake.unshift(snakeNewBodyPart);

    // generate new foodS
    snakeFood.x = randomInteger(2, 16);
    snakeFood.y = randomInteger(2, 16);
  }

  // moving snake
  for(let i = snake.length - 2; i >= 0; i--) {
    snake[i+1] = { ...snake[i]};
  }
  snake[0].x += snakeDirection.x;
  snake[0].y += snakeDirection.y;



  // Part 2 : Dispaly the snake and food
  const board = document.getElementById('board');
  board.innerHTML = '';

  // Dispaly the snake
  snake.forEach((snakeBodyPart, index) => {
    const snakeNewBodyPart = document.createElement('div');
    snakeNewBodyPart.style.gridRowStart = snakeBodyPart.y;
    snakeNewBodyPart.style.gridColumnStart = snakeBodyPart.x;

    if (index === 0) {
      snakeNewBodyPart.classList.add('snake-head');
    } else {
      snakeNewBodyPart.classList.add('snake-body');
    }
    board.append(snakeNewBodyPart);
  });

  // Dispaly the food
  const food = document.createElement('div');
  food.style.gridRowStart = snakeFood.y
  food.style.gridColumnStart= snakeFood.x;
  food.classList.add('food');
  board.append(food);
}

// main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e) => {
  snakeDirection.x = 0;
  snakeDirection.y = 1;
  switch (e.key) {
    case "ArrowUp":
      snakeDirection.x = 0;
      snakeDirection.y = -1;
      break;
    case "ArrowDown":
      snakeDirection.x = 0;
      snakeDirection.y = 1;
      break;
    case "ArrowLeft":
      snakeDirection.x = -1;
      snakeDirection.y = 0;
      break;
    case "ArrowRight":
      snakeDirection.x = 1;
      snakeDirection.y = 0;
      break;

    default:
      break;
  }

})
