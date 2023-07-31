const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "https://basic-chatapp-seven.vercel.app",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('hola :)');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  const createdMessage = (msg) => {
    console.log(msg);
    socket.broadcast.emit("newIncomingMessage", msg);
  };

  socket.on("createdMessage", createdMessage);

});

server.listen(4000, () => {
  console.log('listening on *:4000');
});

