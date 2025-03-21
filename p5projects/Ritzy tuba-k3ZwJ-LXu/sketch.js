let rain_x = [];
let rain_y = [];
let rain_speed = [];
let rain_size = [];
let add_speed;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(249, 199, 79);
  draw_rain();
}

function draw_rain(){
  let newRainX = random(0, width);
  let newRainY = random(-20, 0);
  let newRainSize = random(2, 30);
  let newRainSpeed = map(newRainSize, 2, 30, 2, 8);
  
  rain_x.push(newRainX);
  rain_y.push(newRainY);
  rain_size.push(newRainSize);
  rain_speed.push(newRainSpeed);
  
  add_speed = map(mouseY, 0, height, 0, 10);

  for (let i = 0; i < rain_x.length; i++){
    rain_y[i] += rain_speed[i] + add_speed;
    noStroke();
    fill(39, 125, 161);
    circle(rain_x[i], rain_y[i], rain_size[i]);
  }
}
