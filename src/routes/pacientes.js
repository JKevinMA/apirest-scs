const express = require('express');
const { registrarPaciente,obtenerPaciente,obtenerPacientes,registrarHistoriaClinica, registrarAtencionMedica, registrarAtencionMedica_2 } = require('../controllers/paciente.controller');
const router = express.Router();

router.post('/',registrarPaciente);
router.get('/:dni',obtenerPaciente);
router.get('/',obtenerPacientes);
router.post('/historia-clinica',registrarHistoriaClinica);
router.post('/atencion-medica',registrarAtencionMedica);
router.post('/atencion-medica-2',registrarAtencionMedica_2);

module.exports = router;