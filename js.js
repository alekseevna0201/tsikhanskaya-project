'use strict';

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var cvsWidth = 1000;
var cvsHeight = 600;
var plane = new Image();
var bg = new Image(); // Создание объекта
var obstacleUp = new Image(); // Создание объекта
var obstacleBottom = new Image(); // Создание объекта
var house = new Image(); // Создание объекта
var img = new Image();
var score = 0;

//позиция самолетика
var xPos = 10;
var yPos = 150;
var grav = 1.5;
var gap = 200;

// обработка аудио
var radio = new Audio();
var hitAudio = new Audio();
var scoreAudio = new Audio();

radio.src = "audio/music.mp3";
hitAudio.src = "audio/zvuk-udar.mp3";
scoreAudio.src = "audio/score.mp3";

var divForPlay = document.querySelector('#forPlay');
var divForPlayAgain = document.querySelector('#lose');
var mainDiv = document.querySelector('#main-background');

//самолет вверх при клике
document.addEventListener("mousedown", moveUp);

house.src = "img/house.png";
plane.src = "img/plane1.png"; // Указание нужного изображения
bg.src = "img/bg1.jpg"; // Аналогично
obstacleUp.src = "img/rock.png"; // Аналогично
obstacleBottom.src = "img/tree.png"; // Аналогично
img.src = "img/image.png"; // Аналогично

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

//////////////////////////////////   TIMER SECOND
function seInt() {
  setInterval(fSec, 1000);
  var sec = 0;
  function fSec() {
    sec = sec + 1;
    document.getElementById("time").innerHTML = sec;
  }
}

////////////////////////////////
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
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        /////////////////////////////////////// отрисовать что происходит когда ударился
          playAgain();
        //////////////////////////////////////////
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

    /////////////////////////////////////// если прошел

    var opts = {
      count: 16, //
      size: 50, //минимальный размер
      sizeRandom: 10, //увеличение
      sparkLife: 0.1,
      spawnOpacity: 0.7, //прозрачность
      hueRotationSpeed: 4, //Decreases the hue rotatio speed
      color: "rgba(255,102,255,0.1) " //The color of sparks.
    };

    var img1 = new Image();
    img1.src = 'img/win.png';
    var tick = 0;
    var currentHue = 0;

    function anim () {
      window.requestAnimationFrame(anim);
      step();
      ++tick;
    }

    anim();

    function step() {

      ctx.drawImage(img1, cvsWidth / 2 + img1.x / 2, cvsHeight / 2);


      var fillColor = opts.color.replace("hue", currentHue);
      ctx.fillStyle = fillColor;
      for (var i = 0; i < Math.round(opts.count); i++) {
        var random = Math.random() * opts.sizeRandom;
        ctx.fillRect(-(opts.size / 2) + Math.random() * cvsWidth, -(opts.size / 2) + Math.random() * cvsHeight,
          opts.size + random, opts.size + random);
      }
      ctx.fillStyle = "rgba(255,255,255," + opts.sparkLife + ")";
      ctx.fillRect(0, 0, cvsWidth, cvsHeight);
    }
    window.addEventListener("resize", function () {
    });
//////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    hitAudio.pause();
    ctx.fillStyle = '#000';
    ctx.font = '40px Verdana';
    ctx.fillText('Уровень успешно пройден! Поздравляем!', 25, 100);
  }
  requestAnimationFrame(draw);
}

document.querySelector('#mus').onclick = function () {
  /* проверяем если музыка не на паузе воспроизводим*/
  if (radio.paused === true) {
    radio.play();
  } else {
    radio.pause();
  }
};

function startGame() {
  seInt();
  obstacleBottom.onload = draw();
  divForPlay.style.display = 'none';
  mainDiv.style.display = 'none';
}

function playAgain () {
  divForPlayAgain.style.display = 'block';
  mainDiv.style.display = 'block';
  divForPlayAgain.style.display = 'block';
}

function reload() {
  location.reload();
}