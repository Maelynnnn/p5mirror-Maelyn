function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  let x = 0;
  let y = height / 2;
  let d = 100;

  
  for(let j = 0; j < height; j += 1){
    //circle(width / 2 + 100 * sin(j), height / 2 + 100 * cos(j),50);
    let x = j / 50 + frameCount / 50;
    let y = sin(x);
    //circle(x, y, d);
    let r = map(sin(x), -1, 1, 0, 255);
    let g = map(sin(x + 1+ frameCount / 50), -1, 1, 0, 255);
    let b = map(sin(x + 2), -1, 1, 0, 255);
    fill(r, g, b);
    noStroke();
    
    let circle_x = j;
    let circle_y = map(y, -1, 1, 300, 100);
    circle(circle_x, circle_y, d);
    
  }
}