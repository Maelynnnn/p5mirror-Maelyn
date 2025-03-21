// References:
// https://editor.p5js.org/yining/sketches/GO7qaLx-t
// https://platform.openai.com/docs/api-reference/chat/create

// Sign in and generate your OpenAI API key here: https://platform.openai.com/api-keys
// Note: Make sure to keep your API key private because you'll be charged for all requests sent with your API key
const OPENAI_API_KEY = "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";
const url = "https://api.openai.com/v1/chat/completions";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
};

let responseDone = true;
let activeResponseElement;
let activePromptElement;

let inputField;
let sendButton;

function setup() {
  noCanvas();
  createElement("h1", "OpenAI Chat Completion Example without Context");
  inputField = createInput("What is p5.js?");
  sendButton = createButton("Send");
  sendButton.mousePressed(send);
  activePromptElement = createP();
  activeResponseElement = createP();
}

function send() {
  if (responseDone) {
    responseDone = false;
    const activePrompt = inputField.value();

    // See OpenAI API Reference for all properties in Request body:
    // https://platform.openai.com/docs/api-reference/chat/create
    const requestBody = {
      model: "gpt-4o-mini",
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
