let x;
let y = 0;
let pace_x = 1;
let pace_y = 1;
function setup() {
  createCanvas(500, 500);
  x = width - 100;
}

function draw() {
  background(220);
  noStroke();
  fill(56, 176, 0);
  ellipse(x,y,50,100);
  fill(0, 100, 0);
  rect(x-2, y-50, 5, 100);
  // rotate(PI / 3.0)
  beginShape();
  vertex(x-20, y-25);
  vertex(x-20, y-30);
  vertex(x,y);
  vertex(x, y+3);
  endShape();
  beginShape();
  vertex(x-25, y+5);
  vertex(x-25, y);
  vertex(x,y+30);
  vertex(x, y+33);
  endShape();
  x -= pace_x;
  y += pace_y;
  if(x == 150 || x == width - 150 || x == 240 || x == width - 240){
    if(pace_x > 0){
      pace_x += 1;
    }
    if(pace_x < 0){
      pace_x -= 1;
    }
  }
  if(pace_x > 0 & x == 140){
    pace_x -= 1
  }
  if(pace_x < 0 & x == width - 140){
    pace_x += 1
  }
  if(x < 100 & pace_x > 0){
    pace_x = -1;
    }
  if(x > width - 100 & pace_x < 0){
    pace_x = 1;
  }
  if(y > height+100){
    y = -100
  }
}