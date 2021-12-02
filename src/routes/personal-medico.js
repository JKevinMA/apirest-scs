const express = require('express');
const { registrarPersonalMedico, obtenerPersonalMedico } = require('../controllers/personal-medico.controller');
const router = express.Router();

router.post('/',registrarPersonalMedico);
router.get('/',obtenerPersonalMedico);

module.exports = router;