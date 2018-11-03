'use strict';

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var plane = new Image();
var bg = new Image(); // Создание объекта
var obstacleUp = new Image(); // Создание объекта
var obstacleBottom = new Image(); // Создание объекта
var house = new Image(); // Создание объекта
var img = new Image();

house.src = "img/house.png";
plane.src = "img/plane1.png"; // Указание нужного изображения
bg.src = "img/bg1.jpg"; // Аналогично
obstacleUp.src = "img/rock.png"; // Аналогично
obstacleBottom.src = "img/tree.png"; // Аналогично
img.src = "img/image.png"; // Аналогично
var imgWidth = 300;
var imgHeight = 200;

var gap = 200;

//самолет вверх при клике
document.addEventListener("mousedown", moveUp);

function moveUp() {
  yPos -= 20;
  xPos += 3;
}

//создание препятствий
var obstacle = [];
obstacle[0] = {
  x: cvs.width / 2,
  y: 0
};
// счетчик
var score = 0;

//позиция самолетика
var xPos = 10;
var yPos = 150;
var grav = 1;

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < obstacle.length; i++) {
    ctx.drawImage(obstacleUp, obstacle[i].x, obstacle[i].y);
    ctx.drawImage(obstacleBottom, obstacle[i].x, obstacle[i].y + obstacleUp.height + gap);

    obstacle[i].x--;

    if (obstacle[i].x === 450) {
      obstacle.push({
        x: cvs.width,
        y: Math.floor(Math.random() * obstacleUp.height) - obstacleUp.height
      });
    }

    if (xPos + plane.width >= obstacle[i].x
      && xPos <= obstacle[i].x + obstacleUp.width
      && (yPos <= obstacle[i].y + obstacleUp.height
        || yPos + plane.height >= obstacle[i].y + obstacleUp.height + gap)
      || yPos + plane.height >= cvs.height) {

      hitAudio.play();
      scoreAudio.pause();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      /////////////////////////////////////// отрисовать что происходит когда ударился

      //////////////////////////////////////////
      ctx.drawImage(img, cvs.width / 2 - imgWidth / 2, cvs.height / 2 - imgHeight / 2);
      location.reload();
    }

    if (obstacle[i].x === 20) {
      score++;
      scoreAudio.play();
    }
  }

  ctx.drawImage(plane, xPos, yPos, 100, 70);

  yPos += grav;

  ctx.fillStyle = '#048';
  ctx.font = '50px Verdana';
  ctx.shadowColor = 'rgb(50,50,50)';
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 3;
  ctx.fillText('Счет: ' + score, cvs.width / 2, 50);

  if (score === 2) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    /////////////////////////////////////// отрисовать что происходит когда прошел

    //////////////////////////////////////////
    hitAudio.pause();
    ctx.fillStyle = '#000';
    ctx.font = '40px Verdana';
    ctx.fillText('Уровень успешно пройден! Поздравляем!', 10, 300);
  }
  requestAnimationFrame(draw);
}

obstacleBottom.onload = draw();

// обработка аудио
var radio = new Audio();
var hitAudio = new Audio();
var scoreAudio = new Audio();

radio.src = "audio/music.mp3";
hitAudio.src = "audio/hit.mp3";
scoreAudio.src = "audio/score.mp3";

document.querySelector('#note').onclick = function () {
  /* проверяем если музыка не на паузе воспроизводим*/
  if (radio.paused === true) {
    radio.play();
  } else {
    radio.pause();
  }
};