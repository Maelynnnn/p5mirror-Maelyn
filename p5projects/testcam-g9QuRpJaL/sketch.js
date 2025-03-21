let vid;
let cam;
let timecount = 200;
let fx = 0;
let scaleFactor = 1.0;

function preload(){
  vid = createVideo('BWglitch.mp4')
  pic = loadImage('faceNob.png');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  // canvas.parent("p5-container")
  vid.loop();
  vid.hide();
  cam = createCapture(VIDEO);
  // cam.size(640, 480);
  cam.hide();
  img = createImage(640, 480);

}

function draw() {
  image(vid, 0, 0, windowWidth, windowHeight);
  textFont("Jersey 25");
  // word(windowWidth / 2, windowHeight / 4 );
  CAM();
  facemove();
}

function word(x, y){
  fill(255);
  textSize(windowWidth / 15);
  textAlign(CENTER);
  let insx = random(x -1.5,x  + 1.5)
  let insy = random(y - 1, y + 1)
  text('Which one is an Alternate?',insx, insy);

}


function CAM(){
  push();
  imageMode(CENTER);
  image(cam,windowWidth / 2, windowHeight / 2,windowWidth / 2, windowHeight / 2)
  pop();
  background(0);

  cam.loadPixels();
  img.loadPixels();
  for (let y = 0; y < cam.height; y++) {
    for (let x = 0; x < cam.width; x++) {
      let index = (x + y * cam.width) * 4;
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 4;
      
      if (avg > 100) {
        img.pixels[index + 0] = 255;
        img.pixels[index + 1] = 255;
        img.pixels[index + 2] = 255;
        img.pixels[index + 3] = 255;
      } else {
        img.pixels[index + 0] = 0;
        img.pixels[index + 1] = 0;
        img.pixels[index + 2] = 0;
        img.pixels[index + 3] = 255;
      }
    }
  }
  img.updatePixels();
  push();
  imageMode(CENTER);
  image(img, windowWidth / 2, windowHeight / 2, windowWidth / 1.7, windowHeight / 2);
  pop();
}

function facemove(){
  timecount -= 1;
  if(timecount < 0){
    push();
    translate(windowWidth / 2 + fx, windowHeight / 4);
    scale(scaleFactor);
    image(pic, 0, 0, pic.width / 5, pic.height / 5);
    pop();

    fx -= 10;
    if (fx < -80) {
      fx = -80;
      scaleFactor += 0.1;
      if(scaleFactor >= 2){
        scaleFactor = 2
      }
    }
  }
}