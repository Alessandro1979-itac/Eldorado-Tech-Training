const express = require('express');
const router = express.Router();

const {
  getCategories,
  insertCategory,
  deleteCategory,
} = require('../controllers/controllerCategory');

router.get('/get', getCategories);

router.post('/save', insertCategory);

router.delete('/delete/:categoryId', deleteCategory);

module.exports = router;
