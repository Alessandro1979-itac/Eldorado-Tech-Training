const { default: knex } = require('knex');
const config = require('../../config/mysql');

const database = knex(config);
database.migrate.latest([config]);

const getDevices = (req, res, next) => {
  database
    .select(
      'Device.Id AS id',
      'Device.CategoryId AS categoryId',
      'Category.Name AS categoryName',
      'Device.Color AS color',
      'Device.PartNumber AS partNumber'
    )
    .from('Device')
    .leftJoin('Category', 'Device.CategoryId', 'Category.Id')
    .then((dados) => res.status(200).send(dados), next);
};

const insertDevice = (req, res, next) => {
  try {
    database.transaction((trx) => {
      database
        .table('Device')
        .insert(req.body)
        .then((resp) => {
          trx.commit;
          console.log('Great success! Device were inserted');
          res.status(200).send(JSON.parse('{"response":"ok"}'));
        }, next);
    });
  } catch (error) {
    throw error;
  }
};

const deleteDevice = (req, res, next) => {
  try {
    var id = Number(req.params.deviceId);

    database.transaction((trx) => {
      database
        .table('Device')
        .where('Id', id)
        .del()
        .then((resp) => {
          if (resp > 0) {
            trx.commit;
            console.log('Great success! Device were deleted');
            res.status(200).send(JSON.parse('{"response":"ok"}'));
          } else {
            trx.rollback;
            console.log('Something went wrong. Device not were deleted');
            res.sendStatus(404);
          }
        }, next);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getDevices,
  insertDevice,
  deleteDevice,
};
