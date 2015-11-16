var fs = require('fs');
var app = require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('index.html'));
}).listen(4000);

console.log('in');

//Socket.io
var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {

  console.log('count',socket.client.conn.server.clientsCount);
  io.sockets.emit('count', socket.client.conn.server.clientsCount);

  socket.on('disconnect', function(data) {
    console.log('exit',socket.client.conn.server.clientsCount);
    io.sockets.emit('count', socket.client.conn.server.clientsCount);
  });
});