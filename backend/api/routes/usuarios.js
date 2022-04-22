const express = require('express');
const router = express.Router();

const { createUser, login } = require('../controllers/controllerUsuarios');

router.post('/', createUser);
router.post('/login', login);

module.exports = router;
