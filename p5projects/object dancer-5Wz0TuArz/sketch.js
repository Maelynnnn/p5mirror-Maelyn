let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  
  dancer = new MaelynDancer(width / 2, height / 2);
}

function draw() {
  background(0);

  dancer.update();
  dancer.display();
}


class MaelynDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    
    this.time = 0
    
    this.leftLegX = 0
    this.leftLegY = -10
    this.legRotate = 1.5
    this.legRotateSpeed = 0.1
    
    this.leftArmRotate = 3.5
    this.leftArmY = 0
    
    this.rightArmRotate = 3
    this.rightArmY = 0
  
    

    this.backLineX = 0;
    this.backLineY = 120;
    this.angle = 0;
    this.r = 50;
    this.speed = 0.05;
    
    this.frontLineX = 0;
    this.frontLineY = 120;
    this.frontangle = 0;
    this.frontspeed = 0.05;
    
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    
//     move left leg
    this.legRotate += this.legRotateSpeed
    if(this.legRotate > 2 || this.legRotate < 1){ 
      this.legRotateSpeed = -this.legRotateSpeed
    }
    this.leftLegX += this.legRotateSpeed * 40
    
    // move left arm
    this.leftArmRotate -= this.legRotateSpeed* 3
    this.leftArmY -= this.legRotateSpeed* 20
    
    // move right arm
    this.rightArmRotate -= this.legRotateSpeed
    this.rightArmY += this.legRotateSpeed* 10
    
    // move back line
    this.backLineX = cos(this.angle) * this.r
    this.backLineY = 100 - sin(this.angle) * this.r * 0.5
    this.angle += this.speed;
    if (this.angle >= PI || this.angle <= 0) {
    this.speed = -this.speed;
  }
    
    // move front line
    this.frontLineX = -cos(this.angle) * this.r
    this.frontLineY = 120 + sin(this.angle) * this.r * 0.5
    this.frontangle += this.frontspeed;
    if (this.frontangle >= PI || this.frontangle <= 0) {
    this.frontspeed = -this.frontspeed;
  }
    
    
    
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    noStroke();
    
    // this.lightCircle();
    
    this. lightLineBehind();
    
    this.head();
    
    this.leftLeg();
    
    this.rightLeg();
    
    this.leftArm_Dabi();
    
    this.leftArm_Xiaobi();
    
    this.rightArm_Dabi();
    
    this.rightArm_Xiaobi();
    
    this.lightLineFront();
    
    
    
    
    
    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  leftLeg(){
    // leftleg
    push();
    translate(-3,38)
    rotate(PI / this.legRotate)
    rect(0,0,30,15)
    pop();
    
    push();
    translate(-23,54)
    rotate(PI / 3);
    rect(this.leftLegX,this.leftLegY,50,13)
    pop();
    
    // left foot
    push();
    translate(-4,100)
    rotate(PI / 1.2)
    rect(-5,-this.leftLegX,20,15)
    pop();
  }
  
  rightLeg(){
    // right leg
    push();
    translate(20,38)
    rotate(PI / 1.8)
    rect(0,0,30,15)
    pop();
    
    push();
    translate(14,60)
    rotate(PI / 2.2)
    rect(0,0,50,14)
    pop();
    
    // right foot
    push();
    translate(23,115)
    rotate(PI/1.1)
    rect(0,0,25,15)
    pop();
  }
  
  leftArm_Dabi(){
    // left arm dabi
    push();
    translate(-17,-21)
    rotate(-PI / this.leftArmRotate)
    rect(0,0,-30,20)
    pop();
  }
  
  leftArm_Xiaobi(){
    //     leftarm xiaobi
    push();
    translate(-17,2)
    rotate(PI /1.4)
    rect(0,this.leftArmY,12,50)
    pop();
  }
  
  rightArm_Dabi(){
    // right arm dabi
    push();
    translate(30,-29)
    rotate(-PI / this.rightArmRotate)
    rect(0,0,16,30)
    pop();
  }
  
  rightArm_Xiaobi(){
    // right arm xiaobi
    push();
    translate(63,-10)
    rotate(-PI / 1.2)
    rect(0,this.rightArmY,12,60)
    pop();
  }
  
  head(){
    // head
    this.colorFill();
    circle(0, -50,45)
    // shoulder
    push();
    translate(-17,-20)
    rotate(-PI / 8)
    rect(0,0,60,20)
    pop();
    quad(-5,-10,30,-30,20,40,-20,40)
    
    push();    
     // innerhead
    translate(-5,-45);
    rotate(-PI/8)
    fill(255);
    ellipse(0,0,25,30); 
    pop();
  }
  
  lightCircle(){
    push();
    noFill();
    strokeWeight(3);
    stroke(random(0,200),random(0,200),random(0,200))
    ellipse(2,115,110,30)
    pop();
    
  }
  
  lightLineBehind(){
    push();
    noFill();
    strokeWeight(1);
    stroke(random(0,200),random(0,200),random(0,200))
    line(0, -120, this.backLineX, this.backLineY)
    line(0, -120, this.backLineX - 20, this.backLineY + 5)
    line(0, -120, this.backLineX + 20, this.backLineY + 5)
    line(0, -120, this.backLineX - 40, this.backLineY + 10)
    line(0, -120, this.backLineX + 40, this.backLineY + 10)
    line(0, -120, this.backLineX - 60, this.backLineY + 20)
    line(0, -120, this.backLineX + 60, this.backLineY + 20)
    pop();
    
  }
  
  lightLineFront(){
    push();
    noFill();
    strokeWeight(1);
    stroke(random(0,200),random(0,200),random(0,200))
    for(let i = -60; i <= 60; i += 20){
      for(let j = -20; j <= 20; j += 7){
        line(0, -120, this.frontLineX + i, this.frontLineY )
      }
    }
    
    pop();
    
  }
  
  colorFill(){
    fill(random(0, 200),random(0, 200),random(0, 100))
  }
  
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}