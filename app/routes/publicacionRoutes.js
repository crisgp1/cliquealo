const express = require('express');
const router = express.Router();
const { Publicacion, Usuarios, Ofertas, Ventas } = require('../models');

const publicacionController = {
    getAllPublicaciones: async (req, res) => {
        try {
            const publicaciones = await Publicacion.findAll({
                include: [
                    { model: Usuarios },
                    { model: Ofertas },
                    { model: Ventas }
                ]
            });
            res.json(publicaciones);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getPublicacionById: async (req, res) => {
        try {
            const publicacion = await Publicacion.findByPk(req.params.id, {
                include: [
                    { model: Usuarios },
                    { model: Ofertas },
                    { model: Ventas }
                ]
            });
            if (publicacion) {
                res.json(publicacion);
            } else {
                res.status(404).json({ message: 'Publicación no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getPublicacionesByUsuario: async (req, res) => {
        try {
            const usuario = await Usuarios.findByPk(req.params.usuarioId, {
                include: [{
                    model: Publicacion,
                    include: [
                        { model: Ofertas },
                        { model: Ventas }
                    ]
                }]
            });
            if (usuario) {
                res.json(usuario.Publicacions);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getOfertasPublicacion: async (req, res) => {
        try {
            const ofertas = await Ofertas.findAll({
                where: { id_publicacion: req.params.id },
                include: [{ model: Usuarios }]
            });
            res.json(ofertas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getVentasPublicacion: async (req, res) => {
        try {
            const ventas = await Ventas.findAll({
                where: { id_publicacion: req.params.id },
                include: [{ model: Usuarios }]
            });
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createPublicacion: async (req, res) => {
        try {
            const publicacion = await Publicacion.create(req.body);
            const publicacionCompleta = await Publicacion.findByPk(publicacion.id_publicacion, {
                include: [
                    { model: Usuarios },
                    { model: Ofertas },
                    { model: Ventas }
                ]
            });
            res.status(201).json(publicacionCompleta);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updatePublicacion: async (req, res) => {
        try {
            const publicacion = await Publicacion.findByPk(req.params.id);
            if (publicacion) {
                await publicacion.update(req.body);
                const publicacionActualizada = await Publicacion.findByPk(req.params.id, {
                    include: [
                        { model: Usuarios },
                        { model: Ofertas },
                        { model: Ventas }
                    ]
                });
                res.json(publicacionActualizada);
            } else {
                res.status(404).json({ message: 'Publicación no encontrada' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deletePublicacion: async (req, res) => {
        try {
            const publicacion = await Publicacion.findByPk(req.params.id);
            if (publicacion) {
                await publicacion.destroy();
                res.json({ message: 'Publicación eliminada correctamente' });
            } else {
                res.status(404).json({ message: 'Publicación no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// Rutas básicas CRUD
router.get('/', publicacionController.getAllPublicaciones);
router.get('/:id', publicacionController.getPublicacionById);
router.post('/', publicacionController.createPublicacion);
router.put('/:id', publicacionController.updatePublicacion);
router.delete('/:id', publicacionController.deletePublicacion);

// Rutas adicionales para relaciones
router.get('/usuario/:usuarioId', publicacionController.getPublicacionesByUsuario);
router.get('/:id/ofertas', publicacionController.getOfertasPublicacion);
router.get('/:id/ventas', publicacionController.getVentasPublicacion);

module.exports = router;