const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");


const io = new Server(server, {
  cors: {
    origin:'*'
  }
});


io.on('connection', (socket) => {
  console.log(socket.id);
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    socket.broadcast.emit('message',{
      body: message,
      from: socket.id
    })
  })


});

server.listen(4000, () => {
  console.log('listening on *:4000');
});