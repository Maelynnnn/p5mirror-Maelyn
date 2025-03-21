let libs = ["includes/libs/p5.glitch.js"];

let glitch, capture, w = 320, h = 240;

function setup() {
	capture = createCapture(VIDEO);
	capture.size(w, h);
	capture.hide();

	createCanvas(320, 240);

	background(0);
	imageMode(CENTER);

	glitch = new Glitch();
	glitch.pixelate(1);
}

function draw() {
	if(frameCount % 3 === 0) {
		
		if(!mouseIsPressed){
			glitch.loadImage(capture);
		}
		
		// map mouseX to # of randomBytes() + mouseY to limitBytes()
		glitch.limitBytes(random(1));
		glitch.randomBytes(random(100));
		glitch.buildImage();
	}
	
	image(glitch.image, width / 2, height / 2, glitch.width, glitch.height)
}

/* CUSTOM FUNCTIONS FOR P5LIVE */
// keep fullscreen if window resized
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

// custom ease function
function ease(iVal, oVal, eVal){
	return oVal += (iVal - oVal) * eVal;
}

// processing compatibility
function println(msg){
	print(msg);
}