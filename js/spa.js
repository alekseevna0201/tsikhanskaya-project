'use strict';

window.onhashchange = renderNewState;
function renderNewState() {
  let hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));
  if (state === '') {
    state = {page: 'first'};
  } else {
    state = JSON.parse(state);
  }

  let page = '';

  switch(state.page) {
    case 'first':
      page += `<img id=\"plane\" src=\"img/plane.png\" alt=\"\" style=\"transform: rotate(-30deg)\">
        <p id='name'>Little Plane</p>
      <p class='describe'>entertaining game</p>`;
      document.getElementById('footer').style.display = 'block';
      document.getElementById('front').style.display = 'block';
      document.getElementById('forPlay').style.display = 'none';
      document.getElementById('canvas').style.display = 'none';
      document.getElementById('lose').style.display = 'none';
      document.getElementById('main-clearfix').style.display = 'none';
      document.getElementById('main-background').style.display = 'none';
      document.getElementById('h2').style.display = 'none';
      document.getElementById('fairy-tayle').style.display = 'none';
      document.getElementById('fairy-tayle2').style.display = 'none';
      document.getElementById('fairy-tayle3').style.display = 'none';
      document.getElementById('fairy-tayle4').style.display = 'none';
      document.body.style.overflow = 'hidden';
      break;

    case 'second':
      page +=
      document.getElementById('footer').style.display = 'block';
      document.getElementById('front').style.display = 'none';
      document.getElementById('canvas').style.display = 'block';
      document.getElementById('main-background').style.display = 'none';
      document.getElementById('forPlay').style.display = 'block';
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
      document.body.style.overflow = 'auto';
      document.getElementById('footer').style.display = 'block';
      document.getElementById('footer').style.zIndex = '0';
      document.getElementById('lose').style.display = 'none';
      document.getElementById('forPlay').style.display = 'none';
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
      document.getElementById('main-background').style.display = 'none';
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
        </div>`;
      document.getElementById('footer').style.display = 'block';
      document.getElementById('logo').style.display = 'block';
      document.getElementById('forPlay').style.display = 'none';
      document.getElementById('lose').style.display = 'none';
      document.getElementById('canvas').style.display = 'none';
      document.getElementById('main-clearfix').style.display = 'none';
      document.getElementById('h2').style.display = 'none';
      document.getElementById('front').style.display = 'block';
      document.getElementById('fairy-tayle').style.display = 'none';
      document.getElementById('fairy-tayle2').style.display = 'none';
      document.getElementById('fairy-tayle3').style.display = 'none';
      document.getElementById('fairy-tayle4').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      document.getElementById('google').style.display = 'block';
      document.getElementById('main-background').style.display = 'none';
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

window.onbeforeunload = function(e) {
  let dialogText = 'Dialog text here';
  e.returnValue = dialogText;
  return dialogText;
};