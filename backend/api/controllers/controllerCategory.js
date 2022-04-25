// const { default: knex } = require('knex');
// const config = require('../../config/mysql');

// const database = knex(config);
// database.migrate.latest([config]);

// const getCategories = (req, res, next) => {
//   database
//     .select('Id as id', 'Name as name')
//     .from('Category')
//     .then((dados) => res.status(200).send(dados), next);
// };

// const insertCategory = (req, res, next) => {
//   try {
//     database.transaction((trx) => {
//       database
//         .table('Category')
//         .insert(req.body)
//         .then((resp) => {
//           trx.commit;
//           console.log('Great success! Category were inserted');
//           res.status(200).send(JSON.parse('{"response":"ok"}'));
//         }, next);
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// const deleteCategory = (req, res, next) => {
//   try {
//     var id = Number(req.params.categoryId);

//     database.transaction((trx) => {
//       database
//         .table('Category')
//         .where('Id', id)
//         .del()
//         .then((resp) => {
//           if (resp > 0) {
//             trx.commit;
//             console.log('Great success! Category were deleted');
//             res.status(200).send(JSON.parse('{"response":"ok"}'));
//           } else {
//             trx.rollback;
//             console.log('Something went wrong. Category not were deleted');
//             res.sendStatus(404);
//           }
//         }, next);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = {
//   getCategories,
//   insertCategory,
//   deleteCategory,
// };

const mysqlConnection = require('../../config/mysql');

const getCategories = (_req, res) => {
  const sql = 'SELECT * FROM Category;';

  mysqlConnection.query(sql, (err, category) => {
    if (err) res.status(400).send({ error: err.message });

    const response = {
      category: category.map((cat) => {
        return {
          Id: cat.Id,
          name: cat.name,
          request: {
            tipo: 'GET',
            descricao: 'Retorna todas as categories',
            url: `http://localhost:8080/api/category/${cat.Id}`,
          },
        };
      }),
    };
    res.status(201).send(response);
  });
};

const insertCategory = (req, res) => {
  const data = { name: req.body.name };
  const sql = 'INSERT INTO Category SET ?';

  mysqlConnection.query(sql, data, (err, _results) => {
    if (err) res.status(400).send({ error: err.message });
    else
      res.status(201).send({
        message: 'Category inserido com sucesso',
        category: data,
      });
  });
};

const deleteCategory = (req, res) => {
  mysqlConnection.query(
    'DELETE FROM Category WHERE Id = ?',
    [req.params.Id],
    (err, _category, _fields) => {
      if (!err)
        res.status(202).send({ message: 'Category deletado com sucesso' });
      else res.status(400).send({ error: err.message });
    }
  );
};

module.exports = {
  getCategories,
  insertCategory,
  deleteCategory,
};
