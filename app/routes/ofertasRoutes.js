const express = require('express');
const router = express.Router();
const { Ofertas, Usuarios, Publicacion } = require('../models');

const ofertasController = {
    getAllOfertas: async (req, res) => {
        try {
            const ofertas = await Ofertas.findAll({
                include: [
                    { model: Usuarios },
                    { model: Publicacion }
                ]
            });
            res.json(ofertas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getOfertaById: async (req, res) => {
        try {
            const oferta = await Ofertas.findByPk(req.params.id, {
                include: [
                    { model: Usuarios },
                    { model: Publicacion }
                ]
            });
            if (oferta) {
                res.json(oferta);
            } else {
                res.status(404).json({ message: 'Oferta no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getOfertasByUsuario: async (req, res) => {
        try {
            const ofertas = await Ofertas.findAll({
                where: { id_usuario: req.params.usuarioId },
                include: [{ model: Publicacion }]
            });
            res.json(ofertas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getOfertasByPublicacion: async (req, res) => {
        try {
            const ofertas = await Ofertas.findAll({
                where: { id_publicacion: req.params.publicacionId },
                include: [{ model: Usuarios }]
            });
            res.json(ofertas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createOferta: async (req, res) => {
        try {
            const oferta = await Ofertas.create(req.body);
            const ofertaCompleta = await Ofertas.findByPk(oferta.id_oferta, {
                include: [
                    { model: Usuarios },
                    { model: Publicacion }
                ]
            });
            res.status(201).json(ofertaCompleta);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateOferta: async (req, res) => {
        try {
            const oferta = await Ofertas.findByPk(req.params.id);
            if (oferta) {
                await oferta.update(req.body);
                const ofertaActualizada = await Ofertas.findByPk(req.params.id, {
                    include: [
                        { model: Usuarios },
                        { model: Publicacion }
                    ]
                });
                res.json(ofertaActualizada);
            } else {
                res.status(404).json({ message: 'Oferta no encontrada' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteOferta: async (req, res) => {
        try {
            const oferta = await Ofertas.findByPk(req.params.id);
            if (oferta) {
                await oferta.destroy();
                res.json({ message: 'Oferta eliminada correctamente' });
            } else {
                res.status(404).json({ message: 'Oferta no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// Rutas básicas CRUD
router.get('/', ofertasController.getAllOfertas);
router.get('/:id', ofertasController.getOfertaById);
router.post('/', ofertasController.createOferta);
router.put('/:id', ofertasController.updateOferta);
router.delete('/:id', ofertasController.deleteOferta);

// Rutas adicionales para relaciones
router.get('/usuario/:usuarioId', ofertasController.getOfertasByUsuario);
router.get('/publicacion/:publicacionId', ofertasController.getOfertasByPublicacion);

module.exports = router;