const express = require('express');
const router = express.Router();
const { Credito, Usuarios, Bancos } = require('../models');

// Controlador temporal (se moverá a un archivo separado)
const creditoController = {
    getAllCreditos: async (req, res) => {
        try {
            const creditos = await Credito.findAll({
                include: [
                    { model: Usuarios },
                    { model: Bancos }
                ]
            });
            res.json(creditos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getCreditoById: async (req, res) => {
        try {
            const credito = await Credito.findByPk(req.params.id, {
                include: [
                    { model: Usuarios },
                    { model: Bancos }
                ]
            });
            if (credito) {
                res.json(credito);
            } else {
                res.status(404).json({ message: 'Crédito no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getCreditosByUsuario: async (req, res) => {
        try {
            const creditos = await Credito.findAll({
                where: { id_usuario: req.params.usuarioId },
                include: [{ model: Bancos }]
            });
            res.json(creditos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getCreditosByBanco: async (req, res) => {
        try {
            const creditos = await Credito.findAll({
                where: { id_banco: req.params.bancoId },
                include: [{ model: Usuarios }]
            });
            res.json(creditos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createCredito: async (req, res) => {
        try {
            const credito = await Credito.create(req.body);
            const creditoConRelaciones = await Credito.findByPk(credito.id_credito, {
                include: [
                    { model: Usuarios },
                    { model: Bancos }
                ]
            });
            res.status(201).json(creditoConRelaciones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateCredito: async (req, res) => {
        try {
            const credito = await Credito.findByPk(req.params.id);
            if (credito) {
                await credito.update(req.body);
                const creditoActualizado = await Credito.findByPk(req.params.id, {
                    include: [
                        { model: Usuarios },
                        { model: Bancos }
                    ]
                });
                res.json(creditoActualizado);
            } else {
                res.status(404).json({ message: 'Crédito no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteCredito: async (req, res) => {
        try {
            const credito = await Credito.findByPk(req.params.id);
            if (credito) {
                await credito.destroy();
                res.json({ message: 'Crédito eliminado correctamente' });
            } else {
                res.status(404).json({ message: 'Crédito no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// Rutas básicas CRUD
router.get('/', creditoController.getAllCreditos);
router.get('/:id', creditoController.getCreditoById);
router.post('/', creditoController.createCredito);
router.put('/:id', creditoController.updateCredito);
router.delete('/:id', creditoController.deleteCredito);

// Rutas adicionales para relaciones
router.get('/usuario/:usuarioId', creditoController.getCreditosByUsuario);
router.get('/banco/:bancoId', creditoController.getCreditosByBanco);

module.exports = router;