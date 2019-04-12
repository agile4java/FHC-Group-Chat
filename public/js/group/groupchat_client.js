$(document).ready(function(){
    // Global IO variable
    var socket = io();
    var room = $('#groupName').val();
    var name = $('#sender').val();

   

    // ID002B Connect to Server
    socket.on('connect', function(){
        console.log('User connected to server');
        // Get groupName from input field in group.ejs
        var params = {
            room: room,
            name: name
        }
        // ID 001A Emit a join event for the groupName room
        socket.emit('join', params, function(){
            console.log(`User has joined chat room ${params.room}`);
        });
    });

    // // ID006B
    // socket.on('usersList', function(users) {

    //     var ol = $('<ol></ol>');
    //     for(var i = 0; i < users.length; i++) {
    //         ol.append('<p>'+ users[i] +'</p>');
    //     }
    //     $('#roomMembers').html(ol);
    // });


    // ID003A Client Sending New Message
    // To be displayed using Mustache template
    socket.on('newMessage', function(data) {
        var template = $('#message-template').html();
        var message = Mustache.render(template, {
            text: data.text,
            name: data.name,
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
        console.log("public/js/groupchat_client.js socket.emit: ");
        // ID005A
        socket.emit('createMessage', { 
            text: msg,
            room: room,
            name: name
        }, function() {
            // Clear new message textArea after msg is sent
            $('#msg').val('');
        });
    });
});