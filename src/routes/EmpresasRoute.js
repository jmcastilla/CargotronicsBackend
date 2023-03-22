const express = require('express');
const router = express.Router();
const EmpresasController = require('../controller/EmpresasController');

router.get('/getempresas', EmpresasController.list_empresas);


module.exports = router;
