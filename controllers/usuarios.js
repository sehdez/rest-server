const { response, request } = require("express");
const usuario = require("../models/usuario");
const Usuario = require('../models/usuario');
const bcrypt  = require('bcryptjs');
const { emailExiste } = require("../helpers/db-validators");


const usuariosGet =  async(req = request, res = response)=> {

    const { limite = 5, desde = 0 } = req.query;
    
    // const usuarios = await Usuario.find({ estado:true })
    //     .skip( Number( desde ) )
    //     .limit( Number( limite ) )
    
    // const totalUsuarios = await Usuario.countDocuments({ estado:true })

    // Convina los dos await que estan comentados para que se ejecuten al mismo tiempo

    const [ totalUsuarios, usuarios ] = await Promise.all([
        Usuario.countDocuments({ estado:true }),
        Usuario.find({ estado:true })
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ])


    
    return  res.json({
        totalUsuarios,
        usuarios
    });
}


const usuariosPost = async(req = request, res = response)=> {
    
    try {
        
        const { name, email, password, role } = req.body;
        const usuario = new Usuario( { name, email, password, role } );
    
        // hacer el Hash de la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
    
        // Guardar en BD
        await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: 'Pongase en contacto con el Administrador'
        });
    }
}


const usuariosPut = async(req = request, res = response)=> {
    const { id } = req.params;
    const { password, google, email, ...resto } = req.body;
    // TODO: Validar contra la base de datos 
    if ( password ){
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        usuario
    });
}

const usuariosPatch = (req = request, res = response)=> {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = async(req = request, res = response)=> {
    const { id } = req.params;
    // Borrar fisicamente un usuario pero eso ya no es valido hacerlo
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { state: false } )
    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}