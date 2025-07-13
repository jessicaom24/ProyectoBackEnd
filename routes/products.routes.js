const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

const pm = new ProductManager();

router.get('/', async (req, res) => {
    const products = await pm.getAll();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const product = await pm.getById(req.params.pid);
    product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || price == null || status == null || !stock || !category || !thumbnails) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const newProduct = await pm.add({ title, description, code, price, status, stock, category, thumbnails });
    res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
    const updated = await pm.update(req.params.pid, req.body);
    updated ? res.json(updated) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.delete('/:pid', async (req, res) => {
    await pm.delete(req.params.pid);
    res.json({ message: 'Producto eliminado' });
});

module.exports = router;
