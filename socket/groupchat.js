module.exports = function(io) {

    // Listen for client connections
    io.on('connection', (socket) => {
        console.log('User connected');
        // Listen for join event 
        socket.on('join', (params, callback) => {
            // Allows socket to join particular group or channel
            socket.join(params.room);
            callback();
        });

         // Listen for message emit events
         socket.on('createMessage', (message) => {
            console.log(message);
            // Send out received message to other clients
            io.to(message.room).emit('newMessage', { 
                text: message.text,
                room: message.room
            });
         });

    });
   
    
}