const { Categoria, Usuario } = require('../models');
const Role = require('../models/role');


const esRolValido =  async(role = '') =>{
    const existeRol = await Role .findOne({ role });
    if (!existeRol){
        throw new Error(`El rol ${ role } no está registrado en la base de datos.`); 
    }
}

// Validar si el email existe o no
const emailExiste = async(email) => {
    
    const existeEmail = await Usuario.findOne( {email} );
    if ( existeEmail ){
        throw new Error (`El correo ${ email } ya existe`);
    }
}

// Validar si el usuario existe o no
const usuarioExiste = async( id ) => {
    
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ){
        throw new Error (`No existe ningun usuario con el id ${ id }`);
    }
}

// Validar si el usuario existe o no
const categoriaExiste = async( id ) => {
    
    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria || !existeCategoria.status ){
        throw new Error (`No existe ninguna categoria con el id ${ id }`);
    }
}




module.exports = {
    esRolValido,
    emailExiste,
    usuarioExiste,
    categoriaExiste
}