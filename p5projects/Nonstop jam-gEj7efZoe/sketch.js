let cloud;
let cloud1;
function setup() {
  createCanvas(400, 400);
  cloud = new Cloud(width / 2, height / 2, 100);
  cloud1 = new Cloud(random(width), random(height), 50);
}

function draw() {
  background(220);
  cloud.show();
  cloud.move();
  cloud1.show();
  cloud1.move();
}

class Cloud {
  // this is like my previous setup defining the initial values
  constructor(u, v, s) {
    this.x = u;
    this.y = v;
    this.s = s;
    this.speed = random(0.005,0.01)
    this.cloudColor = random(0,200)
  }

  show() {
    noStroke();
    fill(this.cloudColor);
    circle(this.x, this.y, this.s);
    for (let angle = 0; angle < PI * 2; angle += PI / 6) {
      push();
      translate(this.x, this.y);
      rotate(angle);
      circle(this.s * 0.5, 0, this.s * 0.5);
      pop();
    }
    // face
    fill(0);
    circle(this.x - this.s * 0.3, this.y, this.s * 0.05);
    circle(this.x + this.s * 0.3, this.y, this.s * 0.05);
    arc(this.x, this.y, this.s * 0.3, this.s * 0.34, 0, PI);
  }

  move() {
    this.y = noise(frameCount * this.speed) * height;
  }
  
}
