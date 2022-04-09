const { response, request } = require("express");




const usuariosGet =  (req, res = response)=> {


    return  res.json({
        ok: true,
        msg: 'get  - controlador'
    });
}

const usuariosPost = (req = request, res = response)=> {
    const body = req.body;
    res.json({
        ok: true,
        msg: 'post API - controlador',
        body
    });
}

const usuariosPut = (req = request, res = response)=> {
    const id = req.params.id;
    const params = req.query;
    res.json({
        ok: true,
        msg: 'put API - controlador',
        id
    });
}

const usuariosPatch = (req = request, res = response)=> {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = (req = request, res = response)=> {
    res.json({
        ok: true,
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}