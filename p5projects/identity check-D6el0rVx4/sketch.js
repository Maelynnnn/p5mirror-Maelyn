
let input, button, greeting;
let namecheck = 'Thomas Bhing';
let id ='7621903';
let posX, posY

function setup() {
  // create canvas
  createCanvas(400, 400);
  background(100)
  let div = createDiv('');
  div.center();
  
  
  posX = width * 1/4.5
  posY = height * 1/4

  input = createInput();
  input.position(posX, posY);

  button = createButton('submit');
  button.position(input.x + input.width, posY);
  button.mousePressed(greet);

  greeting = createElement('h2', 'what is your name?');
  idName = createElement('h3', ' ');
  identity_dep = createElement('h3', ' ');
  identity_job = createElement('h3', ' ');
  greeting.position(posX, posY - 60);
  idName.position( posX + 40 , posY +30);
  // identity_dep.position(width/2, height/2);
  
  identity_dep.position( posX -40, posY +60)
  identity_job.position( posX +40, posY +85)

  textAlign(CENTER);
  textSize(30);
  
}

function greet() {
  const name = input.value();
  if (input.value() == namecheck ||input.value() == 'Marcela' ) {
    
    if(input.value() == namecheck){
      background(100);
      greeting.html('Hello ' + name);
      idName.html(name)
      identity_dep.html('Biological supervision department')
      identity_job.html('Senior Detective')
    }
    
    if (input.value() == 'Marcela') {
      background(100);
      greeting.html('Hello ' + name);
      idName.html(name)
      identity_dep.html('Lab 3');
      console.log(identity_dep.width);
      identity_job.html('Top Management')
      textAlign(CENTER)
      text("Lab 3", width/2, height/2);
      
    }
  } else {
    // textSize(20)
    // text("Invalid identity information", width / 2, height / 2);
    greeting.html("Invalid identity: " + name);
    idName.html(' ')
    identity_dep.html(' ')
    identity_job.html(' ')
  }
  input.value('');

}
