let cloudx = 220
let cloudx1 = 70
let cloudx2 = 300
function setup() {
  createCanvas(400, 400);
}

function cloud() {
  let cloudx = 220
  let cloudx1 = 70
  let cloudx2 = 300
  drawCloud(cloudx, height * 0.5 - 50, 200, 100);
  drawCloud(cloudx1, height * 0.5, 200, 100);
  drawCloud(cloudx2, height * 0.5 -70, 200, 100);
  cloudx += 1
  cloudx1 += 1.5
  cloudx2 += 2.5
  if(cloudx > width + 100){
    cloudx = -100
  }
  if(cloudx1 > width + 100){
    cloudx1 = -100
  }
  if(cloudx2 > width + 100){
    cloudx2 = -100
  }
}


function drawCloud(x, y, w, h) {

  noStroke();
  fill(255);
  
  beginShape();
  curveVertex(x - w / 2, y);
  curveVertex(x - w / 4, y - h / 2);
  curveVertex(x, y - h);
  curveVertex(x + w / 4, y - h / 2);
  curveVertex(x + w / 2, y);
  endShape();beginShape();
  curveVertex(x+50 - w / 2, y-25);
  curveVertex(x+50 - w / 4, y-25 - h / 4);
  curveVertex(x+50, y-25 - h/2);
  curveVertex(x+50 + w / 4, y-25 - h / 4);
  curveVertex(x+50 + w / 2, y-25);
  endShape();
}