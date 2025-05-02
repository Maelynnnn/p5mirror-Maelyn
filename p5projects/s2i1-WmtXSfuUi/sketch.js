let mount,bg,house,river;
let draw_mount = false;
let draw_house = false;
let draw_river = false;

function preload() {
  bg = loadImage("bg.png")
  mount = loadImage("mount.png");
  house = loadImage("house.png");
  river = loadImage("river.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER); 
}

function draw() {
  background(203, 238, 243);
  image(bg, windowWidth/2, windowHeight / 2);
  if(draw_mount){
    image(mount, windowWidth/2, windowHeight/1.5);
  }
  if(draw_house){
    image(house, windowWidth / 1.3, windowHeight/1.3);
  }
  if(draw_river){
    image(river, windowWidth/3, windowHeight/1.2);
  }
}

function keyPressed() {
  // 根据按下的键来决定使用哪张图片
  if (key === '1') {
    draw_mount = true;
  } else if (key === '2') {
    draw_house = true;
  } else if (key === '3') {
    draw_river = true;
  }
}
