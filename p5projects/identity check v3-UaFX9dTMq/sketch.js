let inputName, inputID, button, greeting;
let namecheck = 'Thomas Bhing';
let id = '7621903';
let posX, posY;

function setup() {
  // create canvas
  createCanvas(400, 300);
  background(30,0);
  fill(30);
  rect(0,0,width, height, 20,20,20,20);


  posX = width * 1 / 4.5;
  posY = height * 1 / 3;

  textAlign(CENTER);
  textSize(30);

  inputName = createInput();
  inputName.position(posX + width / 20, posY);

  inputID = createInput();
  inputID.position(posX + width / 20, posY + 50);

  button = createButton('submit');
  button.position(inputName.x + inputName.width, posY + 50);
  button.mousePressed(greet);

  push();
  fill(255);
  strokeWeight(0.6);
  stroke(255);
  text('Identity verification', width / 2, height / 4);
  pop();

  push();
  stroke(255);
  strokeWeight(0.6);
  fill(255);
  textSize(15);
  text('Name', posX - width / 12, posY + 15);
  text('ID', posX - width / 18, posY + 65);
  pop();
}

function greet() {
  const name = inputName.value();
  const numb = inputID.value();
  if (inputName.value() == namecheck || inputName.value() == 'Marcela' || inputName.value() == 'Ricci Liu') {

    if (inputName.value() == namecheck) {
      if (inputID.value() == id) {
        background(30);
        
        push();
        fill(255);
        strokeWeight(0.6);
        stroke(255);
        text('Hello Thomas Bhing', width / 2, height / 4);
        pop();
        
        push();
        fill(255);
        textSize(25);
        text(name, width / 2, height / 1.5);
        textSize(15);
        text('Biological supervision department', width / 2, height / 2 + 85);
        text('Senior Detective', width / 2, height / 1.5 + 35);
        pop();
      } else {
        background(100,0);
        fill(30)
        rect(0,0,width, height, 20,20,20,20);
        
        push();
        fill(255);
        strokeWeight(0.6);
        stroke(255);
        text('Invalid identity', width / 2, height / 4);
        pop();
      }
    }

    if (inputName.value() == 'Marcela') {
      background(30,0);
      fill(30)
      rect(0,0,width, height, 20,20,20,20);
      
      push();
      fill(255);
      strokeWeight(0.6);
      stroke(255);
      text('Hello Marcela', width / 2, height / 4);
      pop();
      
      push();
      fill(255);
      textSize(25);
      text(name, width / 2, height / 1.5);
      textSize(15);
      text('Lab 3', width / 2, height / 1.5 + 25);
      text('Top Management', width / 2, height / 1.5 + 45);
      pop();
    }

    if (inputName.value() == 'Ricci Liu') {
      background(30,0);
      fill(30)
      rect(0,0,width, height,20,20,20,20);
      
      push();
      fill(255);
      strokeWeight(0.6);
      stroke(255);
      text('Hello Ricci Liu', width / 2, height / 4);
      pop();
      
      push();
      fill(255);
      textSize(25);
      text(name, width / 2, height / 1.5);
      textSize(15);
      text('Public Relations Department', width / 2, height / 1.5 + 25);
      text('Top Management', width / 2, height / 1.5 + 45);
      pop();
    }

  } else {
    background(30,0);
    fill(30)
    rect(0,0,width, height,20,20,20,20);
    
    push();
    fill(255);
    strokeWeight(0.6);
    stroke(255);
    text('Invalid identity', width / 2, height / 4);
    pop();
    
  }
  inputName.value('');
  inputID.value('');

  push();
  stroke(255);
  strokeWeight(0.6);
  fill(255);
  textSize(15);
  text('Name', posX - width / 34, posY + 15);
  text('ID', posX - width / 28, posY + 65);
  pop();

}