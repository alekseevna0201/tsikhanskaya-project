'use strict';

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var cvsWidth = 1024; // ширина
var cvsHeight = 520; //высота
var plane = new Image();
var bg = new Image(); // Создание объекта
var obstacleUp = new Image(); // Создание объекта
var obstacleBottom = new Image(); // Создание объекта
var house = new Image(); // Создание объекта
var score = 0;
var time = -1;
var musicBox = document.querySelector('#mus');

var xPos = 10; //позиция самолетика
var yPos = 150;
var grav = 1.5; // скорость притяжения к земле
var gap = 200; /// доступное расстояние для обхода препятствий

// обработка аудио
var radio = new Audio();
radio.src = "audio/music.mp3";
var hitAudio = new Audio();
hitAudio.src = "audio/zvuk-udar.mp3";
var scoreAudio = new Audio();
scoreAudio.src = "audio/score.mp3";
var winAudio = new Audio();
winAudio.src = "audio/win.mp3";

var divForPlay = document.querySelector('#forPlay');
var divForPlayAgain = document.querySelector('#lose');
var mainDiv = document.querySelector('#main-background');
var winDiv = document.querySelector('#bg-win');
var sBox = document.getElementById('time');
var pauseBox = document.getElementById('pause');
var rulesBox = document.getElementById('read-rules');

house.src = "img/house.png";
plane.src = "img/plane1.png"; // Указание нужного изображения
bg.src = "img/bg2.jpg"; // Аналогично
obstacleUp.src = "img/rock.png"; // Аналогично
obstacleBottom.src = "img/tree.png"; // Аналогично

//самолет вверх при клике
document.addEventListener("keydown", moveUp);

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

////////////////////////////////ОТРИСОВКА!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function draw() {
  yPos += grav;
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

      document.getElementById('time').innerHTML = time;
      hitAudio.play();
      scoreAudio.pause();
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      playAgain();
    }

    if (obstacle[i].x === 40) {
      score++;
      scoreAudio.play();
    }
  }
  ctx.drawImage(plane, xPos, yPos, 100, 70);

  ctx.fillStyle = '#048';
  ctx.font = '50px Verdana';
  ctx.shadowColor = 'rgb(50,50,50)';
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 3;
  ctx.fillText('Счет: ' + score, cvs.width / 2, 50);

  if (score === 10) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    hitAudio.pause();
    ctx.fillStyle = '#000';
    ctx.font = '40px Verdana';
    ctx.fillText('Уровень успешно пройден! Поздравляем!', 25, 100);
    winAudio.play();
    winDiv.style.display = 'block';
  }
  requestAnimationFrame(draw);
}

musicBox.onclick = function () {
  /* проверяем если музыка не на паузе воспроизводим*/
  if (radio.paused === true) {
    radio.play();
  } else {
    radio.pause();
  }
};

function startGame() {
  //////////////////////////////////   TIMER SECOND !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  (function () {
    var times = 60;

    timer(times);

    function timer(times) {
      var tm = setInterval(function () {
        times--;
        if (times === 0) {
          clearInterval(tm);
          playAgain();
        } else if (times === -1) {
          times = 60;
          times--;
        }
        var sec = (times < 10) ? '0' + times : times;

        // выводим значение таймера на экран
        showTimer(sec);
      }, 1000);
    }

    function showTimer(s) {
      sBox.innerHTML = s;
    }
  })();
  obstacleBottom.onload = draw();
  divForPlay.style.display = 'none';
  mainDiv.style.display = 'none';
  pauseBox.style.cursor = 'pointer';
}

function playAgain() {
  sBox.innerHTML = 'TIMER';
  hitAudio.pause();
  radio.pause();
  scoreAudio.pause();
  divForPlayAgain.style.display = 'block';
  mainDiv.style.display = 'block';
  divForPlayAgain.style.display = 'block';
}

function reload() {
  location.reload();
}

pauseBox.onclick = function () {
  confirm('Игра остановлена. Для продолжения нажмите OK');
};

rulesBox.onclick = function () {
  confirm('Для управления самолетом просто жмите любую клавишу.\n' +
    'Не забывайте, что самолет имеет гравитацию.\n' +
    'Чтобы продолжите нажмите ОК');
};