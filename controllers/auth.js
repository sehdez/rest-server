const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/usuario");



const login = async(req = request, res = response) => {
    try {
        const { email, password } = req.body;

        // Verificar si el Usuario existe
        const usuario = await Usuario.findOne( { email } );
        if ( !usuario ){
            return res.status(400).json({
                msg: 'El correo no se encuentra registrado en la base de datos'
            })
        }

        // Verificar si el usuario está activo 
        if (!usuario.state){
            return res.status(400).json({
                msg: 'El usuario no está activo'
            });
        }


        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id);




        res.json({
            usuario,
            token
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salió mal, contacte al administrador de la base de datos'
        })
    }
}




module.exports = {
    login
}