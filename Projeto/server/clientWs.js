const WebSocket = require('ws');

const ws = new WebSocket('ws://200.235.93.62:4040');
// const ws = new WebSocket('wss://ecos12-chat-backend-pzty2.ondigitalocean.app');


ws.on('open', function open() {
  console.log('send: something');
  ws.send('{"text":"trhtrhr","nameFrom":null,"date":1651988289176,"isSender":false,"type":"message"}');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});

