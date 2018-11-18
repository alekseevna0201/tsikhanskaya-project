'use strict';

//  рисуем спрайт ////////////////////////////////////////////////////////////////////////////////////////
var cvs = document.getElementById("canva");
var ctx = cvs.getContext("2d");

var width = 100,
  height = 67,
  frames = 3,

  currentFrame = 0;

var image = new Image();
image.src = '../img/sprite.png';

var drawSprite = function() {
  // ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, height * currentFrame, width, height, 0, 0, width, height);

  if (currentFrame === frames) {
    currentFrame = 0;
  } else {
    currentFrame++;
  }
};

setInterval(drawSprite, 100);