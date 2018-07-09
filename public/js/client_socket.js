

$(function (){
    var socket = io();
    var user;

    //game logic 
    var currentPlayer = false;
    var playerSign="";
    var playerName;
    var arrP1 = [];

    var $btnG = $(".btnGrid");
    var $instMsg = $('#inst');

    socket.on('playerAdded', function (data) {
        console.log(1111+data.name, data.id);
        currentPlayer = data.turn;
        playerName = data.name;
        playerSign=(data.name==='sam')?"X":"O";
        if(currentPlayer===true){
            $instMsg.html('Its your turn');
        }else{
            $instMsg.html('Wait your turn');
        }
    });   

    socket.on('nextTurn', function(data){
        $(`#${data[2]}`).prop('disabled', true);
        console.log('passed data '+data[3]);
        $(`#${data[2]}`).html(data[3]);
        var msg = (playerName === 'sam' && data[0]) || ((playerName === 'mas' && data[1]))?"Its your turn":"Wait for your turn";
        currentPlayer=true;
        $instMsg.html(msg);
    });

    $btnG.click(function () {
        console.log($btnG);
        if(currentPlayer===true){
            arrP1.push(+$(this).val());
            currentPlayer = false;
            this.innerText = playerSign;
            console.log(arrP1);
            $instMsg.html('Wait for you turn');
            $(this).prop('disabled', true);
            socket.emit('onTurn', [playerName, $(this).val(), playerSign, arrP1]);  
        } 
    });

    socket.on('matchend', function (data) {
        $btnG.prop('disabled', true);
        $instMsg.html((data === playerName)?'You won the match':'Better luck next time');
    });

    
});

