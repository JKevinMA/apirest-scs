const express = require('express');
/* const { getUsuarios,getUsuarioById,createUsuario,updateUsuario,deleteUsuario,loginUsuario } = require('../controllers/usuarios.controller'); */
const { getUsuarios,loginUsuario } = require('../controllers/usuarios.controller');
const router = express.Router();

router.get('/',getUsuarios);
/* 
router.get('/:id',getUsuarioById);

router.post('/',createUsuario) */

router.post('/login',loginUsuario)

/* router.put('/:id',updateUsuario)

router.delete('/:id',deleteUsuario) */

module.exports = router;