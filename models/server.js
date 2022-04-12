const express = require("express");
const cors    = require('cors');
const { dbConection } = require("../database/config");


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        //Conectar base de datos
        this.conectarBD();

        //Middlewares
        this.middlewares();

        // Lectura y Parseo del body
        this.app.use( express.json() );



        //Rutas de la app
        this.routes();
    }

    //Metodo para conectar la base de datos
    async conectarBD(){
        await dbConection();
    }

    middlewares(){

        // Cors
        this.app.use( cors() )

        //Directorio Publico
        this.app.use( express.static('public') );


    }


    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios') );
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Servidor corriendo en puerto ${ this.port } `);
        });


    }





}


module.exports = Server;