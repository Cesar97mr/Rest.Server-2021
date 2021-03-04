const express = require('express')
const cors = require('cors');


class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares, son funciones que aportan funcionalidad a nuestro server 
       this.middlewares();

        //Rutas de mi Aplicacion
        this.routes();

    }

    middlewares(){
        //Cors
        this.app.use(cors());

        //Lectura y parseo del body a json 

        this.app.use(express.json());

        //Directorio publico estatico
        this.app.use(express.static('public'));
    }

    routes(){
        
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT);
        });
    }

}

module.exports = Server;