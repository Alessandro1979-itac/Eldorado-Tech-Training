const { default: knex } = require('knex');
const mysql = require('../../config/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const database = knex(mysql);
database.migrate.latest([mysql]);

const createUser = async (req, res, next) => {
  try {
    await database.transaction((trx) => {
      database
        .table('Users')
        .insert(req.body)
        .then((resp) => {
          trx.commit;
          console.log('Success! User were inserted');
          res.status(200).send(JSON.parse('{"response":"ok"}'));
        }, next);
    });
  } catch (error) {
    throw error;
  }
};

const loginUser = async (req, res, _next) => {
  try {
    const query = `SELECT * FROM Users WHERE email = ?`;
    const results = await database.execute(query, [req.body.email]);

    if (results.length < 1) {
      return res.status(401).send({ message: 'Falha na autenticação' });
    }

    if (await bcrypt.compareSync(req.body.password, results[0].password)) {
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
