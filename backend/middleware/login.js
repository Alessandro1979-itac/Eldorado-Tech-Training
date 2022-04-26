const jwt = require('jsonwebtoken');

const required = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.users = decode;
    next();
  } catch (error) {
    return res.status(401).send({ mensagem: 'Falha na autenticação' });
  }
};

const optional = (req, _res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.users = decode;
    next();
  } catch (error) {
    next();
  }
};

module.exports = { required, optional };
