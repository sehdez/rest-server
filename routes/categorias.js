const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();

// Mostrar todas las categorias - publico
router.get('/', (req, res)=>{
    res.json('GET')
} );

// Mostrar una categoria por id - publico
router.get('/:id', (req, res)=>{
    res.json('GET ID')
} );

// Crear categoria - privado - cualquier usuario
router.post('/', (req, res)=>{
    res.json('POST')
} );

// modificar categoria - privado - cualquier usuario
router.put('/:id', (req, res)=>{
    res.json('PUT')
} );

// Crear categoria - privado - Admin
router.delete('/:id', (req, res)=>{
    res.json('DELETE')
} );


module.exports = router;