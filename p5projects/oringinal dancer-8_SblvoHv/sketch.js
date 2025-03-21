

let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  // canvas.parent("p5-canvas-container");


  dancer = new MaelynDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  // drawFloor(); 

  dancer.update();
  dancer.display();
}


class MaelynDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.rotateArm = 6;
    this.armSpeed = 2;
    
    // human
    this.leftLegX = 0
    this.leftLegY = -10
    this.legRotate = 1.5
    this.legRotateSpeed = 0.1
    
    this.leftArmRotate = 3.5
    this.leftArmY = 0
    
    this.rightArmRotate = 3
    this.rightArmY = 0
    
    this.time = 0
    
  }
  update() {
    // rotate arm
    this.rotateArm += this.armSpeed
    if(this.rotateArm > 30 || this.rotateArm < 6){
      this.armSpeed = -this.armSpeed
    }
    
    // human
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
    
    this.time += 1
    if(this.time > 40){
      this.time = 0
    }
    
  }
  display() {
    
    push();
    noStroke();
    translate(this.x, this.y);
    
    this.colorFill()
    
    this.bigArm();
    
    this.leg();
    
    this.foot();
    
    this.drum();
    
    this.smallArm();
    
    this.face();
    
    // human
    push();
    scale(0.5);
    if(this.time > 20){
      scale(-1,1);
    }
    translate(0,-120)
    this.human();
    pop();
    

    pop();
  }
  drum(){
    push();
    fill(154 + this.legRotateSpeed * 400, 3, 30)
    rect(-40,0,80, 50)
    ellipse(-45, 25, 25, 57)
    ellipse(45, 25, 25, 57)
    ellipse(0, 50, 100,20)
    fill(255);
    ellipse(0, 0, 100,20)
    pop();
  }
  
  leg(){
    push();
    fill(255)
    rect(-25,50, 10,20)
    rect(15,50, 10,20)
    pop();
  }
  
  foot(){
    push();
    fill(255)
    ellipse(-25, 70, 20,10)
    ellipse(25, 70, 20,10)
    pop();
  }
  
  face(){
    push();
    fill(0);
    push();
    translate(-15,-10)
    rotate(PI / 6)
    rect(10,20,10,2)
    pop();
    
    push();
    translate(5,-5)
    rotate(-PI / 6)
    rect(-10,20,10,2)
    pop();
    
    ellipse(-10,30, 10,20)
    ellipse(10,30, 10,20)
    
    ellipse(1,40, 10,5)
    
    fill(255);
    ellipse(-8,30, 5,10)
    ellipse(8,30, 5,10)
    pop();
  }
  
  bigArm(){
    push();
    fill(255)
    translate(-65, -50)
    rotate(PI / 2.5)
    rect(20,0,50,5)
    pop();
    
    push();
    fill(255)
    translate(50, -3)
    rotate(-PI / 2.5)
    rect(-20,0,50,5)
    pop();
  }
  
  smallArm(){
    fill(255)
    push();
    translate(-58,-30);
    rotate( PI / this.rotateArm)
    rect(0,0,40,3)
    circle(40,3,10)
    pop();
    
    push();
    translate(63,-28);
    rotate(PI - PI / this.rotateArm)
    rect(0,0,40,3)
    circle(40,3,10)
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
  human(){
    this.head();
    
    this.leftLeg();
    
    this.rightLeg();
    
    this.leftArm_Dabi();
    
    this.leftArm_Xiaobi();
    
    this.rightArm_Dabi();
    
    this.rightArm_Xiaobi();
    
    // this.drawReferenceShapes()
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



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/