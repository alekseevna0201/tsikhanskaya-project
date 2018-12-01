//////// движение заднего фона с помощью JQuery

let bg_Offset = 0;
function scroll_bg(){
  bg_Offset = bg_Offset - 1;
  if (bg_Offset > 600) bg_Offset = 0;
  $("body").css("backgroundPosition", bg_Offset + "px 0px");
}
$(document).ready(function(){ setInterval("scroll_bg()",150); });