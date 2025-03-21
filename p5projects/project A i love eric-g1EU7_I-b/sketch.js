let x, y, size;
let angle;
let pace;
let s;

function setup() {
  createCanvas(400, 400);
  // x = [random(0, width),random(0, width),random(0, width)];
  // y = [random(0, height),random(0, height),random(0, height)];
  x = [random(0, width), random(0, width), random(0, width)];
  y = [random(0, height), random(0, height), random(0, height)];
  size = [30, 40, 20];
  angle = [];
  pace = [1, 2, 3];
}

function draw() {
  background(0);
  for (i = 0; i < 3; i += 1) {
    fishmove(i);
    push();
    translate(x[i], y[i]);
    s = sin(frameCount * 0.05)
    rotate(angle[i] / 8 * s);
    if (sin(frameCount * 0.05) < 0){
        rotate(angle[i] / 8 * -s * 2);
    }

    teridyfish(0, 0, size[i]);
    pop();
    
    if(y[i] < 0 || y[i] > height){
    push();
    translate(x[i], y[i]);
    rotate( - PI);
    pop();
    pace[i] = -pace[i];
  }
    
    
  }
}

function teridyfish(px, py, psize) {
  noStroke();
  fill(255, 230 - frameCount * (psize / 1000), 0);
  ellipse(px, py, psize * 0.28, psize * 0.6);
  ellipse(px, py + psize * 0.5, psize * 0.15, psize * 0.3);
  ellipse(px, py + psize * 0.82, psize * 0.08, psize * 0.2);
  ellipse(px, py + psize * 1.1, psize * 0.02, psize * 0.2);
  //console.log(x)
}

function fishmove(t) {
  // x[t] = x[t] + 5 * cos(frameCount * 0.05);

  let x_angle = sin(frameCount * 0.05);
  let y_angle = cos(frameCount * 0.05);

  // x[t] = 10 * sin(frameCount * 0.05);
  x[t] = x[t] + x_angle;
  y[t] -= pace[i]
  angle[t] = atan2(x_angle, y_angle)
}
