const express = require('express');
const router = express.Router();
const APIController = require('../controller/APIController');



router.get('/getrutas', APIController.get_rutas);
router.post('/crearcontrato', APIController.crear_contrato);


module.exports = router;
