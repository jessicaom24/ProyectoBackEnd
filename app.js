const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { Server } = require('socket.io');
const http = require('http');

const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.routes');

const ProductManager = require('./managers/ProductManager');
const productManager = new ProductManager();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// WebSocket
io.on('connection', async socket => {
    console.log('🟢 Cliente conectado');
    socket.emit('productos', await productManager.getAll());

    socket.on('nuevoProducto', async prod => {
    await productManager.add(prod);
    io.emit('productos', await productManager.getAll());
    });

    socket.on('eliminarProducto', async id => {
    await productManager.delete(id);
    io.emit('productos', await productManager.getAll());
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`✅ Servidor escuchando en http://localhost:${PORT}`));

