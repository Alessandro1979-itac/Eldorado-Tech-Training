module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
};

exports.execute = (query, params = []) => {
  return new Promise((resolve, reject) => {
    this.client.query(query, params, (error, result, _fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
