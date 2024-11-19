const express = require('express');
const router = express.Router();
const { Ventas, Usuarios, Publicacion, Credito } = require('../models');

const ventasController = {
    getAllVentas: async (req, res) => {
        try {
            const ventas = await Ventas.findAll({
                include: [
                    { model: Usuarios },
                    { model: Publicacion },
                    { model: Credito }
                ]
            });
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getVentaById: async (req, res) => {
        try {
            const venta = await Ventas.findByPk(req.params.id, {
                include: [
                    { model: Usuarios },
                    { model: Publicacion },
                    { model: Credito }
                ]
            });
            if (venta) {
                res.json(venta);
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getVentasByUsuario: async (req, res) => {
        try {
            const ventas = await Ventas.findAll({
                where: { id_usuario: req.params.usuarioId },
                include: [
                    { model: Publicacion },
                    { model: Credito }
                ]
            });
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getVentasByPublicacion: async (req, res) => {
        try {
            const ventas = await Ventas.findAll({
                where: { id_publicacion: req.params.publicacionId },
                include: [
                    { model: Usuarios },
                    { model: Credito }
                ]
            });
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getVentasByCredito: async (req, res) => {
        try {
            const ventas = await Ventas.findAll({
                where: { id_credito: req.params.creditoId },
                include: [
                    { model: Usuarios },
                    { model: Publicacion }
                ]
            });
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createVenta: async (req, res) => {
        try {
            const venta = await Ventas.create(req.body);
            const ventaCompleta = await Ventas.findByPk(venta.id_venta, {
                include: [
                    { model: Usuarios },
                    { model: Publicacion },
                    { model: Credito }
                ]
            });
            res.status(201).json(ventaCompleta);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateVenta: async (req, res) => {
        try {
            const venta = await Ventas.findByPk(req.params.id);
            if (venta) {
                await venta.update(req.body);
                const ventaActualizada = await Ventas.findByPk(req.params.id, {
                    include: [
                        { model: Usuarios },
                        { model: Publicacion },
                        { model: Credito }
                    ]
                });
                res.json(ventaActualizada);
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteVenta: async (req, res) => {
        try {
            const venta = await Ventas.findByPk(req.params.id);
            if (venta) {
                await venta.destroy();
                res.json({ message: 'Venta eliminada correctamente' });
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// Rutas básicas CRUD
router.get('/', ventasController.getAllVentas);
router.get('/:id', ventasController.getVentaById);
router.post('/', ventasController.createVenta);
router.put('/:id', ventasController.updateVenta);
router.delete('/:id', ventasController.deleteVenta);

// Rutas adicionales para relaciones
router.get('/usuario/:usuarioId', ventasController.getVentasByUsuario);
router.get('/publicacion/:publicacionId', ventasController.getVentasByPublicacion);
router.get('/credito/:creditoId', ventasController.getVentasByCredito);

module.exports = router;