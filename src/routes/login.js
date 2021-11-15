const express = require('express');
const { loginUsuario } = require('../controllers/login.controller');
const router = express.Router();

router.post('/',loginUsuario);

module.exports = router;