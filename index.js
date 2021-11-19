const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');
// const orders = require('./routes/orders');
// const products = require('./routes/products');
const users = require('./routes/users');
// const auth = require('./routes/auth');

const { port, dbUrl, secret } = config;
const app = express();

// TODO: Conexión a la Base de Datos (MongoDB o MySQL)

mongoose.connect('mongodb+srv://sofia:hegs8305265h3@cluster0.ju5dc.mongodb.net/test')
  .then(() => console.info('Se ha conectado a mongoose'))
  .catch((err) => console.info('No se puede conectar a mongoose', err));

app.set('config', config);
app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware(secret));

app.listen(port, () => {
  console.info(`App listening on port ${port}`);
});
// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }
  // ruta
  // app.use('/auth', auth);
  // app.use('/orders', orders);
  // app.use('/products', products);
  // app.use('/users', users);
  // app.use(errorHandler);
});
module.exports = app;
