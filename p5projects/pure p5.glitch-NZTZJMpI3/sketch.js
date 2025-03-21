let glitch;
let startTime;

function setup() {
    loadImage('test.png', function(im){
        let popupContent = document.getElementById("popup-content"); 
        let canvas = createCanvas(im.width, im.height);
        // canvas.parent("popup-content"); 
        background(0);
        imageMode(CENTER);

        glitch = new Glitch();
        glitch.loadImage(im);

        startTime = millis();
    });
}

function draw() {
    if (millis() >= startTime) {
        glitch.resetBytes(100);
        glitch.replaceBytes(200, 104);
        glitch.randomBytes(100);
        glitch.buildImage();
    }

    filter(POSTERIZE, 100);
    image(glitch.image, width/2, height/2);
}