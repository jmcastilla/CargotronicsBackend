const express = require('express');
const router = express.Router();
const MaestrosController = require('../controller/MaestrosController.js');

/**
 * @swagger
 * /maestros/getrutas:
 *   get:
 *     summary: Obtener rutas
 *     description: Retorna una lista de todas las rutas disponibles para un proyecto específico.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rutas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       IDRuta:
 *                         type: integer
 *                         description: ID de la ruta.
 *                         example: 1
 *                       DescripcionRuta:
 *                         type: string
 *                         description: Descripción de la ruta.
 *                         example: "Ruta A"
 *                       incluir otros campos necesarios aquí
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Token is missing
 *       401:
 *         description: Error de autenticación. El token es inválido o ha expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la autenticación ha fallado.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallando la causa.
 *                   example: Failed to authenticate token
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 */

router.get('/getrutas', MaestrosController.get_rutas);
/**
 * @swagger
 * /maestros/setinsertruta:
 *   post:
 *     summary: Insertar una nueva ruta
 *     description: Inserta una nueva ruta en la base de datos.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DescripcionRuta:
 *                 type: string
 *                 description: Descripción de la ruta.
 *                 example: "Ruta B"
 *               latorigen:
 *                 type: number
 *                 description: Latitud del origen.
 *                 example: 4.60971
 *               lngorigen:
 *                 type: number
 *                 description: Longitud del origen.
 *                 example: -74.08175
 *               latdestino:
 *                 type: number
 *                 description: Latitud del destino.
 *                 example: 3.45164
 *               lngdestino:
 *                 type: number
 *                 description: Longitud del destino.
 *                 example: -76.53199
 *               FKLokCiudadOrigen:
 *                 type: integer
 *                 description: ID de la ciudad de origen.
 *                 example: 1
 *               FKLokCiudadDestino:
 *                 type: integer
 *                 description: ID de la ciudad de destino.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Ruta insertada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     IDRuta:
 *                       type: integer
 *                       description: ID de la nueva ruta.
 *                       example: 1
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Token is missing
 *       401:
 *         description: Error de autenticación. El token es inválido o ha expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la autenticación ha fallado.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallando la causa.
 *                   example: Failed to authenticate token
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 */

router.post('/setinsertruta', MaestrosController.set_insertruta);
/**
 * @swagger
 * /maestros/setupdateruta:
 *   post:
 *     summary: Actualizar una ruta
 *     description: Actualiza una ruta existente en la base de datos.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdRuta:
 *                 type: integer
 *                 description: ID de la ruta.
 *                 example: 1
 *               DescripcionRuta:
 *                 type: string
 *                 description: Descripción de la ruta.
 *                 example: "Ruta B"
 *               latorigen:
 *                 type: number
 *                 description: Latitud del origen.
 *                 example: 4.60971
 *               lngorigen:
 *                 type: number
 *                 description: Longitud del origen.
 *                 example: -74.08175
 *               latdestino:
 *                 type: number
 *                 description: Latitud del destino.
 *                 example: 3.45164
 *               lngdestino:
 *                 type: number
 *                 description: Longitud del destino.
 *                 example: -76.53199
 *               FKLokCiudadOrigen:
 *                 type: integer
 *                 description: ID de la ciudad de origen.
 *                 example: 1
 *               FKLokCiudadDestino:
 *                 type: integer
 *                 description: ID de la ciudad de destino.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Ruta actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     IDRuta:
 *                       type: integer
 *                       description: ID de la ruta actualizada.
 *                       example: 1
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Token is missing
 *       401:
 *         description: Error de autenticación. El token es inválido o ha expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la autenticación ha fallado.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallando la causa.
 *                   example: Failed to authenticate token
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 */

router.post('/setupdateruta', MaestrosController.set_updateruta);
/**
 * @swagger
 * /maestros/settransportadora:
 *   post:
 *     summary: Crear o actualizar transportadora
 *     description: Crea una nueva transportadora o actualiza una existente en la base de datos.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID de la transportadora. Si es -1, se creará una nueva transportadora.
 *                 example: -1
 *               nombre:
 *                 type: string
 *                 description: Nombre de la transportadora.
 *                 example: "Transportadora XYZ"
 *               alias:
 *                 type: string
 *                 description: Alias de la transportadora.
 *                 example: "TransXYZ"
 *     responses:
 *       200:
 *         description: Transportadora creada o actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Información de la transportadora creada o actualizada.
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Token is missing
 *       401:
 *         description: Error de autenticación. El token es inválido o ha expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la autenticación ha fallado.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallando la causa.
 *                   example: Failed to authenticate token
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 */

router.post('/settransportadora', MaestrosController.set_transportadora);
/**
 * @swagger
 * /maestros/gettransportadoras:
 *   post:
 *     summary: Obtener lista de transportadoras
 *     description: Retorna una lista de todas las transportadoras disponibles para el proyecto autenticado.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transportadoras obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       IdTransportadora:
 *                         type: integer
 *                         description: ID de la transportadora.
 *                         example: 1
 *                       NombreTranspo:
 *                         type: string
 *                         description: Nombre de la transportadora.
 *                         example: "Transportadora XYZ"
 *                       AliasTranspo:
 *                         type: string
 *                         description: Alias de la transportadora.
 *                         example: "TransXYZ"
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Token is missing
 *       401:
 *         description: Error de autenticación. El token es inválido o ha expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la autenticación ha fallado.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallando la causa.
 *                   example: Failed to authenticate token
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 */

router.post('/gettransportadoras', MaestrosController.get_transportadoras);
/**
 * @swagger
 * /maestros/getciudades:
 *   get:
 *     summary: Obtener lista de ciudades
 *     description: Retorna una lista de todas las ciudades disponibles para el proyecto autenticado.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ciudades obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       IDCiudad:
 *                         type: integer
 *                         description: ID de la ciudad.
 *                         example: 1
 *                       NombreCiudad:
 *                         type: string
 *                         description: Nombre de la ciudad.
 *                         example: "Bogotá"
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Token is missing
 *       401:
 *         description: Error de autenticación. El token es inválido o ha expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la autenticación ha fallado.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallando la causa.
 *                   example: Failed to authenticate token
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 */

router.get('/getciudades', MaestrosController.get_ciudades);
/**
 * @swagger
 * /maestros/getlocationciudad:
 *   post:
 *     summary: Obtener ubicación de una ciudad
 *     description: Retorna la latitud y longitud de una ciudad específica.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ciudad:
 *                 type: integer
 *                 description: ID de la ciudad.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Ubicación de la ciudad obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     Latitud:
 *                       type: number
 *                       description: Latitud de la ciudad.
 *                       example: 4.7110
 *                     Longitud:
 *                       type: number
 *                       description: Longitud de la ciudad.
 *                       example: -74.0721
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Token is missing
 *       401:
 *         description: Error de autenticación. El token es inválido o ha expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la autenticación ha fallado.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallando la causa.
 *                   example: Failed to authenticate token
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 */

router.post('/getlocationciudad', MaestrosController.get_locationciudad);



module.exports = router;
