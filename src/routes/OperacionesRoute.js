const express = require('express');
const router = express.Router();
const OperacionesController = require('../controller/OperacionesController');
/**
 * @swagger
 * /operaciones/getfotoscontrato:
 *   post:
 *     summary: Obtener fotos de contrato
 *     description: Endpoint para obtener fotos de contrato.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrato:
 *                 type: string
 *             required:
 *               - contrato
 *     responses:
 *       200:
 *         description: Fotos de contrato obtenidas con éxito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de fotos obtenido
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 */
router.post('/getfotoscontrato', OperacionesController.get_fotoscontrato);
/**
 * @swagger
 * /operaciones/gethistoricos:
 *   post:
 *     summary: Obtener históricos de contratos
 *     description: Endpoint para obtener históricos de contratos en un rango de fechas.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desde:
 *                 type: string
 *                 format: date
 *               hasta:
 *                 type: string
 *                 format: date
 *               placa:
 *                 type: string
 *               empresa:
 *                 type: integer
 *             required:
 *               - desde
 *               - hasta
 *               - placa
 *     responses:
 *       200:
 *         description: Históricos de contratos obtenidos con éxito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de históricos obtenido
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 */
router.post('/gethistoricos', OperacionesController.list_historicos);
router.post('/savetrayecto', OperacionesController.save_trayecto);
router.post('/getpoly', OperacionesController.get_poly);
router.get('/gettrayectos', OperacionesController.get_trayectos);
router.get('/geteventos', OperacionesController.get_eventos);
router.post('/getfind2', OperacionesController.get_find2);
router.get('/getcontratostrafico', OperacionesController.get_contratostrafico);
router.post('/updatecontratotrayecto', OperacionesController.update_contratotrayectos);
router.post('/getreportestrafico', OperacionesController.get_reportestrafico);
router.post('/setreporteautomatico', OperacionesController.set_reporteautomatico);
router.post('/setultimopunto', OperacionesController.set_ultimopunto);
router.post('/setlastcontractdevice', OperacionesController.set_lastcontractdevice);
router.post('/getpolylinetrayecto', OperacionesController.get_polylinetrayecto);
router.get('/getkeyapp', OperacionesController.get_keyApp);
router.get('/getroles', OperacionesController.get_roles);
router.get('/getusuarios', OperacionesController.get_usuarios);
router.post('/getreportesdevice', OperacionesController.get_reportesdevice);
router.post('/getreportescontroldevice', OperacionesController.get_reportescontroldevice);
router.post('/getreportescontroldeviceunico', OperacionesController.get_reportescontroldeviceunico);
router.post('/getreportescontroldevicexequipo', OperacionesController.get_reportescontroldevicexequipo);

module.exports = router;
