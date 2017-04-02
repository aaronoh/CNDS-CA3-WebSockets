// server.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//array that stores the list of users
var users = [];
//array used to choose random colours from 
var colours = ["#1abc9c", "#3498db", "#e74c3c", "#f1c40f", "#e67e22"];
app.use(express.static(__dirname + '/public'));
//redirect / to index.html when a request is made at root
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
});
//when a new client connects - 'connection' is recieved form the client
io.on('connection', function (client) {
    console.log('client connected')
        //when 'new name' is recieved from the client
    client.on('new name', function (user) {
        //add data sent by client as nickname to client object
        client.nickname = user;
        //add nicname to users array
        users.push(client.nickname);
        //emit users array to clients
        io.emit('usernames', users);
        console.log("Users: " + users);
    })
    io.clients(function (error, clients) {
        if (error) throw error;
        //send the list of clients out to all the clients
        io.emit('clientList', clients);
    });
    client.on('switchColour', function () {
            //generate random number between 0 and 24
            var colourIndex = Math.floor(Math.random() * (5));
            //use the number generated to choose a colour from thew colours array based on index
            var colour = colours[colourIndex]
            io.emit('newColour', colour)
        })
        //when 'message' is receieved from the client
    client.on('chat message', function (message) {
        //send that message to all clients 
        io.emit('chat message', message)
    })
});
//start our web server and socket.io server listening
server.listen(3000, function () {
    console.log('listening on *:3000');
});