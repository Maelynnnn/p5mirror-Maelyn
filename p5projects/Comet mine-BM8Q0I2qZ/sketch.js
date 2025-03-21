let butterflyX = [];
let butterflyY = [];
let butterflySpeed = 10;
let butterflySize = [];
let bfclr = [];
let bgclr = 167;
let bgchange = 1;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 500; i+=1) {
    butterflyX[i] = random(0, width);
    butterflyY[i] = random(0, height);
    butterflySize[i] = random(20,40);
    bfclr[i] = random(10,250)
  }
}

function draw() {
  background(bgclr, 201, 7);
  bgclr -= bgchange;
  if(bgclr > 250|| bgclr < 100){
    bgchange = -bgchange
  }
  
  
  // 绘制蝴蝶
  for (let j = 0; j < 500; j += 1){
    drawButterfly(butterflyX[j], butterflyY[j], butterflySize[j], bfclr[j]);
  }
  
  // 如果鼠标靠近蝴蝶，蝴蝶就飞走
  for (let k = 0; k < 500; k+=1) {
    let d = dist(butterflyX[k], butterflyY[k], mouseX, mouseY);
    if (d < 50) {
      butterflyX[k] += random(-butterflySpeed, butterflySpeed);
      butterflyY[k] += random(-butterflySpeed, butterflySpeed);
      butterflySize[k] += 0.1 * random(-butterflySpeed, butterflySpeed);
      bfclr[k] -= 10 *random(-butterflySpeed, butterflySpeed);
    }
  }
}

// 绘制蝴蝶的函数
function drawButterfly(x, y, butterflySize, bfclr) {
  // wings
  noStroke();
  fill(bfclr, 160, 200,180);
  push();
  translate(x, y)
  rotate(PI / 4)
  ellipse(0, 0, butterflySize, butterflySize / 2);
  pop();

  push();
  translate(x + butterflySize / 1.3, y)
  rotate(-PI / 4)
  ellipse(0, 0, butterflySize, butterflySize / 2)
  pop();

  push();
  translate(x + butterflySize / 8, y + butterflySize / 2)
  rotate(PI * 3 / 5)
  ellipse(0, 0, butterflySize, butterflySize / 2)

  pop();
  push();
  translate(x + butterflySize / 1.5, y + butterflySize / 2)
  rotate(-PI * 3 / 5)
  ellipse(0, 0, butterflySize, butterflySize / 2)
  pop();

  fill(bfclr, 160, 200,180)
  ellipse(x + butterflySize / 2.5, y + butterflySize / 3.5, butterflySize / 4, butterflySize/1.2)

}