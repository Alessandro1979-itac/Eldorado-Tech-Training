const host = process.env.HOST;
const user = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

module.exports = {
  client: 'mysql2',
  connection: {
    host,
    user,
    password,
    database,
  },
};
