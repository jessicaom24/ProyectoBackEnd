
const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');

const cm = new CartManager();

router.post('/', async (req, res) => {
  try {
    const newCart = await cm.createCart();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo crear el carrito' });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await cm.getCartById(req.params.cid);
    cart ? res.json(cart) : res.status(404).json({ error: 'Carrito no encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const updatedCart = await cm.addProductToCart(req.params.cid, req.params.pid);
    if (!updatedCart) {
      return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo agregar el producto al carrito' });
  }
});

module.exports = router;