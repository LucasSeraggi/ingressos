const WebSocketServer = require('ws');

const serverWs = new WebSocketServer({ port: 4001 });

var a = [];

serverWs.on('connection', function connection(conn) {
    var person = a.length;
    a.push(conn);

    console.log('connection');
    // conn.send('connected',  { binary: false });

    conn.on('message', function message(data, isBinary) {
        // console.log(data.toString());
        console.log('new message');
        // conn.send(data,  { binary: isBinary });

        for (let i = 0; i < a.length; i++) {
            if(i != person){
                a[i].send(data,  { binary: isBinary });
            }
            
        }

    });

    conn.on('close', function connection(_) {
        console.log('close');
    });

});

serverWs.on('listening', function connection(_) {
    console.log('listening');
});


