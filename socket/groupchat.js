module.exports = function(io, Users) {

    const users = new Users();
    // var users = [];
    // Listen for client connections
    io.on('connection', (socket) => {
        console.log('User connected');
        // Listen for join event 
        socket.on('join', (params, callback) => {
            // Allows socket to join particular group or channel
            console.log(`New user has joined chat room ${params.room}`);
            socket.join(params.room);
            users.AddUserData(socket.id, params.name, params.room);
            console.log(users);
            // users.push(params.name);
            // users.push(params.room);
            // users.push(socket.id);
            callback();
        });

         // Listen for message emit events
         socket.on('createMessage', (message, callback) => {
            console.log(message);
            // Send out received message to other clients
            io.to(message.room).emit('newMessage', { 
                text: message.text,
                room: message.room,
                sender: message.sender
            });
            callback();
         });

    });
   
    
}