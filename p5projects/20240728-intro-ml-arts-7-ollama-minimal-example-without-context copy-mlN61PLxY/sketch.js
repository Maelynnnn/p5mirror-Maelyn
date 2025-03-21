// Step 1:
// Download Ollama: https://ollama.com/

// Step 2:
// Launch Ollama and follow its instructions.

// Step 3:
// Find a model of your choice in Ollama library: https://ollama.com/library/

// Step 4:
// Copy the code within the model page (such as llama3.1) and run it in your terminal (it may take a while to download): https://ollama.com/library/llama3.1
// ollama run llama3.1

// Step 5:
// Change model name in this sketch to match the model you just downloaded in the previous step
// mode: "llama3.1"

// Step 6:
// Download this sketch (you might need to save this sketch to your own account before you can download it) and run this sketch locally.
// Instructions on how to run your sketch locally: https://github.com/processing/p5.js/wiki/Local-server

// References:
// https://www.jsdelivr.com/package/npm/ollama-js-client

const Ollama = window.OllamaJS;

const ollama = new Ollama({
  model: "llama3.1",
  url: "http://127.0.0.1:11434/api/",
});
ollama.chat(
  [
    { role: "system", content: "You are a llama AI assistant." },
    { role: "assistant", content: "Hello, I am your llama AI friend." },
    { role: "user", content: "What is p5.js" },
  ],
  (error, response) => {
    if (error) {
      console.error(error);
    } else {
      // console.log(response);
      responseContent += response.message.content;
    }
  }
);

let responseContent = "";

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  textSize(15);
  text(responseContent, 20, 20, width - 40, height - 40);
}
