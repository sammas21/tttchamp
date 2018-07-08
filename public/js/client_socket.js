

$(function (){
    var socket = io();
    var user;

    $('form').submit(function (){
        socket.emit('chat', {username:user, msg: $('#m').val()});
        $('#m').val('');
        return false;
    });
    
    $('#setNameBtn').click(function(){
        console.log( $('#username').val());
        user =  $('#username').val();
        socket.emit('userNameSet', $('#username').val());
    });
    
    socket.on('userSet', function(data){
        user = data.username;    
    })


    socket.on('chat', function (data){
        $('#messages').append($('<li>').html(`<b>${data.username} : +${data.msg}`));
    });

    $('#m').keypress(function(){
        socket.emit('typing', `${user} is typing ......`)
    })     

    socket.on('userTypeStop', function(data){
        $('#status').html(data);
    });

    socket.on('userType', function(data){
        $('#status').html(data);
    });
});