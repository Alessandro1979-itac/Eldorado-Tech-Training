const express = require('express');
const router = express.Router();
const login = require('../../middleware/login');

const {
  getCategories,
  insertCategory,
  deleteCategory,
} = require('../controllers/controllerCategory');

router.get('/', getCategories);

router.post('/save', login.required, insertCategory);

router.delete('/delete/:Id', login.required, deleteCategory);

module.exports = router;
