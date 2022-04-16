const express = require("express");
const cors    = require('cors');
const { dbConection } = require("../database/config");


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.paths = {
            auth      : '/api/auth',
            buscar    : '/api/buscar',
            usuarios  : '/api/usuarios',
            categorias: '/api/categorias',
            productos : '/api/productos'
        }        

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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios') );
        this.app.use(this.paths.categorias, require('../routes/categorias') );
        this.app.use(this.paths.productos, require('../routes/productos') );
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Servidor corriendo en puerto ${ this.port } `);
        });


    }





}


module.exports = Server;