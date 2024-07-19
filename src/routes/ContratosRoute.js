const express = require('express');
const router = express.Router();
const ContratosController = require('../controller/ContratosController');

router.get('/getcontrolescontrato', ContratosController.get_controlescontrato);

module.exports = router;
