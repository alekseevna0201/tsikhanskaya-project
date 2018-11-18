'use strict';
///// ЭТО для движения фона JQUARY
var bg_Offset = 0;
function scroll_bg(){
  bg_Offset = bg_Offset - 1;
  if (bg_Offset > 600) bg_Offset = 0;
  $("body").css("backgroundPosition", bg_Offset + "px 0px");
}
$(document).ready(function(){ setInterval("scroll_bg()",50); });
//////////

window.onhashchange = renderNewState;
function renderNewState() {
  var hash = window.location.hash;
  var state = decodeURIComponent(hash.substr(1));
  ''
  if (state === '') {
    state = {page: 'first'};
  } else {
    state = JSON.parse(state);
  }

  var page = '';

  switch(state.page) {
    case 'first':
      page += "<img src='' alt='' id='phone'>" +
        "<img id=\"plane\" src=\"img/plane.png\" alt=\"\" style=\"transform: rotate(-30deg)\">" +
        "<p id='name'>Drunk Plane</p>" +
      "<p class='describe'>entertaining game</p>";
      document.getElementById('footer').style.display = 'block';
      document.getElementById('canvas').style.display = 'none';
      break;

    case 'second':
      page +=
        '  <div id="main-background"></div>\n' +
        '  <div id="bg-win"></div>\n' +
        '  <div id="menu">\n' +
        '    <img src="img/note.png" alt="" onclick="new Audio(\'music.mp3\').play()" id="mus">\n' +
        '    <p id="pause">PAUSE</p>\n' +
        '    <p id="read-rules">RULES</p>\n' +
        '    <p id="time">TIMER</p>\n' +
        '  </div>\n' +
        '  <div id="forPlay">\n' +
        '    <p id="play">\n' +
        '      Play\n' +
        '      <input type="button" class="circle" onclick="startGame()"></input>\n' +
        '    </p>\n' +
        '  </div>\n' +
        '  <div id="lose">\n' +
        '    <p id="play-again">\n' +
        '      Play again\n' +
        '    <input type="button" class="circle2" onclick="reload()"></input>\n' +
        '    </p>\n' +
        '  </div>\n' +
        '  <div id="logo">\n' +
        '    <a href="">\n' +
        '      <img src="img/plane.png" alt="">\n' +
        '    </a>\n' +
        '  </div>' +
        '<script src="js/game.js"></script>' ;
      document.getElementById('footer').style.display = 'none';
      break;

    case 'third':
      page +=  '<div id="drive">' +
        '<p>Для управления самолетом просто нажимайте на любую клавишу.<br>' +
        'Цель игры - обойти все препятствия за 60 секунд<br>' +
        'Если Ваше время выходит, то игра начнется заново<br>' +
        'Если персонаж столкнется с препятствием, то Вы также можете попробовать заново.<br>' +
        'Счастливого пути!</p></div>' +
        '  <div id="logo">\n' +
        '    <a href="">\n' +
        '      <img src="img/plane.png" alt="">\n' +
        '    </a>\n' +
        '  </div>';

      document.getElementById('footer').style.display = 'block';
      document.getElementById('canvas').style.display = 'none';
      break;

    case 'four':
      page += '<div id="about">' +
        '<form action="" name="contacts">\n' +
        '  <fieldset>\n' +
        '    <legend>\n' +
        '      Оставьте свои данные чтобы получать уведомления\n' +
        '    </legend>\n' +
        '    <label for="last-name">Фамилия</label>\n' +
        '    <input type="text" name="last-name" id="last-name" size="30" value="" class="text-input" /><br>\n' +
        '    <label for="first-name">Имя</label>\n' +
        '    <input type="text" id="first-name" name="first-name" size="30" value="" class="text-input" /><br>\n' +
        '    <label for="email">Электронная почта</label>\n' +
        '    <input type="text" id="email" name="email" size="30" value="" class="text-input" /><br>\n' +
        '    <input type="button" value="Отправить">'+
        '  </fieldset>\n' +
        '</form>' +
        '</div>' +
      '  <div id="logo">\n' +
      '    <a href="">\n' +
      '      <img src="img/plane.png" alt="">\n' +
      '    </a>\n' +
      '  </div>';
      document.getElementById('footer').style.display = 'block';
      document.getElementById('canvas').style.display = 'none';
      break;
  }
  document.getElementById('front').innerHTML = page;
}

function switchToState(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}
function switchToFirst() {
  switchToState({page: 'first'});
}
function switchToSecond() {
  switchToState({page: 'second'});
}
function switchToThird() {
  switchToState({page: 'third'});
}
function switchToFour() {
  switchToState({page: 'four'});
}
renderNewState();