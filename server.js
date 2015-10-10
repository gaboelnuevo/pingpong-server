var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', server_port);
app.set('ipaddr', server_ip_address);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(server_port, server_ip_address, function () {
  console.log('Example app listening at http://%s:%s', server_ip_address, server_port);
});
