var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.get('/', function(req, res) {
    res.render('chat.ejs');
});

// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket, pseudo) {
    console.log('Un client est connecté !');

    socket.on('new_user', function(pseudo){
        socket.pseudo = pseudo;
        socket.broadcast.emit('new_user', pseudo);
    });

    socket.on('message', function (message) {
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    }); 
});

server.listen(8080);