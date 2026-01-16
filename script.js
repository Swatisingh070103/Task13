//new fresh code to check its working
const recognition = new webkitSpeechRecognition(); // for Chrome compatibility
recognition.continuous = false;
recognition.interimResults = true;
document.getElementById("chat-icon").addEventListener("click", function () {
  document.getElementById("chat-widget").style.display = "flex";
  document.getElementById("chat-icon").style.display = "none";
});
document.getElementById("mic-btn").addEventListener("click", function () {
  startVoiceRecognition();
});

document.getElementById("close-icon").addEventListener("click", function () {
  document.getElementById("chat-widget").style.display = "none";
  document.getElementById("chat-icon").style.display = "block";
});

document.getElementById("send-btn").addEventListener("click", function () {
  sendMessage();
});

document
  .getElementById("chat-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
function sendMessage() {
  const chatInput = document.getElementById("chat-input");
  const message = chatInput.value.trim();

  if (message !== "") {
    const chatBody = document.getElementById("chat-body");

    // Display user's message
    const userMessageElement = document.createElement("div");
    userMessageElement.className = "chat-message user-message";
    userMessageElement.innerHTML = `<span>${message}</span><span class="timestamp">${getCurrentTime()}</span>`;
    chatBody.appendChild(userMessageElement);

    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // Get a response from the chatbot
    getResponse(message);
  }
}

function getResponse(userMessage) {
  const chatBody = document.getElementById("chat-body");

  let botResponse = "";

  // Basic response logic
  if (userMessage.toLowerCase() === "hello") {
    botResponse = "Hello! How can I assist you today?";
  } else if (userMessage.toLowerCase() === "how are you?") {
    botResponse = "I am just a bot, but I am here to help you!";
  } else if (userMessage.toLowerCase().includes("documents required")) {
    botResponse =
      "To open a bank account, you typically need proof of identity (e.g., passport, driver's license) and proof of address (e.g., utility bill).";
  } else if (userMessage.toLowerCase().includes("apply for a credit card")) {
    botResponse =
      "You can apply for a credit card online through our website or by visiting a branch. You'll need to provide your income details and other personal information.";
  } else if (userMessage.toLowerCase().includes("types of accounts")) {
    botResponse =
      "We offer savings accounts, checking accounts, CDs, and various types of retirement accounts. Each has different features and benefits.";
  } else if (userMessage.toLowerCase().includes("transfer funds")) {
    botResponse =
      "You can transfer funds between your accounts online, through our mobile app, or at a branch. You'll need the recipient's account details.";
  } else if (userMessage.toLowerCase().includes("check account balance")) {
    botResponse =
      "You can check your account balance online, through our mobile app, at an ATM, or by calling our customer service.";
  } else if (userMessage.toLowerCase().includes("ATM fees")) {
    botResponse =
      "Using an ATM outside our network may incur fees. Please check our fee schedule for details.";
  } else if (userMessage.toLowerCase().includes("direct deposit")) {
    botResponse =
      "To set up direct deposit, provide your employer with our routing number and your account number. They'll handle the rest.";
  } else if (userMessage.toLowerCase().includes("lost credit card")) {
    botResponse =
      "If your credit card is lost or stolen, contact us immediately to report it. We'll cancel the card and issue a replacement.";
  } else if (userMessage.toLowerCase().includes("personal loan")) {
    botResponse =
      "You can apply for a personal loan online or at a branch. We'll review your credit history and income to determine eligibility.";
  } else if (
    userMessage.toLowerCase().includes("interest rates on savings accounts")
  ) {
    botResponse =
      "Our current interest rates on savings accounts vary. You can find the latest rates on our website or by contacting customer service.";
  } else if (userMessage.toLowerCase().includes("contact")) {
    botResponse =
      "You can contact us by phone at <a href='tel:[phone number]'>[+91 3425678932]</a>, " +
      "visit our website for live chat <a href='https://www.example.com'>here</a>, " +
      "or visit a branch near you <a href='https://www.example.com/branches'>here</a>.";
    //   "You can contact us by phone at [phone number], visit our website for live chat, or visit a branch near you.";
  } else {
    botResponse =
      "I am not sure how to respond to that. Can you please rephrase your question?";
  }

  // Display bot's response
  setTimeout(function () {
    const botMessageElement = document.createElement("div");
    botMessageElement.className = "chat-message bot-message";
    botMessageElement.innerHTML = `<div>
                                           <span>${botResponse}</span>
                                           <span class="timestamp">${getCurrentTime()}</span>
                                       </div>
                                       <div class="feedback-buttons">
                                           <button class="like-button">ð   </button>
                                           <button class="unlike-button">ð   </button>
                                       </div>`;
    chatBody.appendChild(botMessageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1000); // Simulate a delay for the bot response
}

function getCurrentTime() {
  const now = new Date();
  return (
    now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
  );
}

function startVoiceRecognition() {
  const micBtn = document.getElementById("mic-btn");
  micBtn.classList.add("listening"); // Add a CSS class to indicate listening state

  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    const chatInput = document.getElementById("chat-input");
    chatInput.value = transcript;
  };

  recognition.onend = function () {
    recognition.stop();
    micBtn.classList.remove("listening"); // Remove the CSS class when recognition stops
  };
}
