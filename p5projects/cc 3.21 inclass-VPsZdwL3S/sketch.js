let sound;
let soundPlayed = false;
let scaleSpeed= 0.005;
let scaleNumb = 0;

let classifier;

function preload(){
  sound = loadSound("only you.MP3");
  beauty = loadImage("beauty.png");
  shuai = loadImage("shuai.png");
  heart = loadImage("heart.png");
  classifier = ml5.imageClassifier("MobileNet");
}

function setup() {
  createCanvas(800, 400);
  classifier.classify(shuai, gotResults );
}

function gotResults(results){
  console.log(results);
}

function draw() {
  background(248, 150, 30);
  push();
  pop();
  if(mouseX < 400){
    //fill(255,0,0);
    push();
    translate(400,200);
    imageMode(CENTER);
    scale(scaleNumb);
    image(heart, 0,0);
    scaleNumb += scaleSpeed;
    pop();
    
    if(soundPlayed == false){
      sound.play();
      soundPlayed = true;
    }
  }else{
    //fill(255);
    soundPlayed = false;
    sound.stop();
    scaleNumb = 0;
  }
  
  //circle(mouseX,mouseY,100);
  image(shuai, mouseX - 100, mouseY - 100);
  
  image(beauty, 0, 0);
}
function mousePressed(){
  sound.play();
  //sound.loop();
}
