const express = require('express');
const router = express.Router();
const EmpresasController = require('../controller/EmpresasController');
/**
 * @swagger
 * /empresas/getempresas:
 *   get:
 *     summary: Obtiene la lista de empresas.
 *     description: Este endpoint obtiene la lista de empresas asociadas al proyecto.
 *     tags:
 *       - Empresas
 *     responses:
 *       200:
 *         description: Lista de empresas obtenida con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de respuesta
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
router.get('/getempresas', EmpresasController.list_empresas);


module.exports = router;
