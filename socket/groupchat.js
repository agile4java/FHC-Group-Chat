module.exports = function(io, Users) {

    const users = new Users();
    // ID002A Listen for client connections
    io.on('connection', (socket) => {
        console.log('User connected');
        // Listen for join event 
        socket.on('join', (params, callback) => {
            // Allows socket to join particular group or channel
            console.log(`${params.name} has joined chat room ${params.room}`);
            socket.join(params.room);

            // ID001B Catch socket.emit
            users.AddUserData(socket.id, params.name, params.room);
            console.log('socket/groupchat.js users.AddUser:');
            console.log(users);
            // ID006A
            io.to(params.room).emit('usersList', users.GetUsersList(params.room));
        
            callback();
        });

         // ID003B ID005B Receiving client sent new message
         socket.on('createMessage', (message, callback) => {
             console.log("socket/groupchat.js socket.on createMessage: ");
            console.log(message);
            // Send out received message to other clients
            io.to(message.room).emit('newMessage', { 
                text: message.text,
                room: message.room,
                name: message.name
            });
            callback();
         });

        socket.on('disconnect', () => {
            var userRoom =  users.GetUserRoom(socket.id);
            users.DropUser(socket.id);
            io.to(userRoom).emit('usersList', users.GetUsersList(userRoom));
        });

    });
   
    
}