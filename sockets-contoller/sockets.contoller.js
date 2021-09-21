

const socketsController = (socket) =>{
    console.log("Client Conected",socket.id);
    socket.on('disconnect',() => {
        console.log("Client Disconnected",socket.id);
    });

    socket.on('send-msg',( payload, callback ) =>{

        const id ="id-base";
        callback(id);
        socket.broadcast.emit('send-msg', payload);
    });
}

module.exports = {
    socketsController
};
