let inputName, inputID, button, greeting;
let namecheck = 'Thomas Bhing';
let id ='7621903';
let posX, posY

function setup() {
  // create canvas
  createCanvas(400, 300);
  background(30)
  let div = createDiv('');
  div.center();
  
  
  posX = width * 1/4.5
  posY = height * 1/3

  inputName = createInput();
  inputName.position(posX + width / 20, posY);
  
  inputID = createInput();
  inputID.position(posX + width / 20, posY+50);

  button = createButton('submit');
  button.position(inputName.x + inputName.width, posY + 50);
  button.mousePressed(greet);

  greeting = createElement('h2', 'Identity verification');
  greeting.style('color', 'rgb(253,252,252)');
  greeting.position(posX - width / 50, posY - width / 6);
  
  push();
  stroke(255);
  strokeWeight(0.6);
  fill(255);
  textSize(15);
  text('Name',posX - width / 12, posY+15);
  text('ID',posX - width / 18, posY+65);
  pop();


  textAlign(CENTER);
  textSize(30);
  
}

function greet() {
  const name = inputName.value();
  const numb = inputID.value();
  if (inputName.value() == namecheck ||inputName.value() == 'Marcela' || inputName.value() == 'Ricci Liu') {
    
    if(inputName.value() == namecheck){
      if(inputID.value() == id){
        background(30);
        greeting.html('Hello ' + name);
        push();
        fill(255)
        textSize(25)
        text(name, width/2, height/1.5)
        textSize(15)
        text('Biological supervision department', width/2, height/2 + 85)
        text('Senior Detective', width/2, height/1.5 +35)
        pop();
      }else {
        background(100);
        greeting.html("Invalid identity");
  }
    }
    
    if (inputName.value() == 'Marcela') {
      background(30);
      greeting.html('Hello ' + name);
      push();
      fill(255);
      textSize(25)
      text(name, width/2, height/1.5)
      textSize(15)
      text('Lab 3', width/2, height/1.5 + 25)
      text('Top Managment', width/2, height/1.5 + 45) 
      pop();
    }
    
    if(inputName.value() == 'Ricci Liu'){
      background(30);
      greeting.html('Hello ' + name);
      push();
      fill(255)
      textSize(25)
      text(name, width/2, height/1.5)
      textSize(15)
      text('Public Relations Department', width/2, height/1.5 +25)
      text('Top Management', width/2, height/1.5 +45)
      pop();
    }
    
  } else {
      background(30);
    greeting.html("Invalid identity");
  }
  inputName.value('');
  inputID.value('');
  
  push();
  stroke(255);
  strokeWeight(0.6);
  fill(255);
  textSize(15);
  text('Name',posX - width / 34, posY+15);
  text('ID',posX - width / 28, posY+65);
  pop();

}
