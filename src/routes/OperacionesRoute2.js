const express = require('express');
const router = express.Router();
const OperacionesController = require('../controller/OperacionesController2');

/**
 * @swagger
 * /operaciones2/getcontactos:
 *   post:
 *     summary: Obtener contactos por tipo y proyecto
 *     description: Retorna los contactos del proyecto autenticado filtrados por tipo.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - tipo
 *     responses:
 *       200:
 *         description: Contactos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       IDContacto:
 *                         type: integer
 *                         example: 123
 *                       NombreContacto:
 *                         type: string
 *                         example: "Juan Pérez"
 *                       Telefono:
 *                         type: string
 *                         example: "3001234567"
 *                       TipoContacto:
 *                         type: integer
 *                         example: 1
 *                       FKProyecto:
 *                         type: integer
 *                         example: 5
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error de parametros
 *       401:
 *         description: Token ausente o inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Token is missing
 *       500:
 *         description: Error interno al consultar contactos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.post('/getcontactos', OperacionesController.get_contactos);

/**
 * @swagger
 * /operaciones2/setinsertcontacto:
 *   post:
 *     summary: Insertar un nuevo contacto
 *     description: Inserta un nuevo contacto en el sistema con parámetros de notificación.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - NombreContacto
 *               - FKICEmpresa
 *               - Mail
 *               - Telefono
 *               - tipo
 *             properties:
 *               NombreContacto:
 *                 type: string
 *               FKICEmpresa:
 *                 type: integer
 *               Mail:
 *                 type: string
 *               Telefono:
 *                 type: string
 *               AperturaM:
 *                 type: boolean
 *               AperturaT:
 *                 type: boolean
 *               ZonaSeguraM:
 *                 type: boolean
 *               ZonaSeguraT:
 *                 type: boolean
 *               GeocercasM:
 *                 type: boolean
 *               GeocercasT:
 *                 type: boolean
 *               DesvioM:
 *                 type: boolean
 *               DesvioT:
 *                 type: boolean
 *               RetrocesoM:
 *                 type: boolean
 *               RetrocesoT:
 *                 type: boolean
 *               BateriaM:
 *                 type: boolean
 *               BateriaT:
 *                 type: boolean
 *               LuzM:
 *                 type: boolean
 *               LuzT:
 *                 type: boolean
 *               GpsEstaticoM:
 *                 type: boolean
 *               GpsEstaticoT:
 *                 type: boolean
 *               TiempoGpsM:
 *                 type: boolean
 *               TiempoGpsT:
 *                 type: boolean
 *               VelocidadM:
 *                 type: boolean
 *               VelocidadT:
 *                 type: boolean
 *               ReportTrafico:
 *                 type: boolean
 *               RolTrafico:
 *                 type: string
 *               tipo:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Contacto insertado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Token inválido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Token is missing
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.post('/setinsertcontacto', OperacionesController.set_insertcontacto);

/**
 * @swagger
 * /operaciones2/setupdatecontacto:
 *   post:
 *     summary: Actualizar contacto
 *     description: Actualiza los datos de un contacto existente mediante el procedimiento almacenado UpdateContacto.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ID
 *               - NombreContacto
 *               - FKICEmpresa
 *             properties:
 *               ID:
 *                 type: integer
 *               NombreContacto:
 *                 type: string
 *               FKICEmpresa:
 *                 type: integer
 *               Mail:
 *                 type: string
 *               Telefono:
 *                 type: string
 *               AperturaM:
 *                 type: boolean
 *               AperturaT:
 *                 type: boolean
 *               ZonaSeguraM:
 *                 type: boolean
 *               ZonaSeguraT:
 *                 type: boolean
 *               GeocercasM:
 *                 type: boolean
 *               GeocercasT:
 *                 type: boolean
 *               DesvioM:
 *                 type: boolean
 *               DesvioT:
 *                 type: boolean
 *               RetrocesoM:
 *                 type: boolean
 *               RetrocesoT:
 *                 type: boolean
 *               BateriaM:
 *                 type: boolean
 *               BateriaT:
 *                 type: boolean
 *               LuzM:
 *                 type: boolean
 *               LuzT:
 *                 type: boolean
 *               GpsEstaticoM:
 *                 type: boolean
 *               GpsEstaticoT:
 *                 type: boolean
 *               TiempoGpsM:
 *                 type: boolean
 *               TiempoGpsT:
 *                 type: boolean
 *               VelocidadM:
 *                 type: boolean
 *               VelocidadT:
 *                 type: boolean
 *               ReportTrafico:
 *                 type: boolean
 *               RolTrafico:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contacto actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Token inválido o no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Token is missing
 *       500:
 *         description: Error del servidor al ejecutar la actualización.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.post('/setupdatecontacto', OperacionesController.set_updatecontacto);
