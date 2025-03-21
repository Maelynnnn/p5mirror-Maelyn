let colsNum = 10;
let rowsNum = 10;
let tileWidth;
let tileHeight;

function setup() {
  createCanvas(400, 400);
  tileWidth = width / colsNum;
  tileHeight = height / rowsNum;
}

function draw() {
  background(220);
  for(let c = 0; c < colsNum; c++){
    for(let r = 0; r < rowsNum; r ++){
      y = r * tileHeight;
      let x = c * tileWidth;
      //let x = map(c, 0, colsNum, 0, width);\
      if(random() > 0.5){
        tileA(x, y, tileWidth, tileHeight);
      }else{
        tileB(x, y, tileWidth, tileHeight);
      }
    }
  }
  noLoop();
}
function tileA(x, y, w, h){
  line(x, y, x+w, y+h);
}
function tileB(x, y, w, h){
  line(x + w, y, x, y + h);
}