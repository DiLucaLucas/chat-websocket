const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static("public"));

// Manejar conexiones WebSocket
wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");

  ws.on("message", (message) => {
    console.log(`Mensaje recibido: ${message}`);
    // Reenviar el mensaje a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString()); // Enviar el mensaje como texto
      }
    });
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
