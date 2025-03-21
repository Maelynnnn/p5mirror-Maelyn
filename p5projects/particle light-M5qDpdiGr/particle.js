//position and speed
function Particle(x, y, vx, vy) {
	//position
	this.pos = new p5.Vector(x, y);
	//speed
	this.vel = new p5.Vector(vx, vy);
	//give random speed changes?
	this.vel.mult(random(10));
	//rotate
	this.vel.rotate(radians(random(-25, 25)));
	//particles have mass
	this.mass = random(1, 20);
	//why need this??
	this.airDrag = random(0.92, 0.98);
	//color
	this.colorIndex = int(random(colorScheme.length));
	
	this.move = function() {
		this.vel.mult(this.airDrag);
		this.pos.add(this.vel);
	}
}