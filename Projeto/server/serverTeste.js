const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('request feita!');

    // res.setHeader('Content-Type', 'application/json');

    /*fs.readFile('../src/pages/Main/MainPage.vue', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            res.write(data);
            res.statusCode = 200;
            res.end();
        }
    });*/

    req.on("data", function(chunk) {
        console.log("BODY: " + chunk);
      });
    
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello World\n");
});

server.listen(port, 'localhost', () => {
    console.log(`listening for requests on port ${port}`);

    server.on('connection', (stream) => {
        console.log('someone connected!');
    });
})