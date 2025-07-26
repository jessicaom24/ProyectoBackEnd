const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

const pm = new ProductManager();

router.get('/', async (req, res) => {
    try {
        const products = await pm.getAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const product = await pm.getById(req.params.pid);
        product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener producto' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await pm.add(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const updated = await pm.update(req.params.pid, req.body);
        updated ? res.json(updated) : res.status(404).json({ error: 'Producto no encontrado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        await pm.delete(req.params.pid);
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

module.exports = router;
