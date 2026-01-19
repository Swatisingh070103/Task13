//new fresh code to check its working
const recognition = new webkitSpeechRecognition(); // for Chrome compatibility
recognition.continuous = false
recognition.interimResults = true
...<truncated for brevity>...
  recognition.onend = function () {
    recognition.stop();
    micBtn.classList.remove("listening"); // Remove the CSS class when recognition stops
  };
}