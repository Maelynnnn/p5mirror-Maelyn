
let x = 0;
let rc1, rc2, rc3;
let r1,r2,r3,r4;
let ctrl;

function setup() {
  createCanvas(400, 400);
  rc1 = random(0, 100);
  rc2 = random(0, 100);
  rc3 = random(0, 100);
  r1 = random(0, height);
  r2 = random(0, height);
  r3 = random(0, width);
  r4 = random(0, width);
  control = random(0,10)
  control2 = random(0,10)
  console.log(control)
  
}

function draw() {
  
    let c = 150 + 100 * noise(200, 200);
  

  noStroke()
  for (let y = 0; y < height + 100; y += 50) {
    for (let x = 0; x < width + 100; x += 50) {
      let noisex = 0.01 * x;
      let noisey = 0.01 * y;
      let c = 100 * noise(noisex+100, noisey+100);
      fill(c + rc1,c + rc2, c + rc3);
      
      if(control2 < 5){
        circle(x, y,80);
        circle(x - 50, y - 50,80);
      }
      if(control2 > 5 & control2 < 10){
        rect(x, y,60);
        rect(x - 50, y - 50,60);
      }
    }
  }
  
  
    // noStroke();
    for( angle = 0; angle < 2 * PI; angle += PI / 100){
      for(R = 3; R < 200; R += 8){
        let h1 = R*cos(angle)
        let z1 = R*sin(angle) + r1
        let h2 = R*cos(angle) + width
        let z2 = R*sin(angle) + r2
        
        let h3 = R*cos(angle) + r3
        let z3 = R*sin(angle)
        let h4 = R*cos(angle) + r4
        let z4 = R*sin(angle) + height
        
        let h = map(angle, 0, 2*PI, 0, 200);
        let sat = map(R, 0, 3, 0, 200);

        
        if(control < 3){
          
          stroke(c + h + rc1, c + rc2,  c + rc3, 50)
          line(0, r1, h1, z1)
          line(width, r2, h2, z2)
          line(r3, 0, h3, z3)
          line(r4, height, h4, z4)
        }
        
        if(control > 3 & control < 7){
          noStroke();
          fill( c +rc1, c +rc2, c +rc3, 50)
          circle(h1, z1, 3)
          circle(h2, z2, 3)
          circle(h3, z3, 3)
          circle(h4, z4, 3)
        }
        
        if(control > 7){
          noStroke();
          fill( c +rc1, c +rc2, c +rc3, 50)
          rectMode(CENTER)
          rect(h1, z1, 5)
          rect(h2, z2, 5)
          rect(h3, z3, 5)
          rect(h4, z4, 5)
        }
        
        
        

      }

  }
}