let mySound;
let kick;
let beat;
let x = 0;
let speed = 3;
let mic;
let level;
function preload(){
  mySound = loadSound("assets/song.mp3")
  kick = loadSound("assets/kick.mp3")
  beat = loadSound("assets/beat.mp3")
}
function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start()
}
function draw() {
  background(220);
  fill(0);
  // circle(x, height / 2, 30)
  let level = mic.getLevel();
  let h = map(level,0,1,0,height)
  circle(x, height - h, 20)
  x += speed;
  if(x >= width){
    speed = -speed;
    // beat.play();
  }
  if(x <= 0){
    speed = -speed;
    // kick.play();
  }
  // let level = mic.getLevel();
  // fill(255);
  // // textSize(20);
  // // text(level,width / 2, height / 2)
  // let h = map(level,0,1,0,height)
  // circle(x, h, 20)
  
  
}
function mousePressed(){
  if(mySound.isPlaying()==false){
//     will not overlapping the song
    mySound.play();
  // mySound.loop();
  }else{
    mySound.pause();
  }
}