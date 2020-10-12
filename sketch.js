var snake;
var food;
var stepSpeed = 10;
var stepTime;
var prevPos;
var newGame = true;
var menuTime;
var tx;
var txDir = 1;
var menuSnake;
var s = 10;
var maxWall = 380;
var minWall = 10;
var gameOver = false;
var score = 0;
var scoreTime;
var sPos;
var addScore = false;
var bonusTime;
var bonus;
var bonusActive = false;
var speed;
var speedTime;
var speedActive;

var rand;
var randTime;
var randActive;
var randText;
var randScore = 0;

var maxScore = 0;
var highScore = false;

function setup() {
  createCanvas(400, 400);
  food = {x:round(random(2, 18)) * s, y:round(random(2, 18)) * s, s:s};
  snake = {x:10, y:10, s:s, tail:[], dirX:1, dirY:0};
  initMenu();
  stepTime = millis();
  prevPos = {x:200, y:200};
  menuTime = millis();
  scoreTime = millis();
  sPos = createVector(snake.x, snake.y);
  tx = 21;
}

function initMenu(){
  highScore = false;
  textSize(20);
  stepSpeed = 10;
  score = 0;
  snake = {x:10, y:10, s:s, tail:[], dirX:1, dirY:0};
  for(var i = 0; i < 120; i++){
    snake.tail.push({x:snake.x, y:snake.y});
  }
}

function mouseClicked() {
  if(newGame){
    newGame = false;
    snake.tail = [];
    stepSpeed = 200;
    snake.x = 200;
    snake.y = 200;
    snake.dirX = 0;
    snake.dirY = 0;
  }
  if(gameOver){
    newGame = true;
    gameOver = false;
    initMenu();
  }
}

function draw() {
  background(0);
  if(!gameOver){
    if(newGame){
      gameMenu();
    }
    else{
      showFood();
      showSnake();
      updateSnake();
      checkWall();
      checkTail();
      showScore();
      getSpeed();
      getBonus();
      getRand();
    }
  }
  else{
    strokeWeight(1);
    fill(255);
    textSize(50);
    textAlign(CENTER);
    text("Game Over!", width / 2, height / 2);
    if(highScore){
      textSize(20);
      text("New High Score!!!", width / 2, height / 2 - 100);
      text(maxScore + " points!", width / 2, height / 2 - 60);
    }
  }
  showBorder();
}

function gameMenu(){
  strokeWeight(1);
  fill(255);
  if(millis() > menuTime + 10){
    menuTime = millis();
    tx += txDir;
  }
  if(tx >= 50 || tx <= 20){
    txDir *= -1;
  }
  textSize(tx);
  textAlign(CENTER);
  text("start game!", width / 2, height / 2 - tx * 0.4);
  textSize(71 - tx);
  text("click screen!", width / 2, height / 2 + 10 + tx * 0.4);
  
  showSnake();
  updateSnake();
  autoSnake();
  
}

function autoSnake(){
  if(snake.x == maxWall && snake.y == minWall){
    snake.dirX = 0;
    snake.dirY = 1;
  }
  if(snake.x == minWall && snake.y == maxWall){
    snake.dirX = 0;
    snake.dirY = -1;
  }
  if(snake.x == minWall && snake.y == minWall){
    snake.dirX = 1;
    snake.dirY = 0;
  }
  if(snake.x == maxWall && snake.y == maxWall){
    snake.dirX = -1;
    snake.dirY = 0;
  }
}

function showBorder(){
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(10,10,380);
}

function eatFood(){
  if(snake.x == food.x && snake.y == food.y){
    snake.tail.push({x:snake.x, y:snake.y});
    food.x = round(random(minWall / s, maxWall / s)) * s; 
    food.y = round(random(minWall / s, maxWall / s)) * s;
    stepSpeed -= 1;
    
    scoreTime = millis();
    sPos.x = snake.x;
    sPos.y = snake.y;
    addScore = true;
  }
}

function getRand(){
  if(random() > 0.995 && !randActive){
    rand = {x:round(random(minWall / s, maxWall / s)) * s, 
             y:round(random(minWall / s, maxWall / s)) * s};
    randTime = millis();
    randActive = true;
  }
  if(randActive){
    textSize(20);
    text("random!!!", rand.x, rand.y - 25);
    text(round((5000 + randTime - millis()) / 10), rand.x, rand.y - 5);
    rect(rand.x, rand.y, s);
    if(snake.x == rand.x && snake.y == rand.y){
      randActive = false;
      randScore = round(random(-200, 350));
      score += randScore;
      randText = millis();
    }
  }
  
  if(!randActive && millis() < randText + 1000){
    text(randScore, rand.x, rand.y);
  }
  
  if(millis() > randTime + 5000){
    randActive = false;
  }
}

function getBonus(){
  if(random() > 0.995 && !bonusActive){
    bonus = {x:round(random(minWall / s, maxWall / s)) * s, 
             y:round(random(minWall / s, maxWall / s)) * s};
    bonusTime = millis();
    bonusActive = true;
  }
  if(bonusActive){
    textSize(20);
    text("bonus!!!", bonus.x, bonus.y - 25);
    text(round((5000 + bonusTime - millis()) / 10), bonus.x, bonus.y - 5);
    rect(bonus.x, bonus.y, s);
    if(snake.x == bonus.x && snake.y == bonus.y){
      bonusActive = false;
      score += round((5000 + bonusTime - millis()) / 10);
    }
  }
  
  if(millis() > bonusTime + 5000){
    bonusActive = false;
  }
}

function getSpeed(){
  if(random() > 0.998 && !speedActive){
    speed = {x:round(random(minWall / s, maxWall / s)) * s, 
             y:round(random(minWall / s, maxWall / s)) * s};
    speedTime = millis();
    speedActive = true;
  }
  if(speedActive){
    textSize(20);
    text("get +20 speed!!!", speed.x, speed.y - 25);
    text(round((5000 + speedTime - millis()) / 10), speed.x, speed.y - 5);
    rect(speed.x, speed.y, s);
    if(snake.x == speed.x && snake.y == speed.y){
      speedActive = false;
      stepSpeed -= 20;
    }
  }
  
  if(millis() > speedTime + 5000){
    speedActive = false;
  }
}

function showScore(){
  if(addScore){
    var pos = createVector(350, 50);
    // var sPos = createVector(snake.x, snake.y);
    // var st = d * 10;
    var d = p5.Vector.dist(pos, sPos);
    textSize(20);
    if(d > 10){
      let tempVec = p5.Vector.sub(pos, sPos);
      tempVec.normalize();
      tempVec.mult(4);
      if(millis() > scoreTime + 10){
        sPos.add(tempVec);
      }
      text("+10", sPos.x, sPos.y);
    }
    else{
      addScore = false;
      score += 10;
    }
  }
  textSize(20);
  text("score", 350, 30);
  text(score, 350, 50);
}

function keyPressed() {
  if(keyCode == UP_ARROW){
    snake.dirX = 0;
    snake.dirY = -1;
  }
  if(keyCode == DOWN_ARROW){
    snake.dirX = 0;
    snake.dirY = 1;
  }
  if(keyCode == LEFT_ARROW){
    snake.dirX = -1;
    snake.dirY = 0;
  }
  if(keyCode == RIGHT_ARROW){
    snake.dirX = 1;
    snake.dirY = 0;
  }
}

function updateSnake(){
  if(millis() > stepTime + stepSpeed){
    eatFood();
    stepTime = millis();
    prevPos = Object.assign({}, {x:snake.x, y:snake.y});
    
    // console.log(snake.tail);
    snake.x += snake.s * snake.dirX;
    snake.y += snake.s * snake.dirY;
    snake.tail.push(prevPos);
    // console.log(prevPos);
    snake.tail = snake.tail.slice(1, snake.tail.length);
  }
}

function checkWall(){
  if(snake.x < minWall || snake.y < minWall || snake.x > maxWall || snake.y > maxWall){
    gameOver = true;
    if(score > maxScore){
      maxScore = score;
      highScore = true;
    }
  }
}

function checkTail(){
  for(var i = 0; i < snake.tail.length; i++){
    if(snake.x == snake.tail[i].x && snake.y == snake.tail[i].y){
      gameOver = true;
      if(score > maxScore){
        maxScore = score;
        highScore = true;
      }
    }
  }
}

function showSnake(){
  fill(255);
  noStroke();
  rect(snake.x, snake.y, snake.s);
  for(var i = 0; i < snake.tail.length; i++){
    rect(snake.tail[i].x, snake.tail[i].y, snake.s);
  }
}

function showFood(){
  fill(255);
  noStroke();
  rect(food.x, food.y, food.s);
}