const express = require('express');
const router = express.Router();
const login = require('../../middleware/login');

const {
  getDevices,
  insertDevice,
  deleteDevice,
} = require('../controllers/controllerDevice');

router.get('', getDevices);

router.post('/save', login.required, insertDevice);

router.delete('/delete/:Id', login.required, deleteDevice);

module.exports = router;
