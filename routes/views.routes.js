// routes/views.routes.js
const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager'); // Asegúrate que este exista
const productManager = new ProductManager('src/data/products.json'); // ajusta ruta si es diferente

// Ruta para renderizar la vista "home" con los productos
router.get('/home', async (req, res) => {
  try {
    const products = await productManager.getAll(); // ✅ AQUÍ se declara
    res.render('home', { products }); // y se pasa a la vista
  } catch (error) {
    res.status(500).send('Error al cargar los productos');
  }
});

// Ruta para vista en tiempo real (usando websocket más adelante)
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).send('Error al cargar los productos en tiempo real');
  }
});

module.exports = router;
