const express = require('express');
const { registrarPaciente } = require('../controllers/paciente.controller');
const router = express.Router();

router.post('/',registrarPaciente);

module.exports = router;