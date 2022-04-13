const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = () => {
  const app = express();

  const options = {
    origin: true,
    credentials: true,
    maxAge: 3600,
  };

  app.use(cors(options));

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || 8080);

  // MIDDLEWARES
  app.use(bodyParser.json());

  return app;
};
