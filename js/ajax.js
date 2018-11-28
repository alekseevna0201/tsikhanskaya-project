// случайное число от 1 до 100
let rnd = Math.floor(Math.random()*100+1);

// выводим в контейнер content, добавляя уже к имеющемуся содержимому контейнера
$("#content").html($("#content").html()+rnd+"<BR/>");