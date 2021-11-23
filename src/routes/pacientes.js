const express = require('express');
const { registrarPaciente,obtenerPaciente,registrarHistoriaClinica } = require('../controllers/paciente.controller');
const router = express.Router();

router.post('/',registrarPaciente);
router.get('/:dni',obtenerPaciente);
router.post('/historia-clinica',registrarHistoriaClinica);

module.exports = router;