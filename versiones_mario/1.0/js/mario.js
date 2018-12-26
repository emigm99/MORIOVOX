//Posiciones iniciales.
var imagen1X = Math.random()*230;
var imagen1Y = 0;
var imagen2X = 110;
var imagen2Y = 410;
var combo = 0;
var dins=0;
var fora=3
var velocidad=7;
var activo=1;



//Imagenes.
var img1 = new Image;
img1.src = "./imgs/box.png";
var img2 = new Image;
img2.src = "./imgs/mariod.png";
var audio = new Audio('./media/turn.mp3');
audio.play();
var gameover = new Image;
gameover.src = "./imgs/gameover.png";


function comenzar(){

  lienzo = document.getElementById('lienzo');
  lienzo.style.background= "#f3f3f3 url('./imgs/fondo.jpg') no-repeat right top";
  ctx = lienzo.getContext('2d');

  //Llamar a la función cada 30 milisegundos.
  //Recordar que 1000 milisegundos = 1 segundo
  setInterval(mover, 80);
}

function mover(){

  if (activo==1){
  //muevo la imagen hacia la izquierda restando 5.
  imagen1Y = imagen1Y + velocidad;

  if (imagen1X>imagen2X){ imagen1X = imagen1X + Math.random()*2;}
  else
  {imagen1X = imagen1X - Math.random()*2;}
  }
  if (imagen1X > 270){
    imagen1X = imagen1X - Math.random()*2;
  }
  if(imagen1X < 10){
    imagen1X = imagen1X + Math.random()*2;
  }

  // ACIERTO   -   IN
  if   (
    (Math.abs(imagen1X-imagen2X)<35) &&
    (Math.abs(imagen1Y-imagen2Y)<35)
        )
  {
  // TO DO LIST
  //incremento velocidad
  console.log(velocidad);
    if (combo == 3 && velocidad <= 22){
      console.log("LVL 1");
    velocidad++;
    combo=0;
    var audio = new Audio('./media/nsmbwiiHurryUp.wav');
    audio.play();
  } else if (combo == 5 && velocidad <= 25) {
    velocidad++;
    combo=0;
    var audio = new Audio('./media/nsmbwiiHurryUp.wav');
    audio.play();
  } else if (combo == 10) {
    velocidad++;
    var audio = new Audio('./media/nsmbwiiHurryUp.wav');
    audio.play();
  }

  // sumar un punto
  dins++;
  combo++;


  // reposicionar a david
  reposicionar_david()
  var audio = new Audio('./media/nsmbwiiCoin.wav');
  audio.play();

  }


  if (imagen1Y >=550)  // David ha caído fuera de la cesta
  {
    fora--;
    if (fora==0)
    {

    //Borro todo lo que haya en nuestro lienzo
    ctx.clearRect(0,0,lienzo.width,lienzo.height);
    var audio = new Audio('./media/mariodead.mp3')
    audio.play();
    ctx.font = "20px Arial";
    ctx.fillText("GAME OVER",90,150);
    ctx.fillText("Pulsa 'R' para reiniciar",60,170);
    ctx.drawImage(gameover,110,190);
    activo=0;





    }
    // reposicionar a david
    reposicionar_david()
    var audio = new Audio('./media/smw_break_block.wav');
    audio.play();

  }

  if (imagen2X <= 0){imagen2X = 0;}
  if (imagen2X >= 240){imagen2X = 240;}

  if (activo==1)
  {
    //Borro todo lo que haya en nuestro lienzo
    ctx.clearRect(0,0,lienzo.width,lienzo.height);

    //Dibujo las imágenes en la nueva posición
    ctx.drawImage(img1, imagen1X, imagen1Y);
    ctx.drawImage(img2, imagen2X, imagen2Y);
    ctx.font = "20px Arial";
    ctx.fillText("IN: "+dins,5,25);
    ctx.fillText("OUT: "+fora,225,25);
  }

}

function reposicionar_david()
{
  imagen1X = Math.random()*230;
  imagen1Y = 0;

}


document.onkeydown = function (event) {
  var teclaC;

  if ( event == null ) {
    teclaC = window.event.keyCode;
  }
  else {
    teclaC = event.keyCode;
  }

  switch (teclaC) {
    case 39:imagen2X = imagen2X + 10;
    img2.src = "./imgs/mariod.png";
      break;
    case 37:imagen2X = imagen2X - 10;
    img2.src = "./imgs/marioi.png";
      break;
    case 82:
    case 114:
      dins=0;
      fora=3
      velocidad=7;
      activo=1;

      break;
    //case 38:imagen2Y = imagen2Y - 5;
    //	break;
    //case 40:imagen2Y = imagen2Y + 5;
    //	break;
    default:
  }
}
