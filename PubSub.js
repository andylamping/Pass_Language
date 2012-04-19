// Equivalent implementations of a small publish-subscribe server using Pass and raw Node.js:

// Run with:
// $ node PubSub.js

var app = require('http').createServer(handler)
 , io = require('socket.io').listen(app)
 , fs = require('fs')

app.listen(8080);

function handler (req, res) {
 fs.readFile(__dirname + '/index.html',
 function (err, data) {
   if (err) {
     res.writeHead(500);
     return res.end('Error loading index.html');
   }

   res.writeHead(200);
   res.end(data);
 });
}

io.sockets.on('connection', function (socket) {
 socket.on('subscribe', function (channel) {
   socket.join(channel);
 });
 socket.on('publish', function(msg, channel) {
   socket.broadcast.to(channel).emit(msg);
 });
});