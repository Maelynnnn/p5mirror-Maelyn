let vid;
let cam;
let timecount = 0;

function preload(){
  vid = createVideo('BWglitch.mp4')
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  // Mycamera();
  vid.loop();
  vid.hide();
  
}

function draw() {
  image(vid, 0, 0, windowWidth, windowHeight);
  textFont("Jersey 25");
  word(windowWidth / 2, windowHeight / 2 );
}

function word(x, y){
  fill(255);
  textSize(35);
  textAlign(CENTER);
  let insx = random(x -1.5,x  + 1.5)
  let insy = random(y - 1, y + 1)
  timecount += 1
  if (timecount < 150){
    text('IN THE EVENT OF AN ALTERNATE ENCOUNTER',insx, insy);
  }
  if (timecount > 180 & timecount < 350){
    text("FOLLOW THE 'THINK' PRINCIPLE",insx, insy);
  }
  if (timecount > 400 & timecount < 550){
    push();
    textSize(50)
    text("THE 'T.H.I.N.K' PRINCIPLE",insx, insy - windowWidth / 6);
    textSize(100);
    text("TELL",insx, insy);
    pop();
  }
  if (timecount > 600 & timecount < 750){
    push();
    textSize(50)
    text("THE 'T.H.I.N.K' PRINCIPLE",insx, insy - windowWidth / 6);
    textSize(100);
    text("HIDE",insx, insy);
    pop();
  }
  if (timecount > 800 & timecount < 950){
    push();
    textSize(50)
    text("THE 'T.H.I.N.K' PRINCIPLE",insx, insy - windowWidth / 6);
    textSize(100);
    text("IDENTIFY",insx, insy);
    pop();
  }
  if (timecount > 1000 & timecount < 1150){
    push();
    textSize(50)
    text("THE 'T.H.I.N.K' PRINCIPLE",insx, insy - windowWidth / 6);
    textSize(100);
    text("NEUTRALIZE",insx, insy);
    pop();
  }
  if (timecount > 1200 & timecount < 1350){
    push();
    insx = random(x - 5,x  + 5)
    insy = random(y - 5, y + 5)
    textSize(50)
    text("THE 'T.H.I.N.K' PRINCIPLE",insx, insy - windowWidth / 6);
    textSize(100);
    text("KILL YOUR SELF",insx, insy);
    textSize(30)
    text("THERE IS NO ENOUGH ROOM FOR BOTH OF US",insx, insy + windowWidth / 6);
    pop();
  }

  
  if (timecount > 1400 & timecount < 1600){
    push();
    textSize(50)
    text("THE 'T.H.I.N.K' PRINCIPLE",insx, insy - windowWidth / 6);
    textSize(80);
    text("KNOW YOUR PLACE",insx, insy);
    pop();
  }
  
  
}

function Mycamera(){
  cam = createCapture(VIDEO);
  cam.hide();
  cam.loadPixels();
  cam.updatePixels();
}