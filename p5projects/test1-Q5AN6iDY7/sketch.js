let vid;
let cam;

function preload(){
  vid = createVideo('BWglitch.mp4')
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  // canvas.parent("p5-container")
  // Mycamera();
  vid.loop();
  vid.hide();
}

function draw() {
  image(vid, 0, 0, windowWidth, windowHeight);
  textFont("Jersey 25");
  word(windowWidth / 2, windowHeight / 4 );
}

function word(x, y){
  fill(255);
  textSize(windowWidth / 15);
  textAlign(CENTER);
  let insx = random(x -1.5,x  + 1.5)
  let insy = random(y - 1, y + 1)
  text('Which one is an Alternate?',insx, insy);

}

function Mycamera(){
  cam = createCapture(VIDEO);
  cam.hide();
  cam.loadPixels();
  cam.updatePixels();
}