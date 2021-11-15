const express = require('express');
const { getHorarios } = require('../controllers/horarios.controller');
const router = express.Router();

router.get('/',getHorarios);

module.exports = router;