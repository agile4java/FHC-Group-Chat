module.exports = {

    // Fires whenever someone joins
    join: function(params, callback) {
        console.log(`${params.name} has joined ${params.room} room`);
        socket.join(params.room);
    }
}