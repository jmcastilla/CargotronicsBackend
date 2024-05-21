const express = require('express');
const router = express.Router();
const OperacionesController = require('../controller/OperacionesController');

/**
 * @swagger
 * /operaciones/getfotoscontrato:
 *   post:
 *     summary: Obtener fotos de contrato
 *     description: Endpoint para obtener fotos de contrato.
 *     tags:
 *       - Operaciones
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
 *         description: Fotos de contrato obtenidas con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: [
 *                  {
*                       "backupbit": false,
 *                      "photo": "2024_01_29_21_11_06_659_8000622205_JYM323_1__sancarlos_4.060151274316013_-76.26555201597512.jpg",
 *                      "FKLokDeviceID": "8000622205",
*                       "Hora": "Jan 29 2024  9:11PM",
 *                      "Evento": "Instalacion",
 *                      "Usuario": "sancarlos",
*                       "Nombreempresa": "CARLOS SARMIENTO L. CIA. INGENIO SANCARLOS S.A",
 *                      "DescripcionRuta": "Tuluá - Barranquilla",
 *                      "contrs": "SERV-00355503",
 *                      "IDPhoto": 7923802,
 *                      "Descripcion": "JYM323",
 *                      "Latitud": 4.060151274316013,
 *                      "Longitud": -76.26555201597512,
 *                      "Geo": "Ing San Carlos",
 *                      "Texto": "JYM323<br/>4.06015,-76.2656<br/>Ing San Carlos<br/>Jan 29 2024  9:11PM",
 *                      "TextoH": "JYM323\\n4.06015,-76.2656\\nIng San Carlos\\nJan 29 2024  9:11PM",
 *                      "Source": "https://fotos.sfo2.digitaloceanspaces.com/2024_01_29/2024_01_29_21_11_06_659_8000622205_JYM323_1__sancarlos_4.060151274316013_-76.26555201597512.jpg",
 *                      "Coordenadas": "4.06015,-76.2656",
 *                      "Orden": 1
 *                  } ]
 *
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
 * /operaciones/getjsonvisuallogistic:
 *   post:
 *     summary: Obtener JSON de Visual Logistic
 *     description: Obtiene un JSON de Visual Logistic utilizando un token de autenticación.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreimagen:
 *                 type: string
 *           required:
 *             - nombreimagen
 *     responses:
 *       200:
 *         description: JSON de Visual Logistic obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: true
 *                 info:
 *                   type: object
 *                   description: Objeto JSON obtenido de Visual Logistic.
 *                   example: {}
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               success: false
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
router.post('/getjsonvisuallogistic', OperacionesController.get_jsonvisuallogistic);
/**
 * @swagger
 * /operaciones/getcontractvisuallogistic:
 *   post:
 *     summary: Obtener contrato de Visual Logistic
 *     description: Obtiene el contrato de Visual Logistic utilizando un token de autenticación.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrato:
 *                 type: string
 *           required:
 *             - contrato
 *     responses:
 *       200:
 *         description: Contrato de Visual Logistic obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: true
 *                 info:
 *                   type: object
 *                   description: Objeto JSON obtenido del contrato de Visual Logistic.
 *                   example: {}
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               success: false
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
router.post('/getcontractvisuallogistic', OperacionesController.get_contractvisuallogistic);
/**
 * @swagger
 * /operaciones/getreportesdevicevalitronics:
 *   post:
 *     summary: Obtener reportes del dispositivo de Valitronics
 *     description: Retorna la latitud y longitud de las fotos asociadas a un contrato específico de Valitronics.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrato:
 *                 type: string
 *                 description: ID del contrato para obtener los reportes del dispositivo.
 *             required:
 *               - contrato
 *     responses:
 *       200:
 *         description: Datos de los reportes obtenidos exitosamente.
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
 *                       Latitud:
 *                         type: number
 *                         description: Latitud de la foto.
 *                         example: 4.060151
 *                       Longitud:
 *                         type: number
 *                         description: Longitud de la foto.
 *                         example: -76.265552
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: false
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

router.post('/getreportesdevicevalitronics', OperacionesController.get_reportesdevicevalitronics);
/**
 * @swagger
 * /operaciones/getfotoscontractvisuallogistic:
 *   post:
 *     summary: Obtener fotos del contrato en Visual Logistic
 *     description: Retorna un resumen del contrato, incluyendo fotos, en Visual Logistic.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrato:
 *                 type: string
 *                 description: ID del contrato para buscar las fotos y el resumen.
 *             required:
 *               - contrato
 *     responses:
 *       200:
 *         description: Resumen del contrato obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: true
 *                 info:
 *                   type: object
 *                   description: Información del contrato, incluyendo fotos.
 *                   properties:
 *                     ejemploPropiedad:
 *                       type: string
 *                       description: Ejemplo de una propiedad de la información retornada.
 *                       example: valorEjemplo
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: false
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
router.post('/getfotoscontractvisuallogistic', OperacionesController.get_fotoscontractvisuallogistic);
/**
 * @swagger
 * /operaciones/getcomprobantevalitronics:
 *   post:
 *     summary: Obtener comprobantes de contrato Valitronics
 *     description: Retorna los comprobantes asociados a un contrato Valitronics.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrato:
 *                 type: string
 *                 description: ID del contrato para buscar los comprobantes.
 *             required:
 *               - contrato
 *     responses:
 *       200:
 *         description: Comprobantes de contrato obtenidos exitosamente.
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
 *                       Fecha:
 *                         type: string
 *                         description: Fecha de inicio del comprobante.
 *                         example: "2023-05-18T00:00:00.000Z"
 *                       Usuario:
 *                         type: string
 *                         description: Usuario asociado al comprobante.
 *                         example: "usuario123"
 *                       Comprobante:
 *                         type: string
 *                         description: Comprobante asociado al contrato.
 *                         example: "comprobante123"
 *                       Latitud:
 *                         type: number
 *                         format: float
 *                         description: Latitud de la ubicación.
 *                         example: 4.6097102
 *                       Longitud:
 *                         type: number
 *                         format: float
 *                         description: Longitud de la ubicación.
 *                         example: -74.081749
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: false
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
router.post('/getcomprobantevalitronics', OperacionesController.get_comprobantevalitronics);
/**
 * @swagger
 * /operaciones/getreportesbi:
 *   get:
 *     summary: Obtener reportes de Power BI
 *     description: Obtiene los reportes de Power BI asociados a un proyecto específico.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos de los reportes de Power BI obtenidos exitosamente.
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
 *                       Id_Reporte:
 *                         type: integer
 *                         description: ID del reporte.
 *                         example: 1
 *                       NombreReporte:
 *                         type: string
 *                         description: Nombre del reporte.
 *                         example: Reporte 1
 *                       Id_PowerBI:
 *                         type: string
 *                         description: ID del reporte en Power BI.
 *                         example: abc123
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
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si ocurrió un error interno del servidor.
 *                   example: false
 */
router.get('/getreportesbi', OperacionesController.get_reportesBI);
/**
 * @swagger
 * /operaciones/gethistoricos:
 *   post:
 *     summary: Obtener historicos de contratos
 *     description: Endpoint para obtener historicos de contratos en un rango de fechas.
 *     tags:
 *       - Operaciones
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
 *         description: Historicos de contratos obtenidos con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: [
 *                 {
 *                    "ContractID": "SERV-00354522",
 *                    "FKLokDeviceID": "8000622219",
 *                    "NombreEmpresa": "INGENIO PICHICHI S.A",
 *                    "PlacaTruck": "SYS739",
 *                    "username": "jmcastilla",
 *                    "fecha": "2024-01-25 11:30:00",
 *                    "pos": "0.775285,-77.7418",
 *                    "trayecto": 133,
 *                    "DescripcionRuta": "Pichichi - Tulcán",
 *                    "DescripcionTrayecto": "Pichichi - Tulcán (Midecar)",
 *                    "ContainerNum": "ND",
 *                    "NombreConductor": "SILVIO ARQUIMEDES VILLO BURBANO\t\t\t\t",
 *                    "Ref": "INANTRA - MIDECAR",
 *                    "NombreTranspo": "Inantra",
 *                    "MovilConductor": "3136293396",
 *                    "PlacaTrailer": "R71096\t",
 *                    "fechainicio": "2024-01-25 11:30:00",
 *                    "fechafin": "2024-01-30 08:46:56",
 *                    "LastMsgLat": 0.775285,
 *                    "LastMsgLong": -77.74183,
 *                    "Active": false,
 *                    "Locked": false,
 *                    "DistanciaCompleta": 532772,
 *                    "Origen": "3.77303053857633,-76.27899669387534",
 *                    "FKLokTipoEquipo": 9
 *                  }]
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
/**
 * @swagger
 * /operaciones/savetrayecto:
 *   post:
 *     summary: Guardar o actualizar trayecto
 *     description: Endpoint para guardar o actualizar informacion de un trayecto.
 *     tags:
 *       - Operaciones
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID:
 *                 type: integer
 *               descripciontrayecto:
 *                 type: string
 *               origen:
 *                 type: string
 *               nombreorigen:
 *                 type: string
 *               destino:
 *                 type: string
 *               nombredestino:
 *                 type: string
 *               waypoints:
 *                 type: string
 *               tolerancia:
 *                 type: number
 *               distanciaorigen:
 *                 type: number
 *               poly:
 *                 type: string
 *               distanciareal:
 *                 type: number
 *             required:
 *               - descripciontrayecto
 *               - origen
 *               - nombreorigen
 *               - destino
 *               - nombredestino
 *               - waypoints
 *               - tolerancia
 *               - distanciaorigen
 *               - poly
 *               - distanciareal
 *     responses:
 *       200:
 *         description: Trayecto guardado o actualizado con exito.
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
router.post('/savetrayecto', OperacionesController.save_trayecto);
/**
 * @swagger
 * /operaciones/getpoly:
 *   post:
 *     summary: Obtener polyline entre dos ubicaciones
 *     description: Endpoint para obtener la polyline entre dos ubicaciones.
 *     tags:
 *       - Operaciones
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origen:
 *                 type: string
 *               destino:
 *                 type: string
 *             required:
 *               - origen
 *               - destino
 *     responses:
 *       200:
 *         description: Polyline obtenida con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: // Aquí debes especificar la estructura del objeto de respuesta
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
router.post('/getpoly', OperacionesController.get_poly);
/**
 * @swagger
 * /operaciones/gettrayectos:
 *   get:
 *     summary: Obtener lista de trayectos
 *     description: Endpoint para obtener la lista de trayectos asociados al proyecto.
 *     tags:
 *       - Operaciones
 *     responses:
 *       200:
 *         description: Lista de trayectos obtenida con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de trayectos obtenido
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
router.get('/gettrayectos', OperacionesController.get_trayectos);
/**
 * @swagger
 * /operaciones/geteventos:
 *   get:
 *     summary: Obtener lista de eventos
 *     description: Endpoint para obtener la lista de eventos asociados al proyecto.
 *     tags:
 *       - Operaciones
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de eventos obtenido
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
router.get('/geteventos', OperacionesController.get_eventos);
/**
 * @swagger
 * /operaciones/getfind2:
 *   post:
 *     summary: Obtener resultado de busqueda
 *     description: Endpoint para obtener resultados de busqueda segun la posicion actual y el trayecto seleccionado.
 *     tags:
 *       - Operaciones
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID:
 *                 type: integer
 *               latitud:
 *                 type: string
 *               longitud:
 *                 type: string
 *             required:
 *               - ID
 *               - latitud
 *               - longitud
 *     responses:
 *       200:
 *         description: Resultado de busqueda obtenido con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: // Aquí debes especificar la estructura del objeto de resultados obtenido
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
router.post('/getfind2', OperacionesController.get_find2);
/**
 * @swagger
 * /operaciones/getcontratostrafico:
 *   get:
 *     summary: Obtener contratos de trafico
 *     description: Endpoint para obtener contratos de trafico asociados al proyecto.
 *     tags:
 *       - Operaciones
 *     responses:
 *       200:
 *         description: Contratos de trafico obtenidos con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de contratos obtenido
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
router.get('/getcontratostrafico', OperacionesController.get_contratostrafico);
/**
 * @swagger
 * /operaciones/updatecontratotrayecto:
 *   post:
 *     summary: Actualizar trayecto de contrato
 *     description: Endpoint para actualizar el trayecto de un contrato especifico.
 *     tags:
 *       - Operaciones
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Contrato:
 *                 type: string
 *               Trayecto:
 *                 type: string
 *             required:
 *               - Contrato
 *               - Trayecto
 *     responses:
 *       200:
 *         description: Trayecto de contrato actualizado con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: // Aquí debes especificar la estructura del objeto de resultado obtenido
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
router.post('/updatecontratotrayecto', OperacionesController.update_contratotrayectos);
/**
 * @swagger
 * /operaciones/getreportestrafico:
 *   post:
 *     summary: Obtener reportes de trafico
 *     description: Endpoint para obtener reportes de trafico asociados a un contrato especifico.
 *     tags:
 *       - Operaciones
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
 *         description: Reportes de tráfico obtenidos con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de reportes obtenido
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
router.post('/getreportestrafico', OperacionesController.get_reportestrafico);
/**
 * @swagger
 * /operaciones/setreporteautomatico:
 *   post:
 *     summary: Crear reporte automatico
 *     description: Endpoint para crear un reporte automático asociado a un contrato.
 *     tags:
 *       - Operaciones
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ubicacion:
 *                 type: string
 *               contrato:
 *                 type: string
 *             required:
 *               - ubicacion
 *               - contrato
 *     responses:
 *       200:
 *         description: Reporte automático creado con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de reporte creado
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
router.post('/setreporteautomatico', OperacionesController.set_reporteautomatico);
/**
 * @swagger
 * /operaciones/setultimopunto:
 *   post:
 *     summary: Actualizar ultimo punto
 *     description: Endpoint para actualizar el ultimo punto asociado a un contrato.
 *     tags:
 *       - Operaciones
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               lat:
 *                 type: number
 *               lng:
 *                 type: number
 *               contrato:
 *                 type: string
 *             required:
 *               - id
 *               - lat
 *               - lng
 *               - contrato
 *     responses:
 *       200:
 *         description: Ultimo punto actualizado con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de resultado obtenido
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
router.post('/setultimopunto', OperacionesController.set_ultimopunto);
/**
 * @swagger
 * /operaciones/setlastcontractdevice:
 *   post:
 *     summary: Actualizar ultimo contrato en dispositivo
 *     description: Endpoint para actualizar el ultimo contrato asociado a un dispositivo.
 *     tags:
 *       - Operaciones
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Contrato:
 *                 type: string
 *               Device:
 *                 type: string
 *             required:
 *               - Contrato
 *               - Device
 *     responses:
 *       200:
 *         description: Ultimo contrato en dispositivo actualizado con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de resultado obtenido
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
router.post('/setlastcontractdevice', OperacionesController.set_lastcontractdevice);
/**
 * @swagger
 * /operaciones/getpolylinetrayecto:
 *   post:
 *     summary: Obtener polilinea de trayecto
 *     description: Endpoint para obtener la polilinea asociada a un trayecto especifico.
 *     tags:
 *       - Operaciones
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Polilinea de trayecto obtenida con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de polilínea obtenido
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
router.post('/getpolylinetrayecto', OperacionesController.get_polylinetrayecto);
/**
 * @swagger
 * /operaciones/getreportescontroldevicexequipo:
 *   post:
 *     summary: Obtiene reportes de control de dispositivos segun el tipo de equipo.
 *     description: Este endpoint obtiene reportes de control de dispositivos segun el tipo de equipo y otros parametros proporcionados.
 *     tags:
 *       - Operaciones
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: integer
 *               device:
 *                 type: string
 *               inicio:
 *                 type: string
 *               fin:
 *                 type: string
 *             required:
 *               - tipo
 *               - device
 *               - inicio
 *               - fin
 *     responses:
 *       200:
 *         description: Reportes obtenidos con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de polilínea obtenido
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
router.post('/getreportescontroldevicexequipo', OperacionesController.get_reportescontroldevicexequipo);
/**
 * @swagger
 * /operaciones/getreportesdevice:
 *   post:
 *     summary: Obtiene reportes de un dispositivo especifico.
 *     description: Este endpoint obtiene reportes de un dispositivo especifico segun los parametros proporcionados.
 *     tags:
 *       - Operaciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: integer
 *               fechainicio:
 *                 type: string
 *               fechafin:
 *                 type: string
 *               device:
 *                 type: string
 *               utcMinutos:
 *                 type: integer
 *               allreport:
 *                 type: boolean
 *             required:
 *               - tipo
 *               - fechainicio
 *               - fechafin
 *               - device
 *               - utcMinutos
 *               - allreport
 *     responses:
 *       200:
 *         description: Reportes obtenidos con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de polilínea obtenido
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
router.post('/getreportesdevice', OperacionesController.get_reportesdevice);
/**
 * @swagger
 * /operaciones/getreportescontroldevice:
 *   post:
 *     summary: Obtiene reportes de control de un dispositivo.
 *     description: Este endpoint obtiene reportes de control de un dispositivo segun los parametros proporcionados.
 *     tags:
 *       - Operaciones
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filtro:
 *                 type: string
 *               orden1:
 *                 type: string
 *               orden2:
 *                 type: integer
 *             required:
 *               - filtro
 *               - orden1
 *               - orden2
 *     responses:
 *       200:
 *         description: Reportes obtenidos con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de polilínea obtenido
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
router.post('/getreportescontroldevice', OperacionesController.get_reportescontroldevice);
/**
 * @swagger
 * /operaciones/getreportescontroldeviceunico:
 *   post:
 *     summary: Obtiene reportes de control de un dispositivo unico.
 *     description: Este endpoint obtiene reportes de control de un dispositivo unico segun los parametros proporcionados.
 *     tags:
 *       - Operaciones
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filtro:
 *                 type: string
 *           required:
 *             - filtro
 *     responses:
 *       200:
 *         description: Reportes obtenidos con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de polilínea obtenido
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
router.post('/getreportescontroldeviceunico', OperacionesController.get_reportescontroldeviceunico);
/**
 * @swagger
 * /operaciones/getkeyapp:
 *   get:
 *     summary: Obtener clave de aplicacion
 *     description: Endpoint para obtener la clave de aplicacion asociada al proyecto.
 *     tags:
 *       - Operaciones
 *     responses:
 *       200:
 *         description: Clave de aplicacion obtenida con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - // Aquí debes especificar la estructura del objeto de clave obtenida
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
router.get('/getkeyapp', OperacionesController.get_keyApp);
/**
 * @swagger
 * /operaciones/getroles:
 *   get:
 *     summary: Obtiene roles.
 *     description: Este endpoint obtiene una lista de roles.
 *     tags:
 *       - Operaciones
 *     responses:
 *       200:
 *         description: Roles obtenidos con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - IDRol: 1
 *                   NombreRol: "Administrador"
 *                 - IDRol: 2
 *                   NombreRol: "Usuario"
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
router.get('/getroles', OperacionesController.get_roles);
/**
 * @swagger
 * /operaciones/getusuarios:
 *   get:
 *     summary: Obtiene usuarios.
 *     description: Este endpoint obtiene una lista de usuarios.
 *     tags:
 *       - Operaciones
 *     responses:
 *       200:
 *         description: Usuarios obtenidos con exito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - idUser: 1
 *                   FKICEmpresa: 1
 *                   FKProyecto: 1
 *                   tipoUser: 1
 *                   IDRol: 1
 *                   NombreEmpresa: "Empresa1"
 *                   NombreRol: "Administrador"
 *                   Descripcion: "Descripción del proyecto"
 *                   descr_roltrafico: "Rol de tráfico"
 *                   id_roltrafico: 1
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
router.get('/getusuarios', OperacionesController.get_usuarios);


module.exports = router;
