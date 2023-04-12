const express = require('express');
const router = express.Router();
const OperacionesController = require('../controller/OperacionesController');

router.post('/getfotoscontrato', OperacionesController.get_fotoscontrato);
router.post('/gethistoricos', OperacionesController.list_historicos);
router.post('/savetrayecto', OperacionesController.save_trayecto);
router.post('/getpoly', OperacionesController.get_poly);
router.get('/gettrayectos', OperacionesController.get_trayectos);
router.get('/geteventos', OperacionesController.get_eventos);
router.post('/getfind2', OperacionesController.get_find2);
router.get('/getcontratostrafico', OperacionesController.get_contratostrafico);
router.post('/updatecontratotrayecto', OperacionesController.update_contratotrayectos);
router.post('/getreportestrafico', OperacionesController.get_reportestrafico);


router.post('/getreportesdevice', OperacionesController.get_reportesdevice);



module.exports = router;
