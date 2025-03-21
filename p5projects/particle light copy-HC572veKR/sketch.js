/*
Magical trail shader

Author:
  Jason Labbe

Site:
  jasonlabbe3d.com

Controls:
	- Move the mouse to create particles.
	- Hold the middle mouse button to fade away particles.
	- Press the right mouse button to display the underlying particle system.
*/

// If you get an error about max uniforms then you can decrease these 2 values :(

//____________________________________________________________________________
//above is the oringinal comments from the author
//original website: https://openprocessing.org/sketch/2510377


const MAX_PARTICLE_COUNT = 70;
const MAX_TRAIL_COUNT = 30;

//setting up
var colorScheme = ["#E69F66", "#DF843A", "#D8690F", "#B1560D", "#8A430A"];
var shaded = true;
//call shader function
var theShader;

var shaderTexture;
var trail = [];
var particles = [];

function preload() {
	//use shader in this sketch
	theShader = new p5.Shader(this.renderer, vertShader, fragShader);
}

function setup() {
	//how bright it is?
	pixelDensity(1);
	
  let canvas = createCanvas(
	//full screen
		min(windowWidth, windowHeight), 
		min(windowWidth, windowHeight), 
		WEBGL);
	
	canvas.canvas.oncontextmenu = () => false;  // Removes right-click menu.

	//no mouse icon
	noCursor();
	
	//like what we did in class, create graphics
	shaderTexture = createGraphics(width, height, WEBGL);
	shaderTexture.noStroke();
}

function draw() {
	background(0);
	noStroke();
	
	// Trim end of trail.

	// this is for remove light spots?
	trail.push([mouseX, mouseY]);

	let removeCount = 1;
	if (mouseIsPressed && mouseButton == CENTER) {
		removeCount++;
	}
	
	for (let i = 0; i < removeCount; i++) {
		if (trail.length == 0) {
			break;
		}
		
		if (mouseIsPressed || trail.length > MAX_TRAIL_COUNT) {
			trail.splice(0, 1);
		}
	}
	
	// Spawn particles.
	//create particles
	if (trail.length > 1 && particles.length < MAX_PARTICLE_COUNT) {
		//mouse's direction and moving length
		let mouse = new p5.Vector(mouseX, mouseY);
		mouse.sub(pmouseX, pmouseY);
		//when moving, create new particles
		if (mouse.mag() > 10) {
			//what is normalize??
			mouse.normalize();
			particles.push(new Particle(pmouseX, pmouseY, mouse.x, mouse.y));
		}
	}
	
	translate(-width / 2, -height / 2);
	
	// Move and kill particles.
	for (let i = particles.length - 1; i > -1; i--) {
		particles[i].move();
		//what is vel.mag
		if (particles[i].vel.mag() < 0.1) {
			particles.splice(i, 1);
		}
	}
	
	if (shaded) {
		// Display shader.
		shaderTexture.shader(theShader);
		//let datas can be used by shader function
		let data = serializeSketch();
		//width and height
		theShader.setUniform("resolution", [width, height]);
		//the number of trail
		theShader.setUniform("trailCount", trail.length);
		//trail data
		theShader.setUniform("trail", data.trails);
		// the number of particles
		theShader.setUniform("particleCount", particles.length);
		//particles data
		theShader.setUniform("particles", data.particles);
		//color
		theShader.setUniform("colors", data.colors);

		shaderTexture.rect(0, 0, width, height);
		texture(shaderTexture);
		//to main canva
		rect(0, 0, width, height);
	} else {
		// Display points.
		stroke(255, 200, 0);
		for (let i = 0; i < particles.length; i++) {
			point(particles[i].pos.x, particles[i].pos.y);
		}
		
		stroke(0, 255, 255);
		for (let i = 0; i < trail.length; i++) {
			point(trail[i][0], trail[i][1]);
		}
	}
}

//press right mouse, change between shader mode and normal mode
function mousePressed() {
	if (mouseButton == RIGHT) {
		shaded = !shaded;
	}
}

function serializeSketch() {
	data = {"trails": [], "particles": [], "colors": []};
	
	for (let i = 0; i < trail.length; i++) {
		data.trails.push(
			map(trail[i][0], 0, width, 0.0, 1.0),
			map(trail[i][1], 0, height, 1.0, 0.0));
	}
	
	for (let i = 0; i < particles.length; i++) {
		data.particles.push(
			map(particles[i].pos.x, 0, width, 0.0, 1.0), 
			map(particles[i].pos.y, 0, height, 1.0, 0.0),
			//for mass and speed?
			particles[i].mass * particles[i].vel.mag() / 100)

		let itsColor = colorScheme[particles[i].colorIndex];
		data.colors.push(red(itsColor), blue(itsColor), red(itsColor));
	}
	
	return data;
}