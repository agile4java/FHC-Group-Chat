$(document).ready(function(){
    var socket = io();
    var room = $('#groupName').val();
    var sender = $('#sender').val();

   

    // Listen for and connect to server
    socket.on('connect', function(){
        console.log('User connected to server');
        // Get groupName from input field in group.ejs
        var params = {
            room: room
        }
        // Emit a join event for the groupName room
        socket.emit('join', params, function(){
            console.log(`User has joined chat room ${params.room}`);
        });
    });
    // Listen for new events after connected
    socket.on('newMessage', function(data) {
        var template = $('#message-template').html();
        var message = Mustache.render(template, {
            text: data.text,
            sender: data.from,
        });
        $('#messages').append(message);
    })
    // Emit message
    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        var msg = $('#msg').val();
        // Emit with socket
        // 1st param - event
        // 2nd param - object containing message
        socket.emit('createMessage', { 
            text: msg,
            room: room,
            from: sender
        }, function() {
            // Clear new message textArea after msg is sent
            $('#msg').val('');
        });
    });
});