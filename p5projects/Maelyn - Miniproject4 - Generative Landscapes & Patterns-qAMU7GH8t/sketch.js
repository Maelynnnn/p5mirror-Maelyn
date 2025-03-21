
let x = 0;
let rc1, rc2, rc3;
let r1,r2,r3,r4;
let ctrl;
let a = 30;

function setup() {
  createCanvas(400, 400);
  rc1 = random(0, 100);
  rc2 = random(0, 100);
  rc3 = random(0, 100);
  r1 = random(0, height);
  r2 = random(0, height);
  r3 = random(0, width);
  r4 = random(0, width);
  control = random(0,10);
  control2 = random(0,10);
  // console.log(control)
  
}

function draw() {
  
    let c = 150 + 100 * noise(200, 200);
  

  noStroke()
  for (let y = 0; y < height + 100; y += 30) {
    for (let x = 0; x < width + 100; x += 30) {
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
  
    for( angle = 0; angle < 2 * PI; angle += PI / 100){
      for(R = 3; R < 200; R += 8){
        let h1 = R*cos(angle);
        let z1 = R*sin(angle);

        
        if(control < 3){
          
          stroke(c + rc1, c + rc2,  c + rc3, 10);
          line(0, r1, h1, z1 + r1);
          line(width, r2, h1 + width, z1 + r2);
          line(r3, 0, h1 + r3, z1);
          line(r4, height, h1 + r4, z1 + height);
          line(width / 2, height / 2, h1 + width / 2, z1 + height / 2);
          
        }
        
        if(control > 3 & control < 7){
          noStroke();
          fill( c +rc1, c +rc2, c +rc3, 50);
          circle(h1, z1 + r1, 3);
          circle(h1 + width, z1 + r2, 3);
          circle(h1 + r3, z1, 3);
          circle(h1 + r4, z1 + height, 3);
          circle(h1 + width / 2, z1 + height / 2, 1);
        }
        
        if(control > 7){
          noStroke();
          fill( c +rc1, c +rc2, c +rc3, 50);
          rectMode(CENTER);
          rect(h1, z1, 5);
          rect(h1 + width, z1 + r2, 5);
          rect(h1 + r3, z1, 5);
          rect(h1 + r4, z1 + height, 5);
          rect(h1 + width / 2, z1 + height / 2, 3);
          
        }    

      }

  }
  // AFTER YOUR CODE HAS RUN:
  // saveCanvas('yourname', 'png');   // saves the canvas as a png image
}