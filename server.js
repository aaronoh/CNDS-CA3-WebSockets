// server.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var users = [];

app.use(express.static(__dirname + '/public'));
//redirect / to our index.html file
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
});
io.on('connection', function (client) {
    console.log('client connected');
    //when a new client connects
    
    client.on('new name', function(user){
        client.nickname = user;
        users.push[client.user];
        io.emit('usernames', users);
        console.log(users);
    })
    io.clients(function (error, clients) {
        if (error) throw error;
        //send the list of clients out to all the clients
        io.emit('clientList', clients);
    });
    client.on('chat message', function (message) {
        io.emit('chat message', message)
    })
});
//start our web server and socket.io server listening
server.listen(3000, function () {
    console.log('listening on *:3000');
});