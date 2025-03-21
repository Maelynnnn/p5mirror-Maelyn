let size = [];
let x = [];
let y = [];
let angle;
let pacex = [];
let pace = [];
let s;
let r, g, b, colorchange;
let disappear;
let d;
let ds;
let dsArray = [];
let my;
let bgts = 0;
let starx = [];
let stary = [];
let pacesave, pacexsave;
let saveSpeed = false;
let birth = false;
let birthsize;
let windpace = 2;
let windxpos;


function setup() {
  createCanvas(600, 600);
  refresh();

}

function draw() {
  background(20, 33, 61);
  
  

  for (i = 0; i < 100; i += 1) {
    stars(starx[i], stary[i]);
  }

  for (i = 0; i < x.length; i += 1) {
    fishmove(i);
    push();
    translate(x[i], y[i]);
    // console.log(x[i])
    s = sin(frameCount * 0.05);
    
    if(size[i] >2){
      pace[i] = 0;
      pacex[i] = 0
    }

    let my = map(y[i], 0, height, 0, 100);
    if (mouseIsPressed) {
      rotate(PI * my * 10);
      if (size[i] > 0) {
        size[i] -= 0.005;
      }
      let d = dist(mouseX, mouseY, x[i], y[i]);
      if (d < 10 && saveSpeed == false) {
        rotate(PI * 80 * s);
        pacesave = pace[i];
        pace[i] = 0;
        pacexsave = pacex[i];
        pacex[i] = 0;
        saveSpeed = true;
      }
    }

    if (keyIsPressed) {
      if (key == "m"||'M') {
        pace[i] = pacesave;
        pacex[i] = pacexsave;
        saveSpeed = false;
      }
    }

    satrick(0, 0, size[i]);
    
    
    pop();

    if (y[i] < -30 || y[i] > height + 30) {
      pace[i] = -pace[i];
    }
    if (x[i] < -30 || x[i] > width + 30) {
      pacex[i] = -pacex[i];
    }

    
      for (let i = 0; i < x.length; i+= 1) {
        for (let j = 0; j < x.length; j+= 1) {
          if (i !== j) {
            ds = dist(x[i], y[i], x[j], y[j]);
            dsArray.push(ds);
          }
    }
  }
    
    if (ds < 150) {
      shine(x[i], y[i],size[i]);
      
    }
     
  }


}

function satrick(px, py, psize) {
  noStroke();
  //   change color based on distance
  r = 255 - frameCount * (psize / 5000);
  g = 255 - frameCount * (psize / 5000);
  b = 255 - frameCount * (psize / 5000);
  fill(r, g, b, disappear);

  if (g < 110) {
    disappear -= frameCount * 0.0005;
  }

  fill(r, g, b, disappear);
  rota(px, py, psize);

  if (disappear < 150) {
    pace[i] = pace[i] * 0.99;
  }
  if (disappear < 10 || psize < 0.5) {
    rectMode(CENTER);
    fill(120, 192, 224, bgts);
    rect(0, 0, width * 3, height * 3);
    bgts += 0.1;
  }
}

function fishmove(t) {
  // x[t] = x[t] + 5 * cos(frameCount * 0.05);

  let x_angle = sin(frameCount * 0.05);
  let y_angle = cos(frameCount * 0.05);

  // x[t] = 10 * sin(frameCount * 0.05);
  x[t] = x[t] + x_angle * 0.1 + pacex[t];
  y[t] -= pace[t] + y_angle * 0.1;
  angle[t] = atan2(x_angle, y_angle);
  if (keyIsPressed){
    if(key == 'w' ||key == 'W'){
      
      x[t] = x[t] + x_angle * 0.1 - abs(3 * pacex[t]);
      windxpos = width - windpace + 100
      for (k = 0; k < height; k += 80){
        for (let i = 0; i < 400; i+=10){
           j = 20*sin((frameCount-i)/50);
           let s = map(i, 0, 300, 5, 1);
           fill(255, 200 - i*1.5)
           circle( windxpos + i / 1.5, k + j, s);
        }
        k = k + 2;
        if(windxpos < -400){
          windxpos = width - windpace  + 100
          windpace = 2;
          // console.log(windxpos)
        }
      }
      windpace += 2
      }
    }else{
      windxpos = width - windpace + 100
      windpace = 2;
      // console.log(windxpos)
      
    }
  
  
}

function stars(x, y) {
  noFill();
  stroke(255, 255, 255, 200);
  let shine = sin(frameCount * 0.03);
  let starshine = map(shine, -1, 1, 0, 1);
  strokeWeight(2 - 2 * starshine);
  point(x, y);
}

function rota(x, y, size) {
  if(size < 3){
    fill(154, 3, 30)
  }else{
    fill(255);
  }
  noStroke();
  circle(x, y, size * 8);
  for (let angle = 0; angle < TWO_PI; angle += PI / 2) {
    push();
    translate(x, y);
    rotate(angle);
    for (let i = size * 2; i < size * 26; i += size + 6) {
      j = 20 * sin((frameCount - i) / 50);
      let s = map(i, 0, 100, 20, 1);
      circle(i - size * 2, j, s * size * 0.3);
    }

    pop();
  }
}

function shine(x, y, size) {
  stroke(255,50);
  for (let i = 0; i < 10 * PI; i += PI * 0.05) {
    push();
    translate(x, y);
    rotate(i);
    line(0, 0, size * 10 * sin(frameCount * 0.02), size * 10);
    pop();
  }
}

function keyPressed(){
  if (key == 'r' || key == 'R'){
    removeAll();
    refresh(); 
  }
  
}


function removeAll(){
  x.splice(0, x.length);
  y.splice(0, x.length);
  pace.splice(0, x.length);
  pacex.splice(0, x.length);
  size.splice(0, x.length);


}
function refresh(){
  
  for (i = 0; i < 100; i++) {
    starx[i] = random(0, width);
    stary[i] = random(0, height);
  }

  for (i = 0; i < 3; i++) {
    x[i] = random(100, 500);
    y[i] = random(100, 500);
    pace[i] = random(0.2, 0.8);
    pacex[i] = random(0.2, 0.8);
    size[i] = random(4,4.5)
  }
  angle = [];
  disappear = 255;
  birthsize = random(1,2);
  bgts = -100

}

function mousePressed(){
  x.push(mouseX);
  y.push(mouseY);
  pace.push(random(0.2, 0.8));
  pacex.push(random(0.2, 0.8));
  size.push(birthsize);
}
