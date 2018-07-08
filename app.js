
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var clients = 0;
users = [];
io.on('connection', function(socket){
    
    clients++;
    console.log(`${clients} ${clients>1?'clients':'client'} connected`);
    

    socket.on('userNameSet', function(data){
        console.log("In usernameset :",data);
        
            users.push(data);
            socket.emit('userSet', {username: data});
            console.log('data enetered in array  :',data);
       
    });

    socket.on('chat', function(msg){
        //console.log('msg : '+msg);
        io.emit('chat', msg);        
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('userType', data);
        setTimeout(function(){
            socket.broadcast.emit('userTypeStop', "");

        },2000)
        console.log(data);
    });

    // socket.on('typingStop', function(data){
    //     socket.emit('userTypeStop', data);
    //     console.log(data);
    // });

    socket.on('disconnect', function(){
        clients--;
        //users.pop(data);
        console.log(`${clients} ${clients>1?'clients':'client'} connected`);
    });
});

http.listen(1000, ()=>{
    console.log('Server started at http://localhost:1000');
});

