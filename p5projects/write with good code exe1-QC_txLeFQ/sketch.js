let color_list = [];
let rows = 10;
let cols = 10;
let edge = 40;

function setup() {
  createCanvas(400, 400);
  color_list.push("green");
  color_list.push("red");
  color_list.push("blue");
}

function get_color(){
  const idx = (rows * edge + cols) % color_list.length;
  return color_list[idx];
}

function draw() {
  background(220);
  for(let i = 0; i <= cols; i ++ ){
    for(let j = 0; j <= rows; j++){
      fill(color_list[j%3]);
      //const c = get_color(j, i);
      //fill(c);
      rect(j * edge, i*edge, edge);
    }
  }
}