let trail = [];
let particles = [];

function setup() {
  createCanvas(800, 600);
  background(0);
}

function draw() {
  // Clear with a black background
  background(0);
  
  // If the mouse moved this frame, add its position to the trail array.
  if (mouseX !== pmouseX || mouseY !== pmouseY) {
    trail.push(createVector(mouseX, mouseY));
  }
  // Limit the trail length to keep it smooth.
  if (trail.length > 50) {
    trail.shift();
  }
  
  // Draw the trail.
  // Older trail points are drawn dimmer; the brightness increases toward the mouse.
  noStroke();
  for (let i = 0; i < trail.length; i++) {
    let pos = trail[i];
    // Map the index to an alpha value (0 for the oldest, 200 for the newest).
    let a = map(i, 0, trail.length - 1, 0, 200);
    fill(0, 0, 255, a);
    ellipse(pos.x, pos.y, 10);
  }
  
  // Draw the glowing blue circle (floodlight effect) at the mouse position.
  // This is done by drawing several concentric circles with decreasing opacity.
  let glowRadius = 60;
  noStroke();
  for (let r = glowRadius; r > 0; r -= 5) {
    // The smaller the circle, the higher the alpha at its center.
    let a = map(r, 0, glowRadius, 150, 0);
    fill(0, 0, 255, a);
    ellipse(mouseX, mouseY, r * 2, r * 2);
  }
  
  // Create particles that follow the mouse.
  // Always add a blue particle.
  particles.push(new Particle(mouseX, mouseY, color(0, 0, 255)));
  // Occasionally add an orange particle.
  if (random() < 0.02) {
    particles.push(new Particle(mouseX, mouseY, color(255, 165, 0)));
  }
  
  // Update and display all particles.
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

// Particle class for the small light dots.
class Particle {
  constructor(x, y, col) {
    this.pos = createVector(x, y);
    // Give the particle a slight random velocity.
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.lifetime = 255;
    this.col = col;
    this.size = random(3, 7);
  }
  
  update() {
    this.pos.add(this.vel);
    // Fade the particle.
    this.lifetime -= 4;
  }
  
  isDead() {
    return this.lifetime <= 0;
  }
  
  display() {
    noStroke();
    fill(red(this.col), green(this.col), blue(this.col), this.lifetime);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
