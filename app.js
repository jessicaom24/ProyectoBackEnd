const express = require('express');
const app = express();
const PORT = 8080;

const productRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/carts.routes');

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Lencería E-commerce!');
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
