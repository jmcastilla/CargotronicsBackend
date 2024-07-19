const express = require('express');
const router = express.Router();
const ContratosController = require('../controller/ContratosController');

router.get('/getcontrolestrafico', ContratosController.get_controlestrafico);

module.exports = router;
