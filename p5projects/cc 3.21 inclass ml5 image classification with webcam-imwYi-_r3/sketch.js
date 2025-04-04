let beauty;
let classifier;
let label = 'hi';

function preload(){

  //beauty = loadImage("beauty.png");
  beauty = createCapture(VIDEO, { flipped : true});

  classifier = ml5.imageClassifier("MobileNet");
}

function setup() {
  createCanvas(600, 400);
  classifier.classifyStart(beauty, gotResults );
  beauty.hide();
}

function gotResults(results){
  //console.log(results);
  label = results[0].label;
}

function draw() {
  background(248, 150, 30);
  image(beauty, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(30);
  text(label, width/2, 50)
}
