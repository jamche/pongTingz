let paddleHeight = 150;
let paddleWidth = 10;
let ballRadius = 25;
let halfPaddleHeight = paddleHeight / 2;
let speedOfPaddle1 = 0;
let positionOfPaddle1 = 460;
let speedOfPaddle2 = 0;
let positionOfPaddle2 = 460;

let topPositionOfBall = 510;
let leftPositionOfBall = 820;
let topSpeedOfBall = 0;
let leftSpeedOfBall = 0;

let score1 = 0;
let score2 = 0;

setTimeout(function(){
  startBallGame();
},2000);



// start ball movement on init

function startBallGame() {
  topPositionOfBall = 510;
  leftPositionOfBall = 820;
  if(Math.random() < 0.5){
     side = 1;
  }else{
     side = -1;
  } 
  ballSpeed();
};

function ballSpeed(){
  topSpeedOfBall = Math.floor(Math.random() * 5 + 4);
  leftSpeedOfBall = side * Math.floor(Math.random() * 5 + 4);
}
// stops paddle from continuing to move
document.addEventListener('keyup', function (e) {
  if (e.keyCode == 87) {
    speedOfPaddle1 = 0;
  }
  if (e.keyCode == 83) {
    speedOfPaddle1 = 0;
  }
  if (e.keyCode == 38) {
    speedOfPaddle2 = 0;
  }
  if (e.keyCode == 40) {
    speedOfPaddle2 = 0;
  }
}, false);

// move paddles
document.addEventListener('keydown',function(e){
  if (e.keyCode == 87) {
    speedOfPaddle1 = -10;
  }
  if (e.keyCode == 83) {
    speedOfPaddle1 = 10;
  }
  if (e.keyCode == 38) {
    speedOfPaddle2 = -10;
  }
  if (e.keyCode == 40) {
    speedOfPaddle2 = 10;
  }
}, false);

//makes paddles transition from up/down to less jitery
window.setInterval(function show(){
  positionOfPaddle1 += speedOfPaddle1;
  positionOfPaddle2 += speedOfPaddle2;
  topPositionOfBall += topSpeedOfBall;
  leftPositionOfBall += leftSpeedOfBall;
  
  // stops paddles from moving up or outside the window
  if(positionOfPaddle1 <= 150){
    positionOfPaddle1 = 150;
  }
  if (positionOfPaddle2 <= 150) {
    positionOfPaddle2 = 150;
  }
  if(positionOfPaddle1 >= window.innerHeight - paddleHeight){
    positionOfPaddle1 = window.innerHeight - paddleHeight;
  }
  if(positionOfPaddle2 > window.innerHeight - paddleHeight){
    positionOfPaddle2 = window.innerHeight - paddleHeight;
  }

  // ball stops when hits top
  if (topPositionOfBall <= 150 || topPositionOfBall >= window.innerHeight - ballRadius) {
    topSpeedOfBall = -topSpeedOfBall;
  }
  // if ball hits left or right side of screen
  if(leftPositionOfBall <= paddleWidth){
    if(topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){
      leftSpeedOfBall = -leftSpeedOfBall;
      
    }else {
      score2++;
      console.log('player 2 points' + ' ' + score2);
      startBallGame();
    }
  }
  if(leftPositionOfBall >= window.innerWidth - ballRadius - paddleWidth){
    if(topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){
      leftSpeedOfBall = -leftSpeedOfBall;
    }else{
      score1++;
      console.log('player 1 points' + ' '+ score1);
      startBallGame();
    }
  }
  document.getElementsByClassName("paddle1")[0].style.top = (positionOfPaddle1) + "px";
  document.getElementsByClassName("paddle2")[0].style.top = (positionOfPaddle2) + "px";
  document.getElementsByClassName('ball')[0].style.top = (topPositionOfBall) + "px";
  document.getElementsByClassName('ball')[0].style.left = (leftPositionOfBall) + "px";
  document.getElementsByClassName('player1')[0].innerHTML = score1.toString();
  document.getElementsByClassName('player2')[0].innerHTML = score2.toString();
}, 1000 / 60);




