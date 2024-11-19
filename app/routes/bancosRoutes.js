const express = require('express');
const router = express.Router();

// Importar el controlador (se creará después)
const bancosController = {
    getAllBancos: async (req, res) => {
        try {
            const bancos = await Bancos.findAll();
            res.json(bancos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getBancoById: async (req, res) => {
        try {
            const banco = await Bancos.findByPk(req.params.id);
            if (banco) {
                res.json(banco);
            } else {
                res.status(404).json({ message: 'Banco no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createBanco: async (req, res) => {
        try {
            const banco = await Bancos.create(req.body);
            res.status(201).json(banco);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateBanco: async (req, res) => {
        try {
            const banco = await Bancos.findByPk(req.params.id);
            if (banco) {
                await banco.update(req.body);
                res.json(banco);
            } else {
                res.status(404).json({ message: 'Banco no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteBanco: async (req, res) => {
        try {
            const banco = await Bancos.findByPk(req.params.id);
            if (banco) {
                await banco.destroy();
                res.json({ message: 'Banco eliminado correctamente' });
            } else {
                res.status(404).json({ message: 'Banco no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// Definir rutas
router.get('/', bancosController.getAllBancos);
router.get('/:id', bancosController.getBancoById);
router.post('/', bancosController.createBanco);
router.put('/:id', bancosController.updateBanco);
router.delete('/:id', bancosController.deleteBanco);

module.exports = router;