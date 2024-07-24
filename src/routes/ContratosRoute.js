const express = require('express');
const router = express.Router();
const ContratosController = require('../controller/ContratosController');

/**
 * @swagger
 * /contratos/getlistadispositivos:
 *   get:
 *     summary: Obtener lista de dispositivos
 *     description: Retorna una lista de dispositivos asociados al proyecto del usuario autenticado.
 *     tags:
 *       - Contratos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de dispositivos obtenida exitosamente.
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
 *                       DeviceID:
 *                         type: string
 *                         description: ID del dispositivo.
 *                         example: "123456"
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
router.get('/getlistadispositivos', ContratosController.get_listadispositivos);
/**
 * @swagger
 * /contratos/getmodalidadservicio:
 *   get:
 *     summary: Obtener modalidades de servicio
 *     description: Retorna una lista de modalidades de servicio.
 *     tags:
 *       - Contratos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de modalidades de servicio obtenida exitosamente.
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
 *                       idModalidadServicio:
 *                         type: integer
 *                         description: ID de la modalidad de servicio.
 *                         example: 1
 *                       ModalidadServicio:
 *                         type: string
 *                         description: Nombre de la modalidad de servicio.
 *                         example: "Servicio Básico"
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
router.get('/getmodalidadservicio', ContratosController.get_modalidadservicio);
/**
 * @swagger
 * /contratos/getrutas:
 *   get:
 *     summary: Obtener rutas
 *     description: Retorna una lista de rutas.
 *     tags:
 *       - Contratos
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
 *                       IdRuta:
 *                         type: integer
 *                         description: ID de la ruta.
 *                         example: 1
 *                       DescripcionRuta:
 *                         type: string
 *                         description: Descripción de la ruta.
 *                         example: "Ruta Norte"
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
router.get('/getrutas', ContratosController.get_rutas);
/**
 * @swagger
 * /contratos/getbarras:
 *   get:
 *     summary: Obtener barras
 *     description: Retorna una lista de barras.
 *     tags:
 *       - Contratos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de barras obtenida exitosamente.
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
 *                       BarsID:
 *                         type: string
 *                         description: ID de la barra.
 *                         example: "BAR12345"
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
router.get('/getbarras', ContratosController.get_barras);
/**
 * @swagger
 * /contratos/getcontrolestrafico:
 *   get:
 *     summary: Obtener controles de tráfico
 *     description: Retorna un resumen de los servicios en diferentes estados de control de tráfico.
 *     tags:
 *       - Contratos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumen de controles de tráfico obtenido exitosamente.
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
 *                       Blanco:
 *                         type: integer
 *                         description: Número total de servicios.
 *                         example: 50
 *                       Amarillo:
 *                         type: integer
 *                         description: Número de servicios en estado amarillo.
 *                         example: 30
 *                       Rojo:
 *                         type: integer
 *                         description: Número de servicios en estado rojo.
 *                         example: 20
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
router.get('/getcontrolestrafico', ContratosController.get_controlestrafico);
/**
 * @swagger
 * /contratos/getlistachequeo:
 *   post:
 *     summary: Obtener lista de chequeo
 *     description: Retorna la lista de chequeo para un contrato específico.
 *     tags:
 *       - Contratos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrato:
 *                 type: string
 *                 description: ID del contrato para el cual se solicita la lista de chequeo.
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Lista de chequeo obtenida exitosamente.
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
 *                       id_chequeo:
 *                         type: integer
 *                         description: ID del chequeo.
 *                         example: 1
 *                       usuario1:
 *                         type: string
 *                         description: Usuario 1.
 *                         example: "user1"
 *                       Fk_ContractID:
 *                         type: string
 *                         description: ID del contrato.
 *                         example: "12345"
 *                       patio:
 *                         type: string
 *                         description: Patio.
 *                         example: "patio1"
 *                       naviera:
 *                         type: string
 *                         description: Naviera.
 *                         example: "naviera1"
 *                       doc_conductor1:
 *                         type: string
 *                         description: Documento del conductor 1.
 *                         example: "doc1"
 *                       nombre_conductor1:
 *                         type: string
 *                         description: Nombre del conductor 1.
 *                         example: "nombre1"
 *                       embarcador:
 *                         type: string
 *                         description: Embarcador.
 *                         example: "embarcador1"
 *                       placa1:
 *                         type: string
 *                         description: Placa 1.
 *                         example: "placa1"
 *                       precinto1:
 *                         type: string
 *                         description: Precinto 1.
 *                         example: "precinto1"
 *                       respuestas1:
 *                         type: string
 *                         description: Respuestas 1.
 *                         example: "respuestas1"
 *                       observaciones1:
 *                         type: string
 *                         description: Observaciones 1.
 *                         example: "observaciones1"
 *                       datetime_patio:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora en el patio.
 *                         example: "2024-07-05T08:00:00Z"
 *                       usuario2:
 *                         type: string
 *                         description: Usuario 2.
 *                         example: "user2"
 *                       vigilante1:
 *                         type: string
 *                         description: Vigilante 1.
 *                         example: "vigilante1"
 *                       precinto2:
 *                         type: string
 *                         description: Precinto 2.
 *                         example: "precinto2"
 *                       respuestas2:
 *                         type: string
 *                         description: Respuestas 2.
 *                         example: "respuestas2"
 *                       observaciones2:
 *                         type: string
 *                         description: Observaciones 2.
 *                         example: "observaciones2"
 *                       datetime_iplanta:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora en la planta de ingreso.
 *                         example: "2024-07-05T09:00:00Z"
 *                       usuario3:
 *                         type: string
 *                         description: Usuario 3.
 *                         example: "user3"
 *                       vigilante2:
 *                         type: string
 *                         description: Vigilante 2.
 *                         example: "vigilante2"
 *                       doc_conductor2:
 *                         type: string
 *                         description: Documento del conductor 2.
 *                         example: "doc2"
 *                       nombre_conductor2:
 *                         type: string
 *                         description: Nombre del conductor 2.
 *                         example: "nombre2"
 *                       placa2:
 *                         type: string
 *                         description: Placa 2.
 *                         example: "placa2"
 *                       etiqueta1:
 *                         type: string
 *                         description: Etiqueta 1.
 *                         example: "etiqueta1"
 *                       etiqueta2:
 *                         type: string
 *                         description: Etiqueta 2.
 *                         example: "etiqueta2"
 *                       sellobotella:
 *                         type: string
 *                         description: Sello de botella.
 *                         example: "sello1"
 *                       datetime_splanta:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora en la planta de salida.
 *                         example: "2024-07-05T10:00:00Z"
 *                       completo:
 *                         type: boolean
 *                         description: Indica si el chequeo está completo.
 *                         example: true
 *                       contenedor:
 *                         type: string
 *                         description: Contenedor.
 *                         example: "contenedor1"
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

router.post('/getlistachequeo', ContratosController.get_listachequeo);


module.exports = router;
