'use strict';

let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let cvsWidth = 1024; // ширина
let cvsHeight = 520; //высота
let score = 0;
let time = -1;

let xPos = 10; //позиция самолетика
let yPos = 150;
const grav = 1.5; // скорость притяжения к земле
const gap = 200; /// доступное расстояние для обхода препятствий

// обработка аудио

let hitAudio = new Audio();
hitAudio.src = "audio/zvuk-udar.mp3";
let scoreAudio = new Audio();
scoreAudio.src = "audio/score.mp3";
let winAudio = new Audio();
winAudio.src = "audio/win.mp3";
let phoneAudio = new Audio();
phoneAudio.src = "audio/phone-music.mp3";

/// обработка необходимых для игры блоков

let divForPlay = document.querySelector('#forPlay');
let divForPlayAgain = document.querySelector('#lose');
let mainDiv = document.querySelector('#main-background');
let winDiv = document.querySelector('#bg-win');
let sBox = document.getElementById('time');
let pauseBox = document.getElementById('pause');
let rulesBox = document.getElementById('read-rules');

sBox.style.display = 'none';
pauseBox.style.display = 'none';
rulesBox.style.display = 'none';

// обработка необходимых изображений

let plane = new Image();
let bg = new Image(); // Создание объекта
let obstacleUp = new Image(); // Создание объекта
let obstacleBottom = new Image(); // Создание объекта
let house = new Image(); // Создание объекта

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
let obstacle = [];
obstacle[0] = {
  x: cvs.width / 2,
  y: 0
};

////////////////////////////////ОТРИСОВКА!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function draw() {
  yPos += grav;
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < obstacle.length; i++) {
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
      phoneAudio.pause();
      ctx.clearRect(0, 0, cvsWidth, cvsHeight);
      obstacle = [];
      cvs.style.display = 'none';
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

  if (score === 6) {
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

function startGame() {
  //////////////////////////////////   TIMER SECOND !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  phoneAudio.play();
  sBox.style.display = 'block';
  pauseBox.style.display = 'block';
  rulesBox.style.display = 'block';

  (function () {
    let times = 60;

    timer(times);

    function timer(times) {
      let tm = setInterval(function () {
        times--;
        if (times === 0) {
          clearInterval(tm);
          playAgain();
        } else if (times === -1) {
          times = 60;
          times--;
        }
        let sec = (times < 10) ? '0' + times : times;

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
  sBox.style.display = 'none';
  pauseBox.style.display = 'none';
  rulesBox.style.display = 'none';
  score = 0;
  hitAudio.play();
  phoneAudio.pause();
  scoreAudio.pause();
  divForPlayAgain.style.display = 'block';
  mainDiv.style.display = 'block';
}

function reload() {
  location.reload();
}

// pauseBox.onclick = function () {
//   confirm('Игра остановлена. Для продолжения нажмите OK');
// };
//
// rulesBox.onclick = function () {
//   confirm('Для управления самолетом просто жмите любую клавишу.\n' +
//     'Не забывайте, что самолет имеет гравитацию.\n' +
//     'Чтобы продолжите нажмите ОК');
// };