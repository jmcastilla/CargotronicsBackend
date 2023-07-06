const express = require('express');
const router = express.Router();
const DianController = require('../controller/DianController');

router.get('/getarriboembarque', DianController.get_arriboembarque);
router.get('/getconsignatarios', DianController.get_consignatarios);
router.get('/getdeclarantes', DianController.get_declarantes);
router.get('/getdestinatarios', DianController.get_destinatarios);
router.get('/getseccionales', DianController.get_seccionales);
router.get('/gettiposdocaduanero', DianController.get_tiposdocaduanero);
router.get('/getdepositoszonasfranca', DianController.get_depositoszonasfranca);
router.post('/savecontrato', DianController.save_contrato);
router.post('/getcontrato', DianController.get_contratos);



module.exports = router;
