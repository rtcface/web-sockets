const express = require('express');
const cors = require('cors'); 
const { socketsController } = require('../sockets-contoller/sockets.contoller');

class Server {

    constructor(params) {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);


        this.paths =  {};
        
        // Middleware
        this.middlewares();

        // Routes for my app
        this.routes();

        // Configuration web sockets

        this.sockets();
    }

    middlewares() {
        
        //cors
        this.app.use( cors() );
        
        // Public dirctory  
        this.app.use(express.static('public'));        
    }

    routes() {        
        //this.app.use(this.pathUserRoute, require('../routes/user.routes'));
    }

    sockets() { 
        this.io.on('connection', socketsController);    
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log(`Express Server run on port ${this.port}`);
        });
    }

}

module.exports = Server;