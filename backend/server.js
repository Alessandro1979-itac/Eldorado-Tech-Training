const app = require('./config/express')();
const devices_routes = require('./api/routes/devices');
const categories_routes = require('./api/routes/categories');
const usuarios_routes = require('./api/routes/usuarios');

const port = app.get('port');

app.use('/api/device', devices_routes);
app.use('/api/category', categories_routes);
app.use('/api/usuario', usuarios_routes);

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  // console.log(`Servidor rodando na porta ${port}`);
  console.log(`⚡[start]:🚀 ${process.env.BASE}${process.env.PORT}`);
});
