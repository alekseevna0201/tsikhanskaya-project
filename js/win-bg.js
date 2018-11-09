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