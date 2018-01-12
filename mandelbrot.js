var delay_original = 10;
var delay = delay_original;
var zoomSlider;
var typeA;
var typeB;
var typeC;
var typeD;
var typeSelected = 0;

function setup() {
  typeA = document.getElementById("typeA");
  typeB = document.getElementById("typeB");
  typeC = document.getElementById("typeC");
  typeD = document.getElementById("typeD");
  typeD.checked = true;
  var canvas = createCanvas(450,450);
  canvas.parent('jsCanvas');

  //1 min value 2 max value, 3 start value, 4 step size
  zoomSlider = createSlider(-2.5, -1, -2.5, 0.1);
}

function draw(){

  delay -= 1;
  if(delay <= 0){
    updateTypeSelected();
    delay = delay_original;
    updateMandelbrotSet();
  }
}

function updateTypeSelected(){
  if(typeA.checked == true)
    typeSelected = 0;
  else if(typeB.checked == true)
    typeSelected = 1;
  else if(typeC.checked == true)
    typeSelected = 2;
  else if(typeD.checked == true)
    typeSelected = 3;
}

function updateMandelbrotSet(){
  pixelDensity(1);
  loadPixels();

  for(var x= 0; x < width; x++){
    for(var y = 0; y < height; y++){


      var a = map(x,0, width, zoomSlider.value(), -zoomSlider.value() + zoomSlider.value()/2);
      var b = map(y,0, height, zoomSlider.value(), -zoomSlider.value());


      /*
      var a = map(x,0, width, -2, 2);
      var b = map(y,0, height, -2, 2);
      */

      var ca = a;
      var cb = b;

      var max_iterations = 25;
      max_iterations = random(round(max_iterations/2),max_iterations);

      for(var i=0; i < max_iterations; i++){
        var aa = a * a - b * b;
        var bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if(abs(a + b) > 8) {
          break;
        }
      }

      if(typeSelected == 0){
        var bright = map(i, 0, max_iterations, 0, 255);
        if(i === max_iterations){
          bright = 0;
        }
        setPixels(x,y,bright,bright,bright,255);
      } else if(typeSelected == 1){
        if(typeSelected == 1){
          var bright = map(i, 0, max_iterations, 0, 255);
          if(i >= max_iterations){
            bright *= 0.5;
          }
          //bright = random(bright*0.5,bright*1.5);
          setPixels(x,y,bright,bright/4,0,255);
        }
      } else if(typeSelected == 2){
        var bright = map(i, 0, max_iterations, 0, 255);
        if(i >= max_iterations){
          setPixels(x,y,0,0,0,255);
        }
        else if(i >= max_iterations*0.7 && i<max_iterations)
        setPixels(x,y,255,255,255,255);
        else
        setPixels(x,y,0,0,random(bright/2,bright),255);
      } else if(typeSelected == 3){
        var bright = map(i,0, max_iterations,0,255);
        bright = 255 - bright;
        setPixels(x,y,bright,bright,bright,255);
      }



    }
  }

  updatePixels();
}

function setPixels(posx,posy,roj,ver,azu,tra){
  var pix = (posx + posy * width) * 4;
  pixels[pix + 0] = roj;
  pixels[pix + 1] = ver;
  pixels[pix + 2] = azu;
  pixels[pix + 3] = tra;
}
