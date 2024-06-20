document.addEventListener("DOMContentLoaded", () => {
  const ws = new WebSocket("ws://localhost:3000");
  const messages = document.getElementById("messages");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  // Manejar mensajes recibidos
  ws.onmessage = (event) => {
    const message = document.createElement("div");
    message.textContent = event.data; // Asignar el texto del mensaje recibido
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight; // Desplazar hacia abajo
  };

  // Enviar mensaje al hacer clic en el botón
  sendButton.addEventListener("click", () => {
    const message = messageInput.value;
    if (message) {
      ws.send(message);
      messageInput.value = "";
    }
  });

  // Enviar mensaje al presionar Enter
  messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      sendButton.click();
    }
  });
});
