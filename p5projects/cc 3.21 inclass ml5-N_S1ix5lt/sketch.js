let beauty;
let classifier;
let label = 'hi';

function preload(){

  beauty = loadImage("beauty.png");

  classifier = ml5.imageClassifier("MobileNet");
}

function setup() {
  createCanvas(400, 400);
  classifier.classify(beauty, gotResults );
}

function gotResults(results){
  console.log(results);
  label = results[0].label;
}

function draw() {
  background(248, 150, 30);
  image(beauty, 10, 0);
  textAlign(CENTER, CENTER);
  textSize(30);
  text(label, width - 50, 50)
}
