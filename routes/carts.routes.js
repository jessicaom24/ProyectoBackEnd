const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const cartManager = new CartManager();

// Crear nuevo carrito
router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

// Obtener carrito por ID
router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getById(cid);
  if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }
  res.json(cart.products);
});

// Agregar producto a carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const updatedCart = await cartManager.addProduct(cid, pid);

  if (!updatedCart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }

  if (updatedCart.error) {
    return res.status(404).json({ message: updatedCart.error });
  }

  res.json(updatedCart);
});

// Obtener todos los carritos
router.get('/', async (req, res) => {
  const carts = await cartManager.getAll();
  res.json(carts);
});

module.exports = router;
