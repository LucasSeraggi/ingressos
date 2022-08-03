// import WebSocket from 'ws'
import _app from 'express';
const app = _app();

import _s from 'http';
const server = _s.createServer(app);

import { Server } from 'socket.io';
const io = new Server(server);

console.log('Start')

// io.on('connection', () => {
//   console.log('connection');
//  });

io.on('connection', function (client) {

  console.log('client connect...', client.id);

  client.on('login', function name(data) {
    console.log(data);
    io.emit('login', data)
  })

  /*client.on('message', function name(data) {
    console.log(data);
    io.emit('message', data)
  })

  client.on('location', function name(data) {
    console.log(data);
    io.emit('location', data);
  })*/

  client.on('connect', function () {
  })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    // handleDisconnect()
  })
});


server.listen(3000).listeners(()=>{
  console.log('addListener');
});
