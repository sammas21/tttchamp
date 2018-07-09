
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var clients = 0;
users = [];



io.on('connection', function(socket){
    var player1;
    var player2
    clients++;
    console.log(`${clients} ${clients>1?'1clients':'1client'} connected`);
    
    if (clients === 1) {
            var player1 = new Object();
            player1.name = "sam";
            player1.id = socket.id;
            player1.turn = true;
            socket.emit('playerAdded', player1);
            console.log("111" + player1.name, player1.id);
        } else if (clients === 2) {
            var player2 = new Object();
            player2.name = "mas";
            player2.id = socket.id;
            player2.turn = false;
            socket.emit('playerAdded', player2);
            console.log(player2.name, player2.id);
        } else {
          //  socket.emit('disconnect', 'no space');
        }
   
    

    socket.on('onTurn', function(data){
        if (data[0] === 'sam') {
            console.log(data[2]);
            socket.broadcast.emit('nextTurn', [false, true, data[1], data[2]]);
        } else if (data[0] === 'mas') {
            console.log(data[2]);
            socket.broadcast.emit('nextTurn', [true, false, data[1], data[2]]);
        }
        if(checkWinner(data[3])){
            io.sockets.emit('matchend', data[0]);
        }
            
        
    });    
  
    socket.on('disconnect', function(){
        clients--;
        //users.pop(data);
        console.log(`${clients} ${clients>1?'clients':'client'} connected`);
    });
});

function isS(sub, arr){
    var isSub=2;
    sub.forEach(el => {
      if(arr.includes(el)){

      }else{
          isSub = 1;
      } 
    });
    return isSub===1?false:true;
}

function checkWinner(uarr){
    var w1 = [11, 22, 33];
    var w2 = [11, 12, 13];
    var w3 = [21, 22, 23];
    var w4 = [31, 32, 33];
    var w5 = [11, 21, 31];
    var w6 = [12, 22, 32];
    var w7 = [13, 23, 33];
    var w8 = [31, 22, 13];

    return isS(w1, uarr) || isS(w2, uarr) || isS(w3, uarr) || isS(w4, uarr)||
        isS(w5, uarr) || isS(w6, uarr) || isS(w7, uarr) || isS(w8, uarr);
}


http.listen(4000, ()=>{
    console.log('Server started at http://localhost:1000');
});

