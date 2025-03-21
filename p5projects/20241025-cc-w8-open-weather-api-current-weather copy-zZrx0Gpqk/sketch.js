// Get your API key at: https://openweathermap.org/api

let mX = 10;
let mY = 1;
const API_KEY = 'b61233ea698d80b43df08d457e319064';
// const url = "https://api.openweathermap.org/data/2.5/weather?lat=40.68&lon=-73.94&units=metric&appid=" + API_KEY;
// const url = "https://api.openweathermap.org/data/2.5/weather?lat=43.8868&lon=125.324&units=metric&appid=" + API_KEY;
const url = "https://api.openweathermap.org/data/2.5/weather?lat="+ mX +"&lon="+ mY +"&units=metric&appid=" + API_KEY;

function setup() {
  createCanvas(400, 400);
  httpGet(url, "json", gotData);
  background(220);
}
function draw(){
  mX += frameCount * 0.0001;
  console.log(mX)

}

function gotData(response) {
  console.log(response);
  textSize(20);
  text("City: " + response.name, 50, 50);
  text("Temperature: " + response.main.temp, 50, 100);
  text("Weather: " + response.weather[0].description, 50, 150);
}