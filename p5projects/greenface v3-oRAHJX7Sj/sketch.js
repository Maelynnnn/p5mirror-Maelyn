let video;
let faceMesh;
let faces = [];
let triangles;
let spreading = false;
let spreadRadius = 0;
let faceCenter;
let speed = 2;

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
}


function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  faceMesh.detectStart(video, gotFaces);
  triangles = faceMesh.getTriangles();
}

function draw() {
  background(0);
  video.loadPixels();

  if (faces.length > 0) {
    let face = faces[0];
    
    let leftMouth = face.keypoints[76];
    let rightMouth = face.keypoints[409];
    
    point(leftMouth.x, leftMouth.y);
    point(rightMouth.x, rightMouth.y);
    
    let d = dist(leftMouth.x, leftMouth.y, rightMouth.x,rightMouth.y);
    
    if(d >= 80 & !spreading){
      spreading = true;
      spreadRadius = 0;
    }
    
    if(d < 80 & spreading){
      spreading = false;
    }
    
    
    console.log(d)
    
    let upY = 0;
    //let upY = 1000;
    let upX = 0;
    for (let kp of face.keypoints) {
      if (kp.y >= upY){
        upY = kp.y;
        upX = kp.x;
      }
      
    }
    
    if (spreading) {
      spreadRadius += speed;
    } else {
      if (spreadRadius > 0) {
        spreadRadius = max(spreadRadius - speed, 0);
      }
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
      
      let everyD = dist(upX, upY, cx, cy);
      
      let indexPixel = (floor(cx) + floor(cy) * video.width) * 4;
      let rr = video.pixels[indexPixel];
      let gg = video.pixels[indexPixel + 1];
      let bb = video.pixels[indexPixel + 2];
      let baseColor = color(rr, gg, bb);
      
      let factor = spreadRadius > 0 ? constrain(1-dist(upX, upY, cx, cy) / spreadRadius, 0, 1) : 0;
      
      // if(frameCount % 37 == 0){
      //   console.log(factor);
      // }
      
      let finalColor = lerpColor(baseColor, color(0, 255, 0), factor);
      fill(finalColor);
      
      noStroke();
      vertex(pointA.x, pointA.y);
      vertex(pointB.x, pointB.y);
      vertex(pointC.x, pointC.y);
    }
    endShape();
  }
}
