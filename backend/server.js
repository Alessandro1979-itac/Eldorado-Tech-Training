const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const devices_routes = require('./api/routes/devices');
const categories_routes = require('./api/routes/categories');
const usuarios_routes = require('./api/routes/usuarios');

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/device', devices_routes);
app.use('/api/category', categories_routes);
app.use('/api/users', usuarios_routes);

app.use(cors());

app.use((_req, _res, next) => {
  const erro = new Error('Não encontrado');
  erro.status = 404;
  next(erro);
});

app.use((error, _req, res, _next) => {
  res.status(error.status || 500);
  return res.send({ erro: { message: error.message } });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`⚡[start]:🚀 ${process.env.BASE}${process.env.PORT}`);
});
