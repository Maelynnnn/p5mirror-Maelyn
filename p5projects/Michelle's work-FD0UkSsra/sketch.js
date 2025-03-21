let   x = 100
let   y = 600
let   pace = 20
function setup() {
  createCanvas(500, 500);

}

function draw() {
  background(254, 253, 246);
  //body
  fill(209, 239, 251)
  ellipse(80, 280, 400, 200)
  //arm
  fill(182, 229, 249)
  ellipse(80, 350, 400, 200)
  //floor
  fill(46, 81, 51)
  rect(0, 325, 1500, 200);
  //flowers'
  fill(210, 129, 148)
  triangle(350, 360, 355, 380, 360, 360)
  triangle(355, 380, 375, 380, 375, 370)
  triangle(350, 400, 355, 380, 360, 400)
  triangle(335, 380, 335, 371, 360, 380)
  //hair
  fill(30);
  bezier(190, 220, 10, 220, 335, 335, 15, 350);
  line(10,10, 20, 20);
  triangle(160, 210, 300, 300 , 15 , 350);
  fill(20);
  circle(210, 245, 220);

  //face
  fill(253, 237, 218);
  ellipse(240, 260, 150, 180);
  ellipse(220, 280, 110, 150);
  ellipse(224, 280, 110, 150);
  ellipse(210, 280, 110, 150);
  ellipse(210, 290, 110, 130);
  
  //eyes
  fill(123, 63, 0);
  circle(240, 270, 20);
  
  //mouth
  fill(249, 96, 125);
  triangle (230, 320, 300, 340, 430, 300);
  
  //eyebrow
  fill(0);
  triangle(230, 230, 240, 230, 210, 250);
  
  //blush
  fill(253, 227, 232);
  ellipse(200, 305, 40, 20);
  
  noStroke();
  //body
  fill(0)
  ellipse(440, 260, 200, 150)
  fill(250)
  ellipse(420, 260, 120, 150)
  
  //rabbit face
  fill(250);
  circle(350, 265, 175);
  fill(8);
  arc(300, 250, 130, 130, 1.75 * PI, .63 * PI);
  arc(400, 250, 130, 130, 1/2.6 * PI, PI + QUARTER_PI);
  circle(350,212,70);
  circle(318,223,70);
  circle(328,216,70);
  circle(306,233,70);
  circle(301,243,70);
  circle(298,255,70);
  circle(295,265,70);
  circle(298,275,70);
  circle(303,285,70);
  circle(381,223,70);
  circle(371,216,70);
  circle(393,233,70);
  circle(398,243,70);
  circle(402,255,70);
  circle(405,265,70);
  circle(402,275,70);
  circle(398,285,70);
  fill(250);
  triangle(330, 350, 350, 200, 370, 350);
  
  //eyes
  fill(123, 63, 0);
  ellipse (308, 260, 14,25);
  ellipse(390, 260, 14,25);
  fill(250);
  circle (310, 256, 3);
  circle (308, 259, 3);
  circle (390, 256, 3);
  circle (392, 259, 3);
  
  //nose
  fill(254, 215, 215);
  triangle(340, 330, 350, 340, 360, 330);
  
  //paw
  fill(250);
  ellipse(280, 335, 70, 40);
  ellipse(420, 335, 70, 40);
  
  //ears
  fill(0);
  strokeWeight(90);
  ellipse(320, 180, 40, 50);
  ellipse(380, 180, 40, 60);
  ellipse(385, 170, 40, 40);
  
  //move_with_mouse_rabbit
  // face
  fill(255);
  circle(mouseX, mouseY, 100);
  // brown part
  fill(67, 40, 24);
  circle(mouseX - 30, mouseY, 60);
  circle(mouseX + 30, mouseY, 60);
  circle(mouseX, mouseY - 30, 70);
  ellipse(mouseX - 30, mouseY - 40, 50, 100);
  ellipse(mouseX + 30, mouseY - 40, 50, 100);
  // triangle
  fill(255);
  triangle(mouseX, mouseY - 50, mouseX - 10, mouseY + 30, mouseX + 10, mouseY + 30);
  // eyes
  fill(242, 92, 84);
  ellipse(mouseX - 30, mouseY, 10,  25);
  ellipse(mouseX + 30, mouseY, 10,  25);
  // nose
  fill (248, 173, 157)
  ellipse(mouseX, mouseY + 30, 15, 10);
  
  // appear_rabit
  if (mouseIsPressed == true){
   fill(255)
   circle(mouseX, y ,100);
   fill(0)
   circle(mouseX + 30, y ,60);
   circle(mouseX - 30, y ,60);
   circle(mouseX, y - 30, 70);
   ellipse(mouseX - 30, y - 40, 50, 100);
   ellipse(mouseX + 30, y - 40, 50, 100);
    // eyes
   fill(255);
   ellipse(mouseX - 30, y, 10,  25);
   ellipse(mouseX + 30, y, 10,  25);
   triangle(mouseX, y - 50, mouseX - 10, y + 30, mouseX + 10, y + 30);
    // nose
   fill (0)
   ellipse(mouseX, y + 30, 15, 10);
   y = y + pace
   if(y < mouseY || y >= width + 100){
    pace = -pace
    }
  }else{
    y = 600
    pace = 20
  }
      
  
}
