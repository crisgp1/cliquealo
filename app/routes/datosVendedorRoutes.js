const express = require('express');
const router = express.Router();
const { DatosVendedor, Usuarios } = require('../models');

const datosVendedorController = {
    getAllDatosVendedores: async (req, res) => {
        try {
            const datosVendedores = await DatosVendedor.findAll({
                include: [{ model: Usuarios }]
            });
            res.json(datosVendedores);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getDatosVendedorById: async (req, res) => {
        try {
            const datosVendedor = await DatosVendedor.findByPk(req.params.id, {
                include: [{ model: Usuarios }]
            });
            if (datosVendedor) {
                res.json(datosVendedor);
            } else {
                res.status(404).json({ message: 'Datos de vendedor no encontrados' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getDatosVendedorByUsuario: async (req, res) => {
        try {
            const datosVendedor = await DatosVendedor.findOne({
                where: { id_usuario: req.params.usuarioId },
                include: [{ model: Usuarios }]
            });
            if (datosVendedor) {
                res.json(datosVendedor);
            } else {
                res.status(404).json({ message: 'Datos de vendedor no encontrados para este usuario' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createDatosVendedor: async (req, res) => {
        try {
            // Verificar si ya existe un registro para este usuario
            const existente = await DatosVendedor.findOne({
                where: { id_usuario: req.body.id_usuario }
            });

            if (existente) {
                return res.status(400).json({ 
                    message: 'Ya existen datos de vendedor para este usuario' 
                });
            }

            const datosVendedor = await DatosVendedor.create(req.body);
            const datosCompletos = await DatosVendedor.findByPk(datosVendedor.id_datos_vendedor, {
                include: [{ model: Usuarios }]
            });
            res.status(201).json(datosCompletos);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateDatosVendedor: async (req, res) => {
        try {
            const datosVendedor = await DatosVendedor.findByPk(req.params.id);
            if (datosVendedor) {
                await datosVendedor.update(req.body);
                const datosActualizados = await DatosVendedor.findByPk(req.params.id, {
                    include: [{ model: Usuarios }]
                });
                res.json(datosActualizados);
            } else {
                res.status(404).json({ message: 'Datos de vendedor no encontrados' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteDatosVendedor: async (req, res) => {
        try {
            const datosVendedor = await DatosVendedor.findByPk(req.params.id);
            if (datosVendedor) {
                await datosVendedor.destroy();
                res.json({ message: 'Datos de vendedor eliminados correctamente' });
            } else {
                res.status(404).json({ message: 'Datos de vendedor no encontrados' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// Rutas básicas CRUD
router.get('/', datosVendedorController.getAllDatosVendedores);
router.get('/:id', datosVendedorController.getDatosVendedorById);
router.post('/', datosVendedorController.createDatosVendedor);
router.put('/:id', datosVendedorController.updateDatosVendedor);
router.delete('/:id', datosVendedorController.deleteDatosVendedor);

// Ruta adicional para obtener datos por usuario
router.get('/usuario/:usuarioId', datosVendedorController.getDatosVendedorByUsuario);

module.exports = router;