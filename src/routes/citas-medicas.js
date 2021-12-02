const express = require('express');
const { registrarCitaMedica,obtenerCitasMedicas } = require('../controllers/citas-medicas.controller');
const router = express.Router();

router.post('/',registrarCitaMedica);
router.get('/',obtenerCitasMedicas)
module.exports = router;