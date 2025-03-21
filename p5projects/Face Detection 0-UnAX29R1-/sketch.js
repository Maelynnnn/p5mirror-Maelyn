// // Starting code from Kyle McDonald https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
// Note CLMTracker library added in HTML

// Q: Can you add code that asks you to center face in screen?

let cloud;
var capture;
var tracker
var w = 640,
    h = 480;

function setup() {
  //Creates a new HTML5 <video> element that contains the audio/video feed from a webcam.
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    colorMode(HSB);
//clm is a different library
    tracker = new clm.tracker();
  //init = initialize
    tracker.init();
  // this starts the capture
    tracker.start(capture.elt);
}

function draw() {
    image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();

  
    noFill();
    stroke(255);
  //creates line shape around the face
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
  //ends line shape around the face
    endShape();

    noStroke();
  // for loop puts together the line shape, points and numbers on face detection
    for (var i = 0; i < positions.length; i++) {
      //changes the color over time, "50, 100") rgb, "0-300" controls the hue
       fill(map(i, 0, positions.length, 0, 360), 50, 100);
      //creates points in line on face shape
      
        ellipse(positions[60][0], positions[60][1], 4, 4);
      // creates the numbers around the shape of face
       text(i, positions[60][0], positions[60][1]);
      
      ellipse(positions[57][0], positions[57][1], 4, 4);
      // creates the numbers around the shape of face
       text(i, positions[57][0], positions[57][1]);
    }

  // estimate smiling amount through distance of corners of mouth
  //this code says if there is a face there, do something.
    if (positions.length > 0) {
      // [44] and [50] ;ocated on conrner of mouth. Created vector to detect mouth movement.
        var mouthLeft = createVector(positions[60][0], positions[60][1]);
        var mouthRight = createVector(positions[57][0], positions[57][1]);
        var smile = mouthLeft.dist(mouthRight);
      
        // line shows a bar showing smiling amount
        rect(20, 20, smile * 3, 20);
// ^^^drawn here so as not to take up computer memory in the global scope.
        // uncomment for a surprise
        // noStroke();
        // fill(0, 255, 255);
        // ellipse(positions[62][0], positions[62][1], 50, 50);
    }
}

class Cloud {
//constructor is like the setup
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.s = 100;
  }
  //what the cloud will do
  show() {
    push();
    translate(this.x, this.y);
    noStroke();
    circle(0, 0, this.s);
    //circles around the body
    for (let a = 0; a < 2 * PI; a += PI / 6) {
      push();
      rotate(a);
      circle(this.s * 0.5, this.s * 0.3, this.s * 0.5);
      pop();
    }
    
    //face
    fill(0);
    circle(-this.s * 0.3, 0, this.s * 0.05);
    circle(this.s * 0.3, 0, this.s * 0.05);
    arc(0, 0, this.s * 0.3, this.s * 0.3, 0, PI);
    pop();
  }

  move() {
    this.y = noise(frameCount*0.01)*height;
  }
}


