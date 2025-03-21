let trail = [];
let particles = [];
let smoothedSpeed = 0;  // Global variable to smooth the mouse speed

function setup() {
  createCanvas(800, 600);
  background(0);
}

function draw() {
  background(0);

  // Update trail positions when the mouse moves.
  if (mouseX !== pmouseX || mouseY !== pmouseY) {
    trail.push(createVector(mouseX, mouseY));
  }
  // Limit the trail length.
  if (trail.length > 50) {
    trail.shift();
  }

  // Draw the trail as a series of glowing blue spots.
  for (let i = 0; i < trail.length; i++) {
    let pos = trail[i];
    // When there's only one point, use a default opacity.
    let alphaVal = (trail.length > 1)
      ? map(i, 0, trail.length - 1, 0, 0.6)
      : 0.6;
    drawGlowingSpot(pos.x, pos.y, 5, color(0, 0, 255), alphaVal);
  }

  // Draw the dynamic floodlight halo at the mouse.
  // When the mouse moves, the halo stretches and dims; when it stops, it gradually re-coalesces.
  drawMouseHalo(mouseX, mouseY, 20, 80);

  // Generate new particles at the mouse location.
  // Always add a blue particle.
  particles.push(new Particle(mouseX, mouseY, color(0, 0, 255)));
  // Increase frequency of orange particles (10% chance per frame).
  if (random() < 0.1) {
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

// Draws a floodlight halo that adapts to mouse motion.
// The halo stretches along the direction of movement and dims with speed,
// but re-coalesces gradually when the mouse slows/stops.
function drawMouseHalo(x, y, innerRadius, outerRadius) {
  // Compute instantaneous mouse movement.
  let dx = mouseX - pmouseX;
  let dy = mouseY - pmouseY;
  let instSpeed = sqrt(dx * dx + dy * dy);
  // Smooth the speed so that changes are gradual.
  smoothedSpeed = lerp(smoothedSpeed, instSpeed, 0.05);
  
  let angle = atan2(dy, dx);
  // Map the smoothed speed to horizontal scale (for stretching).
  let scaleX = map(smoothedSpeed, 0, 20, 1, 3, true);
  // Map the smoothed speed to intensity (faster = dimmer).
  let intensity = map(smoothedSpeed, 0, 20, 1, 0, true);

  let ctx = drawingContext;
  ctx.save();
  // Translate to mouse position.
  ctx.translate(x, y);
  // Rotate according to movement direction.
  ctx.rotate(angle);
  // Scale horizontally; when the mouse slows, scaleX will approach 1.
  ctx.scale(scaleX, 1);

  // Compute alpha values based on intensity.
  let innerAlpha = 0.8 * intensity;
  let midAlpha = 0.4 * intensity;

  // Create a radial gradient that will appear elliptical due to scaling.
  let gradient = ctx.createRadialGradient(0, 0, innerRadius, 0, 0, outerRadius);
  gradient.addColorStop(0, `rgba(0, 0, 255, ${innerAlpha})`);
  gradient.addColorStop(0.5, `rgba(0, 0, 255, ${midAlpha})`);
  gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, outerRadius, 0, TWO_PI);
  ctx.fill();
  ctx.restore();
}

// Draws a glowing spot at (x, y) using a radial gradient.
// 'radius' sets the size, 'col' is the base color, and 'alphaVal' determines brightness.
function drawGlowingSpot(x, y, radius, col, alphaVal) {
  let ctx = drawingContext;
  ctx.save();
  let r = red(col);
  let g = green(col);
  let b = blue(col);
  let gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alphaVal})`);
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, TWO_PI);
  ctx.fill();
  ctx.restore();
}

// Particle class for the dancing, firework-like spots.
class Particle {
  constructor(x, y, col) {
    this.pos = createVector(x, y);
    // Start with a random direction and speed.
    this.vel = p5.Vector.random2D().mult(random(0.5, 2));
    this.lifetime = 255;
    this.col = col;
    this.size = random(3, 7);
  }
  
  update() {
    // Add a slight random "wiggle" for a dancing effect.
    let wiggle = p5.Vector.random2D().mult(0.2);
    this.vel.add(wiggle);
    // Apply slight friction.
    this.vel.mult(0.98);
    this.pos.add(this.vel);
    // Gradually fade the particle.
    this.lifetime -= 4;
  }
  
  isDead() {
    return this.lifetime <= 0;
  }
  
  display() {
    let alphaVal = this.lifetime / 255;
    drawGlowingSpot(this.pos.x, this.pos.y, this.size * 2.5, this.col, alphaVal);
  }
}
