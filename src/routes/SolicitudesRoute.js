const express = require('express');
const router = express.Router();
const SolicitudesController = require('../controller/SolicitudesController');

/**
 * @swagger
 * /solicitudes/getsolicitudes:
 *   get:
 *     summary: Obtener solicitudes
 *     description: Retorna una lista de solicitudes con detalles específicos.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos de las solicitudes obtenidos exitosamente.
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
 *                       IDSolicitudes:
 *                         type: integer
 *                         description: ID de la solicitud.
 *                         example: 123
 *                       PlacaTruck:
 *                         type: string
 *                         description: Placa del camión.
 *                         example: ABC123
 *                       NombreInstalador:
 *                         type: string
 *                         description: Nombre del instalador.
 *                         example: Juan Perez
 *                       NombreEmpresa:
 *                         type: string
 *                         description: Nombre de la empresa.
 *                         example: Empresa XYZ
 *                       Hora:
 *                         type: string
 *                         description: Fecha y hora de la cita.
 *                         example: 2024-05-21 14:30:00
 *                       FKLokEstados:
 *                         type: integer
 *                         description: ID del estado.
 *                         example: 2
 *                       DescripcionRuta:
 *                         type: string
 *                         description: Descripción de la ruta.
 *                         example: Ruta 1
 *                       Contenedor:
 *                         type: string
 *                         description: Número del contenedor.
 *                         example: ABCD123456-7
 *                       Contacto:
 *                         type: string
 *                         description: Información de contacto.
 *                         example: contacto@empresa.com
 *                       Tiempo:
 *                         type: integer
 *                         description: Tiempo en minutos.
 *                         example: 120
 *                       nota:
 *                         type: string
 *                         description: Nota del reporte.
 *                         example: Todo en orden
 *                       estado:
 *                         type: string
 *                         description: Estado de la solicitud.
 *                         example: En proceso
 *                       hora_e:
 *                         type: string
 *                         description: Hora del reporte.
 *                         example: 2024-05-21 16:00:00
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
router.get('/getsolicitudes', SolicitudesController.get_Solicitudes);


module.exports = router;
