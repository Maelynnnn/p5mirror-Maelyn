let s = 30;
let r1, r2, r3;
let R, G, B;
let cc,cc2;
let ec;
let j = 199;
let transp = 220;
let strokew = 6;
let g1_blc = 0;
let g2_blc = 0
let angle;


function setup() {
  createCanvas(600, 600);
  background(202, 240, 248)
  noStroke()
  r1 = random(0, 100)
  r2 = random(0, 100)
  r3 = random(0, 100)
  console.log(r1,r2)
  if(r1 < 60){
    cc = random(0, width)
    cc2 = random(0, width)
    for(let i = 50; i < 400; i += 50){
      noFill()
      strokeWeight(strokew)
      stroke(0, 150 + g1_blc, j, transp)
      circle(cc, cc, i) 
      if(r2 > 40 & cc2 < cc - 100){
        strokeWeight(8)
        circle(cc2, cc2, i / 2) 
      }
      j -= 10
      strokew += 3
      g1_blc += 3
      transp -= 35
      
    }
  if(r2 < 90){
    noStroke();
    // fill(255, 166, 193)
    // ellipse(random(0, width - 100), random(0, height - 100), s, s * 2)
    ec = random(100, width - 100)
    for (let angle = PI; angle < 2*PI; angle += PI / 4){
      fill(255, 166 - g2_blc, 193 - g2_blc)
      pop();
      translate(ec, s);
      rotate(angle);
      ellipse(ec,ec, s, s * 2)
      push();
      g2_blc += 10
    }
  }
    
  }
  
  

  // AFTER YOUR CODE HAS RUN:
  // saveCanvas('yourname', 'png');   // saves the canvas as a png image
}