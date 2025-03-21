
const Ollama = window.OllamaJS;

const ollama = new Ollama({
  model: "llama3.2:1b",
  url: "http://127.0.0.1:11434/api/",
});

let responseDone = true;
let activeResponseElement;
let activePromptElement;

let inputField;
let sendButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createElement("h1", "Ask me anything");
  inputField = createInput("What is p5.js?");
  sendButton = createButton("Send");
  sendButton.mousePressed(send);
  activePromptElement = createP();
  activeResponseElement = createP();
}

function draw(){
  background(220,10,10);
  textFont("Jersey 25");
}

function send() {
  if (responseDone) {
    responseDone = false;
    const activePrompt = inputField.value();

  
    const requestBody = {
      model: "llama3.2:1b",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: activePrompt,
        },
      ],
    };

    options.body = JSON.stringify(requestBody);

    activePromptElement.html("User: " + activePrompt);
    activeResponseElement.html("Assistant: ");

    fetch(url, options)
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((response) => {
        // console.log(response);
        const newAssistantMessage = {
          role: "assistant",
          content: response.choices[0].message.content,
        };
        requestBody.messages.push(newAssistantMessage);
        // console.log(requestBody);
        activeResponseElement.html(newAssistantMessage.content, true);
        responseDone = true;
      });
  }
}
