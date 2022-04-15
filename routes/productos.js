const { Router } = require("express");
const { check } = require("express-validator");


const router = Router();

// Mostrar todas las categorias - publico
router.get('/', (req, res) => {
    res.json('get - Productos');
});

// Mostrar una categoría por id - publico
router.get('/:id', (req, res) => {
    res.json('get - Producto - por id');
});

// Crear producto - usuario 
router.post('/', (req, res) => {
    res.json('crear - Productos');
});


// Editar producto - usuario
router.put('/:id', (req, res) => {
    res.json('editar - Productos');
});



// Eliminar producto - Admin
router.delete('/:id', (req, res) => {
    res.json('Delete - Productos');
});



module.exports = router