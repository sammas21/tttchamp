

$(function (){
    var socket = io();
    var user;

    //game logic 
    var currentPlayer = false;
    var playerSign="";
    var playerName;
    var username="default";
    var arrP1 = [];


    var $username = $('#username');
    var $btnLogin = $('#loginBtn');
    var $inp = $("#inputMsg");
    var $inpBtn = $("#sendBtn");
    var $msgBox = $("#chatBox");
    var $btnG = $(".btnGrid");
    var $instMsg = $('#inst');

    

    $( document ).ready(function() {
        $btnG.prop('disabled', true);
        $inpBtn.prop('disabled', true);
        $msgBox.prop('disabled', true);
        $("#loginModal").modal();
    });

    $btnLogin.click(function(){
        username = $username.val();
        if(username!=="default"||username!==""){
            $inpBtn.prop('disabled', false);
            $msgBox.prop('disabled', false);
        }
    });


    socket.on('playerAdded', function (data) {
        //console.log(1111+data.name, data.id);
        currentPlayer = data.turn;
        playerName = data.name;
        playerSign=(data.name==='sam')?"X":"O";
        if (data.name !== 'sam'){
            $btnG.prop('disabled', false);
            if(currentPlayer===true){
                $instMsg.html('Its your turn '+playerSign);
            }else{
                $instMsg.html('Wait for your turn ' + playerSign);
            }
        }else{
            $btnG.prop('disabled', true);
            $instMsg.html('Waiting for a player to join ');
        }
    });  
    
    socket.on('startgame', function(data){
        if (playerName==='sam'){
            $btnG.prop('disabled', false);
            console.log('startgame called');
            $instMsg.html('Its your turn ' + playerSign);
        }
        
    });

    socket.on('nextTurn', function(data){
        $(`#${data[2]}`).prop('disabled', true);
        console.log('passed data '+data[3]);
        $(`#${data[2]}`).html(data[3]);
        var msg = (playerName === 'sam' && data[0]) || ((playerName === 'mas' && data[1]))?"Its your turn " + playerSign:"Wait for your turn "+playerSign;
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
            $instMsg.html('Wait for your turn '+ playerSign);
            $(this).prop('disabled', true);
            socket.emit('onTurn', [playerName, $(this).val(), playerSign, arrP1]);  
        } 
    });

    socket.on('matchend', function (data) {
        $btnG.prop('disabled', true);
        $instMsg.html((data[0] === playerName)?'You won the match':'Better luck next time');
        data[1].forEach(elm => {
            $(`#${elm}`).removeClass("btn-primary");
            $(`#${elm}`).addClass("btn-success");
        });
    });

    ////// Chating logic

    $inpBtn.click(function(){
        if($inp.val()!==""){
            socket.emit('chat', [username, $inp.val()]);
            $inp.val("");
        }

    });

    socket.on('message', function(data){
        console.log('message Recieved');
        $msgBox.html(`<b>${data[0]}</b> : ${data[1]}`);
    });
        

    
});

