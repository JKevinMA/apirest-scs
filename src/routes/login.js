const express = require('express');
const { loginUsuario,registrarUsuarioPACIENTE, loginPaciente } = require('../controllers/login.controller');
const router = express.Router();

router.post('/',loginUsuario);
router.post('/registro',registrarUsuarioPACIENTE);
router.post('/paciente',loginPaciente);

module.exports = router;