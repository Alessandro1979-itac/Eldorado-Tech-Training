// const { default: knex } = require('knex');
// const mysql = require('../../config/mysql');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const database = knex(mysql);
// database.migrate.latest([mysql]);

// const createUser = async (req, res, next) => {
//   try {
//     const hash = await bcrypt.hashSync(req.body.password, 10);
//     await database.transaction((trx) => {
//       database
//         .table('Users')
//         .insert(req.body, req.body.hash)
//         .then((resp) => {
//           trx.commit;
//           console.log('Success! User were inserted');
//           res.status(200).send(JSON.parse('{"response":"ok"}'));
//         }, next);
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// const loginUser = async (req, res, _next) => {
//   try {
//     const query = `SELECT * FROM Users WHERE email = ?`;
//     const results = await database.execute(query, [req.body.email]);

//     if (results.length < 1) {
//       return res.status(401).send({ message: 'Falha na autenticação' });
//     }

//     if (await bcrypt.compareSync(req.body.password, results[0].password)) {
//       const token = jwt.sign(
//         {
//           userId: results[0].userId,
//           email: results[0].email,
//         },
//         process.env.JWT_KEY,
//         {
//           expiresIn: '1h',
//         }
//       );
//       return res.status(200).send({
//         message: 'Autenticado com sucesso',
//         token: token,
//       });
//     }
//     return res.status(401).send({ message: 'Falha na autenticação' });
//   } catch (error) {
//     return res.status(500).send({ message: 'Falha na autenticação' });
//   }
// };

// module.exports = { createUser, loginUser };
const mysqlConnection = require('../../config/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const data = { email: email, password: hash };

  const sql = 'INSERT INTO Users SET ?';

  mysqlConnection.query(sql, data, (err, results) => {
    if (err) res.status(400).send({ error: err.message });
    const response = {
      mensagem: 'Usuário criado com sucesso',
      usuarioCriado: {
        userId: results.insertId,
        email: req.body.email,
      },
    };
    res.status(201).send(response);
  });
};

const loginUser = async (req, res, _next) => {
  try {
    const sql = `SELECT * FROM Users WHERE email = ?`;
    var results = await mysqlConnection.query(sql, req.body.email);

    if (results.length < 1) {
      return res.status(401).send({ message: 'Falha na autenticação' });
    }

    if (await bcrypt.compare(req.body.password, results[0].password)) {
      const token = jwt.sign(
        {
          userId: results[0].userId,
          email: results[0].email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h',
        }
      );
      return res.status(200).send({
        message: 'Autenticado com sucesso',
        token: token,
      });
    }
    return res.status(401).send({ message: 'Falha na autenticação' });
  } catch (error) {
    return res.status(500).send({ message: 'Falha na autenticação' });
  }
};

module.exports = { createUser, loginUser };
