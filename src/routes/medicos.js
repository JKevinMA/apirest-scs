const express = require('express');
const { getMedicos } = require('../controllers/medicos.controller');
const router = express.Router();

router.get('/',getMedicos);

module.exports = router;