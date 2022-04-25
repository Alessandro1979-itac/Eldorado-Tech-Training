// const { default: knex } = require('knex');
// const config = require('../../config/mysql');

// const database = knex(config);
// database.migrate.latest([config]);

// const getDevices = (_req, res, next) => {
//   database
//     .select(
//       'Device.Id AS id',
//       'Device.CategoryId AS categoryId',
//       'Category.Name AS categoryName',
//       'Device.Color AS color',
//       'Device.PartNumber AS partNumber'
//     )
//     .from('Device')
//     .leftJoin('Category', 'Device.CategoryId', 'Category.Id')
//     .then((dados) => res.status(200).send(dados), next);
// };

// const insertDevice = (req, res, next) => {
//   try {
//     database.transaction((trx) => {
//       database
//         .table('Device')
//         .insert(req.body)
//         .then((resp) => {
//           trx.commit;
//           console.log('Great success! Device were inserted');
//           res.status(200).send(JSON.parse('{"response":"ok"}'));
//         }, next);
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// const deleteDevice = (req, res, next) => {
//   try {
//     var id = Number(req.params.deviceId);

//     database.transaction((trx) => {
//       database
//         .table('Device')
//         .where('Id', id)
//         .del()
//         .then((resp) => {
//           if (resp > 0) {
//             trx.commit;
//             console.log('Great success! Device were deleted');
//             res.status(200).send(JSON.parse('{"response":"ok"}'));
//           } else {
//             trx.rollback;
//             console.log('Something went wrong. Device not were deleted');
//             res.sendStatus(404);
//           }
//         }, next);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = {
//   getDevices,
//   insertDevice,
//   deleteDevice,
// };
const mysqlConnection = require('../../config/mysql');

const getDevices = (req, res) => {
  const sql = `SELECT
                Device.Id AS Id,
                Device.CategoryId AS categoryId,
                Category.Name AS categoryName,
                Device.Color AS color,
                Device.PartNumber AS partNumber
                FROM Device LEFT JOIN Category
                ON Device.CategoryId = Category.Id;`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) res.status(400).send({ error: err.message });

    const response = {
      devices: result.map((device) => {
        return {
          Id: device.Id,
          Color: device.Color,
          PartNumber: device.PartNumber,
          category: {
            CategoryId: device.CategoryId,
          },
          request: {
            tipo: 'GET',
            descricao: 'Retorna todos os devices',
            url: `http://localhost:8080/api/device/${dev.Id}`,
          },
        };
      }),
    };
    res.status(201).send(response);
  });
};

const insertDevice = (req, res) => {
  const data = {
    CategoryId: req.body.CategoryId,
    Color: req.body.Color,
    PartNumber: req.body.PartNumber,
  };
  const sql = 'INSERT INTO Device SET ?';

  mysqlConnection.query(sql, data, (err, result) => {
    if (err) res.status(400).send({ error: err.message });
    const response = {
      mensagem: 'Device inserido com sucesso',
      pedidoCriado: {
        Id: result.Id,
        CategoryId: req.body.CategoryId,
        Color: req.body.Color,
        PartNumber: req.body.PartNumber,
      },
    };
    res.status(201).send(response);
  });
};

const deleteDevice = (req, res) => {
  mysqlConnection.query(
    'DELETE FROM Device WHERE Id = ?',
    [req.params.Id],
    (err, _device, _fields) => {
      if (!err)
        res.status(202).send({ message: 'Device deletado com sucesso' });
      else res.status(400).send({ error: err.message });
    }
  );
};

module.exports = {
  getDevices,
  insertDevice,
  deleteDevice,
};
