// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 

app.use(express.static(__dirname + '/public')); 
//redirect / to our index.html file

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(client) {  
	console.log('client connected');
    client.on('chat message', function(msg){
        io.emit('chat message', msg)
    })
	
});


//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
}); 