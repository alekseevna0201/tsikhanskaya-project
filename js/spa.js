'use strict';
/// ЭТО для движения фона JQUARY
var bg_Offset = 0;
function scroll_bg(){
  bg_Offset = bg_Offset - 1;
  if (bg_Offset > 800) bg_Offset = 0;
  $("body").css("backgroundPosition", bg_Offset + "px 0px");
}
$(document).ready(function(){ setInterval("scroll_bg()",150); });
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
      page += `<img src='' alt='' id='phone'>
        <img id=\"plane\" src=\"img/plane.png\" alt=\"\" style=\"transform: rotate(-30deg)\">
        <p id='name'>Little Plane</p>
      <p class='describe'>entertaining game</p>`;
      document.getElementById('footer').style.display = 'block';
      document.getElementById('canvas').style.display = 'none';
      document.getElementById('main-clearfix').style.display = 'none';
      document.getElementById('h2').style.display = 'none';
      document.getElementById('fairy-tayle').style.display = 'none';
      document.getElementById('fairy-tayle2').style.display = 'none';
      document.getElementById('fairy-tayle3').style.display = 'none';
      document.getElementById('fairy-tayle4').style.display = 'none';
      document.body.style.overflow = 'hidden';
      break;

    case 'second':
      page +=
         `<div id="main-background"></div>\n 
         <div id="bg-win"></div>\n 
          <div id="menu">\n' 
            <p id="pause">PAUSE</p>\n 
            <p id="read-rules">RULES</p>\n 
            <p id="time">TIMER</p>\n 
          </div>\n
          <div id="forPlay">\n 
            <p id="play">\n
              Play\n
              <input type="button" class="but" onclick="startGame()"></input>\n
            </p>\n
          </div>\n
          <div id="lose">\n
            <p id="play-again">\n
              Play again\n
            <input type="button" class="but2" onclick="reload()"></input>\n
            </p>\n
          </div>\n
          <div id="logo">\n
            <a href="">\n
              <img src="img/plane.png" alt="">\n
            </a>\n
          </div>'`;
      document.getElementById('footer').style.display = 'none';
      document.getElementById('canvas').style.display = 'block';
      document.getElementById('main-clearfix').style.display = 'none';
      document.getElementById('h2').style.display = 'none';
      document.getElementById('fairy-tayle').style.display = 'none';
      document.getElementById('fairy-tayle2').style.display = 'none';
      document.getElementById('fairy-tayle3').style.display = 'none';
      document.getElementById('fairy-tayle4').style.display = 'none';
      document.getElementById('app').style.display = 'none';
      document.getElementById('google').style.display = 'none';
      break;

    case 'third':
      page +=  '';

      document.getElementById('footer').style.display = 'block';
      document.getElementById('canvas').style.display = 'none';
      document.getElementById('main-clearfix').style.display = 'block';
      document.getElementById('h2').style.display = 'block';
      document.getElementById('fairy-tayle').style.display = 'block';
      document.getElementById('fairy-tayle2').style.display = 'block';
      document.getElementById('fairy-tayle3').style.display = 'block';
      document.getElementById('fairy-tayle4').style.display = 'block';
      document.getElementById('footer').style.display = 'none';
      document.getElementById('app').style.display = 'none';
      document.getElementById('google').style.display = 'none';
      break;

    case 'four':
      page += `<div id="about">
        <form action="" name="contacts">\n
          <fieldset>\n
            <legend>\n
              \n
        leave your details to receive notifications\n
            </legend>\n
            <label for="last-name">First name</label>\n
            <input type="text" name="last-name" id="last-name" size="30" value="" class="text-input" /><br>\n
            <label for="first-name">Last name</label>\n
            <input type="text" id="first-name" name="first-name" size="30" value="" class="text-input" /><br>\n
            <label for="email">Email</label>\n
            <input type="text" id="email" name="email" size="30" value="" class="text-input" /><br>\n
            <input type="button" value="To send">
          </fieldset>\n
        </form>
        </div>
        <div id="logo">\n
          <a href="">\n
            <img src="img/plane.png" alt="">\n
          </a>\n
        </div>`;
      document.getElementById('footer').style.display = 'block';
      document.getElementById('canvas').style.display = 'none';
      document.getElementById('canvas').style.display = 'none';
      document.getElementById('main-clearfix').style.display = 'none';
      document.getElementById('h2').style.display = 'none';
      document.getElementById('fairy-tayle').style.display = 'none';
      document.getElementById('fairy-tayle2').style.display = 'none';
      document.getElementById('fairy-tayle3').style.display = 'none';
      document.getElementById('fairy-tayle4').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      document.getElementById('google').style.display = 'block';
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