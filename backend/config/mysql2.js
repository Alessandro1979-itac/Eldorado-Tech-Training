const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT_DB,
});

connection.connect((error) => {
  if (error) console.log(`Erro ao tentar conectar no MySQL ${error}`);
  else console.log('Conectado ao MySQL');
});

module.exports = connection;
