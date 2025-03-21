function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(10, 17, 40);
  rectMode(CENTER);
  
  // background_circle
  fill(255, 195, 0);
  circle(width / 2, height / 2, 350);
  
  // background_curve
  fill(255);
  beginShape();
  curveVertex(20, 70);
  curveVertex(40, 40);
  curveVertex(50,30);
  curveVertex(60,35);
  curveVertex(70,50);
  curveVertex(80,60);
  curveVertex(90,50);
  curveVertex(100,30);
  curveVertex(110,40);
  curveVertex(120,50);
  curveVertex(140,55);
  curveVertex(200,70);
  endShape(CLOSE);
  beginShape();
  curveVertex(10, 280);
  curveVertex(40, 240);
  curveVertex(50,230);
  curveVertex(60,235);
  curveVertex(70,250);
  curveVertex(80,260);
  curveVertex(90,250);
  curveVertex(100,230);
  curveVertex(110,240);
  curveVertex(120,250);
  curveVertex(130,255);
  curveVertex(200,280);
  endShape(CLOSE);
  beginShape();
  curveVertex(width - 10, 170);
  curveVertex(width - 40, 140);
  curveVertex(width - 50,130);
  curveVertex(width - 60,135);
  curveVertex(width - 70,150);
  curveVertex(width - 80,160);
  curveVertex(width - 90,150);
  curveVertex(width - 100,130);
  curveVertex(width - 110,140);
  curveVertex(width - 120,150);
  curveVertex(width - 130,155);
  curveVertex(width - 200,170);
  endShape(CLOSE);
  
  //this is the face
  fill(255, 222, 195);
  //stroke(255);
  noStroke();
  rect(width / 2, height / 2, 150,150);
  
  //eyes
  fill(0);
  rect( width / 2 - 30, height / 2 + 10, 20, 20);
  rect( width / 2 + 30, height / 2 + 10, 20, 20);
  fill(255);
  rect( width / 2 - 50, height / 2 + 10, 20, 20 );
  rect( width / 2 + 50, height / 2 + 10, 20, 20 );
  
  // mouth
  fill(255, 0, 60);
  rect( width / 2, height / 2 + 50, 40, 10);
  
  // hair
  fill (120, 0, 0);
  rect(width / 2, height / 2 - 50, 165, 75);
  fill (255, 222, 195);
  triangle(width / 2, height / 2 - 50, width / 2 - 20, height / 2 - 10, width / 2 + 20, height / 2 - 10);
  
  // hairband
  fill(0);
  rect(width / 2 + 65, height / 2 - 102, 20, 30);
  
  // ponnytail
  fill(120, 0, 0);
  rect(width / 2 + 105, height / 2 - 120, 100, 40);
  rect(width / 2 + 135, height / 2 - 50, 40, 150);
  rect(width / 2 + 150, height / 2 + 10, 70, 40);
  
  // neck
  fill(255, 222, 195);
  rect(width / 2, height / 2 + 80, 50, 20);
  
  // body
  fill(255, 222, 195);
  rect(width / 2, height / 2 + 150, 200, 120);
  
  // cloth
  fill(193, 18, 31);
  rect(width / 2 , height / 2 + 145, 140, 110);
  
  // ches
  fill(255, 222, 195);
  rect(width / 2, height / 2 + 120, 80, 60);
  
  // ears
  fill(255, 222, 195);
  rect(width / 2 - 75, height / 2 + 20, 20, 40);
  rect(width / 2 + 75, height / 2 + 20, 20, 40);
  
}