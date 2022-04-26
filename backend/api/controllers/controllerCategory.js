const { default: knex } = require('knex');
const config = require('../../config/mysql');

const database = knex(config);
database.migrate.latest([config]);

const getCategories = (req, res, next) => {
  database
    .select('Id as id', 'Name as name')
    .from('Category')
    .then((dados) => res.status(200).send(dados), next);
};

const insertCategory = (req, res, next) => {
  try {
    database.transaction((trx) => {
      database
        .table('Category')
        .insert(req.body)
        .then((resp) => {
          trx.commit;
          console.log('Great success! Category were inserted');
          res.status(200).send(JSON.parse('{"response":"ok"}'));
        }, next);
    });
  } catch (error) {
    throw error;
  }
};

const deleteCategory = (req, res, next) => {
  try {
    var id = Number(req.params.Id);

    database.transaction((trx) => {
      database
        .table('Category')
        .where('Id', id)
        .del()
        .then((resp) => {
          if (resp > 0) {
            trx.commit;
            console.log('Great success! Category were deleted');
            res.status(200).send(JSON.parse('{"response":"ok"}'));
          } else {
            trx.rollback;
            console.log('Something went wrong. Category not were deleted');
            res.sendStatus(404);
          }
        }, next);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getCategories,
  insertCategory,
  deleteCategory,
};
