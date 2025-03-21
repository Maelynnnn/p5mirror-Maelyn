function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  // background(220);
  noFill();
  // circle (mouseX, mouseY, frameCount);
  line(pmouseX, pmouseY, mouseX, mouseY);
  if(keyIsPressed == true){
    if (keyCode == BACKSPACE){
      background(255);
      console.log('yea')
    }
    
  }
}