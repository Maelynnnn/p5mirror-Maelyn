let s = 40;
let random1,random2,random3;
let rg1,rg2,rg3;
let rb1,rb2,rb3;
let s1, s2, s3;
let b1, b2, b3;
let cr;
let x = 0

function setup() {
  createCanvas(400, 400);
  random1 = random(0,100)
  rg1 = (100,200)
  rb1 = random(160,210)
  random2 = random(0, width)
  random3 = random(0, width)
  
}

function draw() {
  console.log(random1)
  if (random1 < 30){
  background(255,rg1-30,rb1);
    for (let i = 300; i < 600; i += 10){
    noFill();
    strokeWeight(3);
    stroke(255, rg1, rb1)
    circle(random2,random2 / 2,i)
  }
  }
  if (random1 < 60 & random1 > 30){
  background(0,rg1-60,rb1);
    
    for (let i = 300; i < 600; i += 10){
    noFill();
    strokeWeight(3);
    stroke(0, rg1 - 50, rb1)
    circle(random2,random2 / 2,i)
  }
    
  }
  if (random1 < 90 & random1 > 60){
  background(255,rg1-30,0);
    for (let i = 300; i < 600; i += 10){
    noFill();
    strokeWeight(3);
    stroke(255, rg1 - 10, 0)
    circle(random2,random2 / 2,i)
  }
    
  }
  if (random1 < 100 & random1 > 90){
  background(rg1,rg1 - 60,rg1);
    for (let i = 300; i < 600; i += 10){
    noFill();
    strokeWeight(3);
    stroke(rg1,rg1 - 30,rg1)
    circle(random2,random2 / 2,i)
  }
    
  }
  for (let i = 10; i < 300; i += 10){
    noFill();
    strokeWeight(1);
    stroke(220, rg1, rb1)
    circle(10 + 300 * noise(3), 10 + 300 * noise(3), i)
    stroke(220, rb1, rg1)
    strokeWeight(0.5);
    circle(width - 300 * noise(3), height - 300 * noise(3), i / 2)   
  }

    for (let i = 200; i < 400; i += 10){
    noFill();
    strokeWeight(1);
    stroke(220, rg1, rb1)
    circle(random3, 10 + 300 * noise(3), i)
    stroke(220, rb1, rg1)
    strokeWeight(0.5);
    circle(width - 300 * noise(3), random3, i / 1.5)   
  }
  
}