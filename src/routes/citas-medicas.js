const express = require('express');
const { registrarCitaMedica } = require('../controllers/citas-medicas.controller');
const router = express.Router();

router.post('/',registrarCitaMedica);

module.exports = router;