const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./db/mongo');
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.routes');
const methodOverride = require('method-override');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));



// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// MongoDB
connectDB();

// Websocket para realtime (queda igual que antes, pero usando Mongo si quieres)
io.on('connection', socket => {
  console.log('🟢 Cliente conectado');
});

const PORT = 3000;
server.listen(PORT, () => console.log(`✅ Servidor escuchando en http://localhost:${PORT}`));

