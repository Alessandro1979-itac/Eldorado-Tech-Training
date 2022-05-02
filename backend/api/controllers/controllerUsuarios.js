const mysqlConnection = require('../../config/mysql2');
const { handleSQLError } = require('../../config/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createTokens = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: '1h',
  });

  return [token];
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const data = { email: email, password: hash };

  const sql = 'INSERT INTO Users SET ?';

  mysqlConnection.query(sql, data, (err, results) => {
    if (err) res.status(400).send({ error: err.message });
    const response = {
      mensagem: 'User created successfully',
      usuarioCriado: {
        userId: results.userId,
        email: req.body.email,
      },
    };
    res.status(201).send(response);
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    mysqlConnection.query(
      "SELECT * FROM Users WHERE email = '" + email + "' ",
      (err, results) => {
        if (err) return handleSQLError(res, err);
        if (!results.length)
          return res
            .status(404)
            .send(`User with email ${email} does not exist.`);

        const hash = results[0].password;
        bcrypt.compare(password, hash).then((result) => {
          console.log('hashed', result);
          if (result === false)
            return res.status(400).json({ error: 'Invalid Password' });
          else if (result === true) {
            const userData = { ...results[0] };
            userData.password = 'Redacted';

            const token = createTokens({ userData });

            return res.status(201).json({
              message: 'Logged In',
              user: userData,
              token,
            });
          }
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
};

module.exports = { createUser, loginUser };
