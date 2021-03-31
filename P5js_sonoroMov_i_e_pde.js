//====================================================//
/*
Based on code from beginContour() reference
 https://p5js.org/reference/#/p5/beginContour
 */
/*
 Alterado por Rodrigo Rezende em 08/2020
 para servir de base na obra SonoroMov(i)e V1.0
 */
//====================================================//

//========================================================================================
//========================================================================================

let px, py = 0;

let Npress, press, n = 0;

let l3, c3, l2, c2, l1, c1 = 0;
let qy8, qx8, qy7, qx7, qy6, qx6, qy5, qx5, qy4, qx4, qy3, qx3, qy2, qx2, qy1, qx1, qy0, qx0 =0;
let l3N, c3N, l2N, c2N, l1N, c1N = 0;

let cImgFx =0;

let revealSizeX = 0;
let revealSizeY = 0;
let img;
//*******************************************************************************************
// A sound file object
let song0;
let song1;
let song2;
let song3;
let song4;
let song5;
let song6;
let song7;
let song8;

let count;
//*******************************************************************************************

//========================================================================================
//========================================================================================

function preload() {
  img = loadImage('img/img.jpg');
  //*******************************************************************************************
  // Load a sound file
  song0= loadSound('data/1.mp3');
  song1= loadSound('data/2.mp3');
  song2= loadSound('data/3.mp3');
  song3= loadSound('data/4.mp3');
  song4= loadSound('data/5.mp3');
  song5= loadSound('data/6.mp3');
  song6= loadSound('data/7.mp3');
  song7= loadSound('data/8.mp3');
  song8= loadSound('data/9.mp3');
  //*******************************************************************************************
}

//========================================================================================
//========================================================================================

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  c1 = (windowWidth/3);    // and dimensions
  l1 = (windowHeight/3);
  c2 = (windowWidth/3);    // and dimensions
  l2 = (windowHeight/3);
  c3 = (windowWidth/3);    // and dimensions
  l3 = (windowHeight/3);

  c1N = c1;
  l1N = l1;
  c2N = c2;
  l2N = l2;
  c3N = c3;
  l3N = l3;

  upPosi();

  //*******************************************************************************************
  let seedSeed = int(millis()*10000);
  randomSeed(seedSeed);
  //print(seedSeed);

  var load0 = song0.isLoaded();
  var load1 = song1.isLoaded();
  var load2 = song2.isLoaded();
  var load3 = song3.isLoaded();
  var load4 = song4.isLoaded();
  var load5 = song5.isLoaded();
  var load6 = song6.isLoaded();
  var load7 = song7.isLoaded();
  var load8 = song8.isLoaded();

  print("load0 "+load0);
  print("load1 "+load1);
  print("load2 "+load2);
  print("load3 "+load3);
  print("load4 "+load4);
  print("load5 "+load5);
  print("load6 "+load6);
  print("load7 "+load7);
  print("load8 "+load8);

  count = 0;
  //*******************************************************************************************
}

//========================================================================================
//========================================================================================

function draw() {
  image(img, 0, 0, windowWidth, windowHeight);
  revealSizeX = windowWidth/12;
  revealSizeY = windowHeight/12;
  strokeWeight(0);
  fill(0);
  // update point to mouse coordinates
  px = mouseX;
  py = mouseY;
  translate(px, py);
  //*******************************************************************************************
  push();
  stroke(0);
  fill(51, 100);
  ellipse(px, 100, 48, 48);
  stroke(0);
  fill(51, 100);
  ellipse(100, py, 48, 48);
  pop();
  //*******************************************************************************************
  beginShape();
  // Exterior part of shape, clockwise winding
  vertex(-windowWidth, -windowHeight);
  vertex(windowWidth, -windowHeight);
  vertex(windowWidth, windowHeight);
  vertex(-windowWidth, windowHeight);
  // Interior part of shape, counter-clockwise winding
  beginContour();
  vertex(-revealSizeX, -revealSizeY);
  vertex(-revealSizeX, revealSizeY);
  vertex(revealSizeX, revealSizeY);
  vertex(revealSizeX, -revealSizeY);
  endContour();
  endShape(CLOSE);

  press=Npress;

  upPosi();

  //check for collision
  //if hit, change rectangle color

  colidPinta(px, py, qx0, qy0, c1, l1, 0);//q0
  colidPinta(px, py, qx1, qy1, c2, l1, 1);//q1
  colidPinta(px, py, qx2, qy2, c3, l1, 2);//q2
  colidPinta(px, py, qx3, qy3, c1, l2, 3);//q3
  colidPinta(px, py, qx4, qy4, c2, l2, 4);//q4
  colidPinta(px, py, qx5, qy5, c3, l2, 5);//q5
  colidPinta(px, py, qx6, qy6, c1, l3, 6);//q6
  colidPinta(px, py, qx7, qy7, c2, l3, 7);//q7
  colidPinta(px, py, qx8, qy8, c3, l3, 8);//q8

  // draw the point
  //strokeWeight(5);
  //stroke(127);
  //point(pmx, pmy);

  c1 = c1N;
  l1 = l1N;
  c2 = c2N;
  l2 = l2N;
  c3 = c3N;
  l3 = l3N;

  if (press == Npress) {
    imgFx(cImgFx);
  } else {
    cImgFx = int(random(0, 6));
    //print(cImgFx);
    mudaTot();
    //*******************************************************************************************
    count += 1;
    print(count + '========================');
    //count = int(random(0, 90));
    count = count %9;
    //*******************************************************************************************
  }
  if (mouseIsPressed) {
    mudaTot();
  }
  //*******************************************************************************************
  //print(count + '========================');
  soundFx(count);
  //*******************************************************************************************
}

//========================================================================================
//========================================================================================

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//========================================================================================
//========================================================================================

function  colidPinta(px, py, rx, ry, rw, rh, n) {
  // is the point inside the rectangle's bounds?
  if (px >= rx &&        // right of the left edge AND
    px <= rx + rw &&   // left of the right edge AND
    py >= ry &&        // below the top AND
    py <= ry + rh) {   // above the bottom
    // muda cor
    //fill(255, 150, 0);
    Npress=n;
  } else {
    //fill(0, 150, 255);
  }
  // desenha rectangulo
  //rect(rx, ry, rw, rh); //desenha retangulo
}

//========================================================================================
//========================================================================================

function  upPosi() {
  qx0 = 0;    // square position
  qy0 = 0;
  qx1 = c1;    // square position
  qy1 = 0;
  qx2 = c1+c2;    // square position
  qy2 = 0;
  qx3 = 0;    // square position
  qy3 = l1;
  qx4 = c1;    // square position
  qy4 = l1;
  qx5 = c1+c2;    // square position
  qy5 = l1;
  qx6 = 0;    // square position
  qy6 = l1+l2;
  qx7 = c1;    // square position
  qy7 = l1+l2;
  qx8 = c1+c2;    // square position
  qy8 = l1+l2;
}

//========================================================================================
//========================================================================================

//mouse press muda tamanho retangulo
//function  mousePressed() {
//  mudaTot();
//}

//========================================================================================
//========================================================================================

function  mudaTot() {
  //c columas //l linhas
  c1N = random((windowWidth/6), (windowWidth/2));
  c2N = random(c1N, (windowWidth/3));
  c3N = windowWidth - c2N;
  l1N = random((windowHeight/6), (windowHeight/2));
  l2N = random(l1N, (windowHeight/3));
  l3N = windowHeight - l2N;
}

//========================================================================================
//========================================================================================

function imgFx(imgFx) {

  switch(imgFx) {
  case 0: 
    filter(THRESHOLD, map(px, 0, windowWidth, 0.10, 0.75));
    break;
    //======================================================= 
  case 1:
    filter(GRAY);
    break;
    //======================================================= 
  case 2:
    filter(INVERT);
    break;
    //======================================================= 
  case 3:
    filter(POSTERIZE, map(px, 0, windowHeight, 2, 10));
    break;
    //======================================================= 
  case 4:
    filter(BLUR, map(py, 0, windowHeight, 1.5, 3));
    break;
    //======================================================= 
  case 5:
    filter(ERODE);
    break;
    //======================================================= 
  case 6:
    filter(DILATE);
    break;
  case 7:
    tint(0, 76, 102);
    break;
    //======================================================= 
  case 8:
    tint(76, 102, 0);
    break;
  case 9:
    tint(0, 102, 76);
    break;
    //=======================================================
  }
}

function soundFx(sndFx) {

  let minVolume = 0;
  let maxVolume = 1;
  let minSpeed = 0.1;
  let maxSpeed = 4;

  let _volume = 0.4;
  let _speed =0.85;


  switch(sndFx) {
  case 0: 
    _volume = volumeCtr(minVolume, maxVolume);
    _speed = speedCtr(minSpeed, maxSpeed);

    if (!song0.isPlaying()) {
      song0.play(0, _speed, _volume);
      //print(_volume + '\t' +'x' + '\t' + _speed);
    }
    break;
    //=========================
  case 1:
    _volume = volumeCtr(minVolume, maxVolume);
    _speed = speedCtr(minSpeed, maxSpeed);

    if (!song1.isPlaying()) {
      song1.play(0, _speed, _volume);
    }
    break;
    //=========================
  case 2:
    _volume = volumeCtr(minVolume, maxVolume);
    _speed = speedCtr(minSpeed, maxSpeed);

    if (!song2.isPlaying()) {
      song2.play(0, _speed, _volume);
    }
    break;
    //=========================
  case 3:
    _volume = volumeCtr(minVolume, maxVolume);
    _speed = speedCtr(minSpeed, maxSpeed);

    if (!song3.isPlaying()) {
      song3.play(0, _speed, _volume);
    }
    break;
    //=========================
  case 4:
    _volume = volumeCtr(minVolume, maxVolume);
    _speed = speedCtr(minSpeed, maxSpeed);

    if (!song4.isPlaying()) {
      song4.play(0, _speed, _volume);
    }
    break;
    //=========================
  case 5:
    _volume = volumeCtr(minVolume, maxVolume);
    _speed = speedCtr(minSpeed, maxSpeed);

    if (!song5.isPlaying()) {
      song5.play(0, _speed, _volume);
    }
    break;
    //=========================
  case 6:
    _volume = volumeCtr(minVolume, maxVolume);
    _speed = speedCtr(minSpeed, maxSpeed);

    if (!song6.isPlaying()) {
      song6.play(0, _speed, _volume);
    }
    break;
    //=========================
  case 7:
    _volume = volumeCtr(minVolume, maxVolume);
    _speed = speedCtr(minSpeed, maxSpeed);

    if (!song7.isPlaying()) {
      song7.play(0, _speed, _volume);
    }
    break;
    //=========================
  case 8:
    _volume = volumeCtr(minVolume, maxVolume);
    _speed = speedCtr(minSpeed, maxSpeed);

    if (!song8.isPlaying()) {
      song8.play(0, _speed, _volume);
    }
    break;
    //=========================
  }
}

function volumeCtr(minVol_, maxVol_) {
  let volume_ = map(mouseX, 0, width, minVol_, maxVol_);
  volume_ = constrain(volume_, minVol_, maxVol_);
  return volume_;
}

function speedCtr(minSpd_, maxSpd_) {
  let speed_ = map(mouseY, 0, height, minSpd_, maxSpd_);
  speed_ = constrain(speed_, minSpd_, maxSpd_);
  return speed_;
}
