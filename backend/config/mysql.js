const mysql = require('mysql2');

const connection = mysql.createConnection({
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

// module.exports = {
//   client: 'mysql2',
//   connection: {
//     host: process.env.HOST,
//     user: process.env.USERNAME,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//   },
// };
