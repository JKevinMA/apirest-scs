const express = require('express');
const { registrarPersonalMedico } = require('../controllers/personal-medico.controller');
const router = express.Router();

router.post('/',registrarPersonalMedico);

module.exports = router;