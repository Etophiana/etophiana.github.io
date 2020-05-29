let xPos;
let yPos;
let direction = 1;
let sSize = 20;
let xSpeed = 0;
let ySpeed = 0 - sSize;
let x = [];
let y = [];
let fPosX;
let fPosY;
let moved = false;
let eat = true;
let posX;
let posY;
let score = 3;
let xtmp;
let ytmp;

function setup() {
  createCanvas(800, 800);
  noStroke();
  frameRate(10);
  
  xPos = width/2;
  yPos = height/2;
  
}



function keyPressed() {
  if(key == "Enter"){
    eat = true;
    food();
  }
  if(key == " "){
    xSpeed = 0;
    ySpeed = 0;
  }
  if(key == "ArrowUp" && direction != 2 && moved){
    direction = 1;
    xSpeed = 0;
    ySpeed = 0 - sSize;
    moved = false;
  }
  if(key == "ArrowDown" && direction != 1 && moved){
    direction = 2;
    xSpeed = 0;
    ySpeed = sSize;
    moved = false;
  }
  if(key == "ArrowLeft" && direction != 4 && moved){
    direction = 3;
    xSpeed = 0 - sSize;
    ySpeed = 0;
    moved = false;
  }
  if(key == "ArrowRight" && direction != 3 && moved){
    direction = 4;
    xSpeed = sSize;
    ySpeed = 0;
    moved = false;
  }
}

function die(){
  if(xPos >= 800 || xPos < 0){
    frameRate(0);
  }
  if(yPos >= 800 || yPos < 0){
    frameRate(0);
  }
  
  for(let i = 0;i<score;i++){
    if(xPos - x[i] == 0 && yPos - y[i] == 0){
      frameRate(0);
    }
  }
}

function genFood(xFunc, yFunc){
  for(let i = 0;i<score;i++){
    if(xFunc*20 == x[i] && yFunc*20 == y[i]){
      return false;
    }
  }
  return true;
}

function food(){
  if(eat == true){
    score++;
    do{
      eat = false;
      posX = random(40);
      posY = random(40);
  
      for(let i = 1;i<=40;i++){
        if(posX < i){
          posX = i - 1;
          break;
        }
      }
      for(let i = 1;i<=40;i++){    
        if(posY < i){
          posY = i - 1;
          break;
        }
      }
    }
    while(!genFood(posX, posY));
    x[score+1] = x[score];
    y[score+1] = y[score];
  }
  
  fill(255,0,0);
  rect(posX * 20,posY * 20 , sSize, sSize);
  if(xPos - posX*20 == 0 && yPos - posY*20 == 0){
    eat = true;
    for(let i = score;i > 0;i--){
      x[i] = x[i-1];
      y[i] = y[i-1];
    }
    x[0] = xPos;
    y[0] = yPos;
  }
}

function move(){
  x[0] = xPos;
  y[0] = yPos;
  for(let i = score;i > 0;i--){
    x[i] = x[i-1];
    y[i] = y[i-1];
  }
  
  xPos += xSpeed;
  yPos += ySpeed;
  
  for(let i = 0;i<score;i++){
    fill(255 - i * 1, 255 - i * 1, 255 - i * 1);
    rect(x[i], y[i], sSize, sSize);
  }
}


function draw() {
  background(55);
  
  move();
  die();
  food();
  
  moved = true;
}
