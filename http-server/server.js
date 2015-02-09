




// get http and filesystem modules
var http = require('http');
    fs   = require('fs');

// create server using http module
http.createServer(function(req, res) {

    // write to server. set configuration for response
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
    });

    // grab index.html using fs
    var readStream = fs.createReadStream(__dirname + '/index.html');

    // send index.html file to our users
    readStream.pipe(res);

}).listen(1337);

// tell ourselve's what's happening
console.log('Visit me at http://localhost:1337');