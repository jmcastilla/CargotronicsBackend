const express = require('express');
const router = express.Router();
const APIController = require('../controller/APIController');



router.get('/api/getrutas', APIController.get_rutas);
router.post('/api/crearcontrato', APIController.crear_contrato);


module.exports = router;
