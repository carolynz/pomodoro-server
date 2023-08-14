const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let connectedClients = 0;

app.get("/", (req, res) => {
  res.send("hola :)");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // Increment the connected client count and notify all clients
  connectedClients++;
  io.emit("updateClientCount", connectedClients);
  console.log("connected clients: ", connectedClients);

  const createdMessage = (msg) => {
    console.log("message: ", msg);
    socket.broadcast.emit("newIncomingMessage", msg);
  };

  socket.on("createdMessage", createdMessage);

  socket.on("disconnect", () => {
    // Decrement the connected client count and notify all clients
    connectedClients--;
    io.emit("updateClientCount", connectedClients);
    console.log("a user disconnected");
    console.log("connected clients: ", connectedClients);
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
