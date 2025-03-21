//declare!
let x;
let pace = 5
function setup() {
  createCanvas(400, 400);
  //assign value
  x = width/2;
}

function draw() {
  background(220, 50);
  rectMode(CENTER);
  //use!
  fill(random(100),random(100),0)
  rect(x, height/2 , 100, 100);
  //update
  x = x + mouseY * 0.01;
  if(x > width){
    x = 0
  }
 }
