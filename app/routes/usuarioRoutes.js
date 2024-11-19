const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { multerUpload, handleMulterError } = require('../middlewares/uploadMiddleware');

// GET routes
router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);

// POST route with proper middleware handling
router.post('/', 
    (req, res, next) => multerUpload(req, res, (err) => {
        if (err) return handleMulterError(err, req, res, next);
        next();
    }),
    usuarioController.createUsuario

);

router.put('/:id', 
    (req, res, next) => multerUpload(req, res, (err) => {
        if (err) return handleMulterError(err, req, res, next);
        next();
    }),
    usuarioController.updateUsuario
);

// DELETE route
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;