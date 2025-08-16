const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Crear carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] });
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener carrito con populate
router.get('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    cart ? res.json(cart) : res.status(404).json({ error: 'Carrito no encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar producto
router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const existing = cart.products.find(p => p.product.toString() === req.params.pid);
    if (existing) existing.quantity++;
    else cart.products.push({ product: req.params.pid });

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE producto específico
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.cid,
      { $pull: { products: { product: req.params.pid } } },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar todos los productos
router.put('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.cid,
      { products: req.body.products },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar cantidad de un producto
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const prod = cart.products.find(p => p.product.toString() === req.params.pid);
    if (!prod) return res.status(404).json({ error: 'Producto no encontrado en carrito' });

    prod.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE todos los productos
router.delete('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: [] }, { new: true });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
