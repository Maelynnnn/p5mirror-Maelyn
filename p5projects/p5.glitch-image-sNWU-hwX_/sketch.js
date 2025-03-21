let glitch;
let startTime;

function setup() {
    loadImage('highre.png', function(im){
        let popupContent = document.getElementById("popup-content"); 
        let canvas = createCanvas(im.width, im.height);
        // canvas.parent("popup-content"); 
        background(0);
        imageMode(CENTER);

        glitch = new Glitch();
        glitch.loadImage(im);

        startTime = millis() + 5000;
    });
}

function draw() {
    // console.log("haha");
    if (millis() >= startTime) {
        glitch.resetBytes();
        glitch.replaceBytes(150, 104);
        glitch.randomBytes(1);
        glitch.buildImage();
    }

    image(glitch.image, width/2, height/2);
}