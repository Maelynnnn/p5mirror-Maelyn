let video;
let faceMesh;
let faces = [];
let triangles;
let spreading = false;
let spreadRadius = 200;
let faceCenter;
let smile = 70;
let speed = 1.5;

var inc = 0.1;
var scl = 20;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;

let flameH;
let flameAlpha = 0;


function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
  mirror= loadImage("mirror.png");
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(500,700);
  flame_h = height;
  mirrorLayer = createGraphics(width, height);
  mirrorLayer.image(mirror, 0, 0);
  bgLayer = createGraphics(width, height);
  flameLayer = createGraphics(width, height);
  
  
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  faceMesh.detectStart(video, gotFaces);
  triangles = faceMesh.getTriangles();
  
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 600; i++) {
    particles[i] = new Particle();
  }
  
}

function draw() {
  video.loadPixels();
  
  bgLayer.background(0);
  image(bgLayer, 0, 0);

  // flame(flameLayer);
  // image(flameLayer, 0, 0);
  
  if (faces.length > 0) {
    let face = faces[0];
    
    let sumX = 0, sumY = 0;
    for (let kp of face.keypoints) {
      sumX += kp.x;
      sumY += kp.y;
    }
    faceCenter = createVector(sumX / face.keypoints.length, sumY / face.keypoints.length);
    
    let leftMouth = face.keypoints[76];
    let rightMouth = face.keypoints[409];
    let d = dist(leftMouth.x, leftMouth.y, rightMouth.x, rightMouth.y);
    console.log(d)
    
    let maxD = 0;
    for (let kp of face.keypoints) {
      let curD = dist(kp.x, kp.y, faceCenter.x, faceCenter.y);
      if (curD > maxD) {
        maxD = curD + 150;
        //spreadRadius = maxD;
      }
    }
    

    if (d >= smile && !spreading) {
      spreading = true;
      spreadRadius = maxD;
    }
    if (d < smile && spreading) {
      spreading = false;
    }
    

    if (spreading) {
      spreadRadius = max(spreadRadius - speed, 0);
    } else {
      spreadRadius = min(spreadRadius + speed, maxD);
      flameH = height - 150;
    }
    
    randomSeed(5);
    beginShape(TRIANGLES);
    for (let i = 0; i < triangles.length; i++) {
      let tri = triangles[i];
      let [a, b, c] = tri;
      let pointA = face.keypoints[a];
      let pointB = face.keypoints[b];
      let pointC = face.keypoints[c];

      let cx = (pointA.x + pointB.x + pointC.x) / 3;
      let cy = (pointA.y + pointB.y + pointC.y) / 3;

      let indexPixel = (floor(cx) + floor(cy) * video.width) * 4;
      let rr = video.pixels[indexPixel];
      let gg = video.pixels[indexPixel + 1];
      let bb = video.pixels[indexPixel + 2];
      let baseColor = color(rr, gg, bb);

      let everyD = dist(faceCenter.x, faceCenter.y, cx, cy) + 50;
      let factor = map(everyD, spreadRadius, maxD, 0, 2, true);

      let finalColor = lerpColor(baseColor, color(0, 200, 0), factor);
      fill(finalColor); 
      
      noStroke();
      vertex(pointA.x, pointA.y);
      vertex(pointB.x, pointB.y);
      vertex(pointC.x, pointC.y);
    }
    
    if (spreading) {
      flame(flameLayer);
      tint(255, flameAlpha);
      image(flameLayer, 0, flameH);
      if(flameH > 0){
        flameH -= 6;
        flameAlpha += 1.5;
      }
      noTint();
    } else {
      flameAlpha = 0;
    }
    
    endShape();
  }
  
  image(mirrorLayer,0,0);
}

function flame(pg) {
  pg.fill(0, 10);
  pg.noStroke();
  pg.rect(0, 0, pg.width, pg.height);
  
  pg.push();
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * -PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      pg.stroke(0, 50);

    }
    yoff += inc;
    zoff += 0.0003;
  }
  
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show(pg);
  }
  pg.pop();
}

