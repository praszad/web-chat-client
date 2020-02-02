const socket = io("http://localhost:2000");
const sendButton = document.getElementById("send-button");
let name = prompt("Whats your chat name ?");
socket.emit("user-connected", name);
sendButton.addEventListener("click", e => {
  e.preventDefault();

  const textField = document.getElementById("message-field");
  if (textField) {
    socket.emit("chat message", textField.value);
    const messageContainer = document.getElementById("message-container");
    var div = document.createElement("div");
    var p = document.createElement("p");
    p.textContent = "You: " + textField.value;
    div.appendChild(p);
    div.setAttribute("class", "container");
    messageContainer.appendChild(div);
    textField.value = "";
  }
});
socket.on("reply-message", msg => {
  const messageContainer = document.getElementById("message-container");
  var div = document.createElement("div");
  var p = document.createElement("p");
  p.textContent = msg;
  div.appendChild(p);
  div.setAttribute("class", "container darker");
  messageContainer.appendChild(div);
});
socket.on("connection-socket", msg => {
  const messageContainer = document.getElementById("message-container");
  var div = document.createElement("div");
  var p = document.createElement("p");
  let status = msg.status ? " Disconnected" : " Connected";
  var text = msg.name ? msg.name : msg;
  p.textContent = "User " + text + status;
  div.appendChild(p);
  let className = msg.status ? " container darker" : " container";
  div.setAttribute("class", className);
  messageContainer.appendChild(div);
});
