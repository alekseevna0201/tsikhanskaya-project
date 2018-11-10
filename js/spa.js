'use strict';

window.onhashchange = SwitchToStateFromURLHash;

var SPAStateH={};

function SwitchToStateFromURLHash () {
  var URLHash=window.location.hash;

  var StateJSON=decodeURIComponent(URLHash.substr(1));

  if ( StateJSON!=="" )

    SPAStateH=JSON.parse(StateJSON); // если JSON непустой, читаем из него
                                     // состояние и отображаем
  else
    SPAStateH = {pagename:'Main'}; // иначе показываем главную страницу

  console.log('Новое состояние приложения:');
  console.log(SPAStateH);

  // обновляем вариабельную часть страницы под текущее состояние
  var PageHTML="";

  switch ( SPAStateH.pagename ) {
    case 'Main':
      PageHTML+="<h3>Главная страница</h3>";
      PageHTML+="<p>Щёлкайте по кнопкам!</p>";
      break;
    case 'Photo':
      var PhotoH=PhotosH[SPAStateH.photoid];
      PageHTML+="<h3>Фото</h3>";
      PageHTML+="<img src='"+PhotoH.image+"'>";
      PageHTML+="<p><i>"+PhotoH.comment+"</i></p>";
      break;
    case 'About':
      PageHTML+="<h3>О нас</h3>";
      PageHTML+="<p>Мы круты!</p>";
      break;
  }
  document.getElementById('IPage').innerHTML=PageHTML;
}

function SwitchToState(NewStateH) {
  location.hash=encodeURIComponent(JSON.stringify(NewStateH));
}

function SwitchToMainPage() {
  SwitchToState( { pagename:'Main' } );
}

function SwitchToPhotoPage(PhotoId) {
  SwitchToState( { pagename:'Photo', photoid:PhotoId } );
}

function SwitchToAboutPage() {
  SwitchToState( { pagename:'About' } );
}

SwitchToStateFromURLHash();

var PhotosStr="";
for ( var PhotoId in PhotosH )
{
  var PhotoH=PhotosH[PhotoId];
  PhotosStr+='<input type=button value="'+PhotoH.comment
    +'" onclick="SwitchToPhotoPage('+PhotoId+')"> ';
}
document.getElementById('IPhotosButtons').innerHTML = PhotosStr;