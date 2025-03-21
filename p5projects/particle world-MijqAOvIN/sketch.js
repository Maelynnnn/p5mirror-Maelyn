let NUM_OF_PARTICLES = 3;
let particles = [];

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(50);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
    p.checkBounds();
  }
}

class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.butterflyX = [];
    this.butterflyY = [];
    this.butterflySize = [];
    this.bfclr = [];
    this.bgclr = 167;
    this.bgchange = 1;
    this.butterflySpeed = 20;

    for (let i = 0; i < 800; i++) {
      this.butterflyX[i] = random(width);
      this.butterflyY[i] = random(height);
      this.butterflySize[i] = random(20, 50);
      this.bfclr[i] = random(0, 255);
    }
  }

  update() {
    this.bgclr -= this.bgchange;
    if (this.bgclr > 250 || this.bgclr < 100) {
      this.bgchange = -this.bgchange;
    }

    for (let k = 0; k < this.butterflyX.length; k += 1) {
      let noiseX = noise(k, frameCount * 0.01);
      let noiseY = noise(k + 1000, frameCount * 0.01);
      
      let butterflySpeedX = map(noiseX, 0, 1, -this.butterflySpeed, this.butterflySpeed);
      let butterflySpeedY = map(noiseY, 0, 1, -this.butterflySpeed, this.butterflySpeed);
      
      this.butterflyX[k] += 0.1 * butterflySpeedX;
      this.butterflyY[k] += 0.1 * butterflySpeedY;
      
      let d = dist(this.butterflyX[k], this.butterflyY[k], mouseX, mouseY);
      if (d < 100) {
        this.butterflyX[k] += random(-this.butterflySpeed, this.butterflySpeed);
        this.butterflyY[k] += random(-this.butterflySpeed, this.butterflySpeed);
        this.butterflySize[k] +=
          0.1 * random(-this.butterflySpeed, this.butterflySpeed);
        this.bfclr[k] -= 10 * random(-this.butterflySpeed, this.butterflySpeed);
      }
    }
  }

  display() {
    background(this.bgclr, 201, 7);
    push();
    // translate(this.x, this.y);

    for (let j = 0; j < this.butterflyX.length; j++) {
      this.drawButterfly(
        this.butterflyX[j],
        this.butterflyY[j],
        this.butterflySize[j],
        this.bfclr[j]
      );
    }

    pop();
  }
  checkBounds() {
  for (let m = this.butterflyX.length - 1; m >= 0; m-=1) {
    if (
      this.butterflyX[m] < 0 ||
      this.butterflyX[m] > width ||
      this.butterflyY[m] < 0 ||
      this.butterflyY[m] > height
    ) {
      this.butterflyX.splice(m, 1);
      this.butterflyY.splice(m, 1);
      this.butterflySize.splice(m, 1);
      this.bfclr.splice(m, 1);
    }
  }
}

  drawButterfly(x, y, butterflySize, bfclr) {
    noStroke();
    fill(bfclr, 160, 200, 180);

    push();
    translate(x, y);
    rotate(PI / 4);
    ellipse(0, 0, butterflySize, butterflySize / 2);
    pop();

    push();
    translate(x + butterflySize / 1.3, y);
    rotate(-PI / 4);
    ellipse(0, 0, butterflySize, butterflySize / 2);
    pop();

    push();
    translate(x + butterflySize / 8, y + butterflySize / 2);
    rotate((PI * 3) / 5);
    ellipse(0, 0, butterflySize, butterflySize / 2);
    pop();

    push();
    translate(x + butterflySize / 1.5, y + butterflySize / 2);
    rotate((-PI * 3) / 5);
    ellipse(0, 0, butterflySize, butterflySize / 2);
    pop();

    ellipse(
      x + butterflySize / 2.5,
      y + butterflySize / 3.5,
      butterflySize / 4,
      butterflySize / 1.2
    );
  }
}
