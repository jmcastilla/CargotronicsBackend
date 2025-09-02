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
/**
 * @swagger
 * /operaciones2/setinsertordencompra:
 *   post:
 *     summary: Inserta una nueva orden de compra
 *     description: Crea una nueva orden de compra mediante el procedimiento almacenado `AgregarBusquedaOC`. Requiere autenticación con JWT en el header `Authorization`.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - num
 *               - FKLokSolicitudID
 *               - fklokempresaoc
 *               - fkacompaniante
 *               - fkorigen
 *               - fkdestino
 *               - categoria
 *               - observacion
 *               - horacita
 *               - horafin
 *             properties:
 *               num:
 *                 type: integer
 *                 description: Número identificador de la orden de compra.
 *                 example: 12346
 *               FKLokSolicitudID:
 *                 type: integer
 *                 description: ID de la solicitud asociada.
 *                 example: 679
 *               fklokempresaoc:
 *                 type: integer
 *                 description: ID de la empresa asociada a la orden.
 *                 example: 15
 *               fkacompaniante:
 *                 type: integer
 *                 description: ID del acompañante.
 *                 example: 40
 *               fkorigen:
 *                 type: integer
 *                 description: ID del origen.
 *                 example: 1
 *               fkdestino:
 *                 type: integer
 *                 description: ID del destino.
 *                 example: 3
 *               categoria:
 *                 type: string
 *                 description: Categoría de la orden de compra.
 *                 example: "Logística"
 *               observacion:
 *                 type: string
 *                 description: Observaciones adicionales.
 *                 example: "Entrega urgente, revisar documentación"
 *               horacita:
 *                 type: string
 *                 format: date-time
 *                 description: Hora de inicio de la cita.
 *                 example: "2025-08-26T14:00:00Z"
 *               horafin:
 *                 type: string
 *                 format: date-time
 *                 description: Hora de finalización de la cita.
 *                 example: "2025-08-26T16:30:00Z"
 *     responses:
 *       200:
 *         description: Orden de compra insertada exitosamente
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
 *                   description: Resultado devuelto por el procedimiento almacenado
 *                   items:
 *                     type: object
 *                     example:
 *                       num: 12346
 *                       status: "Insertado"
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
 *         description: Error interno del servidor
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
 *                   example: Internal server error
 */

router.post('/setinsertordencompra', OperacionesController.set_insertordencompra);
/**
 * @swagger
 * /operaciones2/setupdateordencompra:
 *   post:
 *     summary: Actualiza una orden de compra existente
 *     description: Actualiza los datos de una orden de compra mediante el procedimiento almacenado `EditarBusquedaOC`. Requiere autenticación con JWT en el header `Authorization`.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - num
 *               - FKLokSolicitudID
 *               - fklokempresaoc
 *               - fkacompaniante
 *               - fkorigen
 *               - fkdestino
 *               - categoria
 *               - observacion
 *               - horacita
 *               - horafin
 *             properties:
 *               num:
 *                 type: integer
 *                 description: Número identificador de la orden de compra.
 *                 example: 12345
 *               FKLokSolicitudID:
 *                 type: integer
 *                 description: ID de la solicitud asociada.
 *                 example: 678
 *               fklokempresaoc:
 *                 type: integer
 *                 description: ID de la empresa de orden de compra.
 *                 example: 12
 *               fkacompaniante:
 *                 type: integer
 *                 description: ID del acompañante.
 *                 example: 34
 *               fkorigen:
 *                 type: integer
 *                 description: ID del origen.
 *                 example: 1
 *               fkdestino:
 *                 type: integer
 *                 description: ID del destino.
 *                 example: 2
 *               categoria:
 *                 type: string
 *                 description: Categoría de la orden de compra.
 *                 example: "Transporte"
 *               observacion:
 *                 type: string
 *                 description: Observaciones adicionales.
 *                 example: "Requiere autorización previa"
 *               horacita:
 *                 type: string
 *                 format: date-time
 *                 description: Hora de inicio de la cita.
 *                 example: "2025-08-26T09:00:00Z"
 *               horafin:
 *                 type: string
 *                 format: date-time
 *                 description: Hora de finalización de la cita.
 *                 example: "2025-08-26T11:00:00Z"
 *     responses:
 *       200:
 *         description: Orden de compra actualizada exitosamente
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
 *                   description: Resultado devuelto por el procedimiento almacenado
 *                   items:
 *                     type: object
 *                     example:
 *                       ident: 12345
 *                       status: "Actualizado"
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
 *         description: Error interno del servidor
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
 *                   example: Internal server error
 */

router.post('/setupdateordencompra', OperacionesController.set_updateordencompra);
/**
 * @swagger
 * /operaciones2/getagencias:
 *   post:
 *     summary: Obtener agencias
 *     description: Devuelve las agencias relacionadas con el proyecto del token.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agencias obtenida correctamente.
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
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.post('/getagencias', OperacionesController.get_agencias);
/**
 * @swagger
 * /operaciones2/setagencia:
 *   post:
 *     summary: Crear o actualizar agencia
 *     description: Crea una nueva agencia si el ID es -1, o actualiza una existente.
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
 *               - Descripcion
 *             properties:
 *               ID:
 *                 type: integer
 *               Descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Operación realizada con éxito.
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
 *         description: Error en la operación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.post('/setagencia', OperacionesController.set_agencia);
/**
 * @swagger
 * /operaciones2/getciudades:
 *   post:
 *     summary: Obtener ciudades
 *     description: Retorna las ciudades asociadas al proyecto del token JWT.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Ciudades obtenidas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID:
 *                         type: integer
 *                       NombreCiudad:
 *                         type: string
 *                       FKProyecto:
 *                         type: integer
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error del servidor al obtener las ciudades.
 */
router.post('/getciudades', OperacionesController.get_ciudades);
/**
 * @swagger
 * /operaciones2/getcategoriasoc:
 *   post:
 *     summary: Obtener categorías OC
 *     description: Devuelve la lista de categorías de búsquedas OC ordenadas por descripción.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida correctamente
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
 *                       id_categoria_oc:
 *                         type: integer
 *                         example: 1
 *                       desc_categoria_oc:
 *                         type: string
 *                         example: "Categoría de prueba"
 *       401:
 *         description: Token inválido o no proporcionado
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
 *         description: Error del servidor al obtener las categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.post('/getcategoriasoc', OperacionesController.get_categoriasoc);
/**
 * @swagger
 * /operaciones2/getordenescompra:
 *   post:
 *     summary: Obtener órdenes de compra
 *     description: Devuelve la lista de órdenes de compra asociadas a una solicitud específica.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idsolicitud
 *             properties:
 *               idsolicitud:
 *                 type: integer
 *                 description: ID de la solicitud para filtrar órdenes de compra
 *                 example: 123
 *     responses:
 *       200:
 *         description: Órdenes de compra obtenidas correctamente
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
 *                       IdOCBusqueda:
 *                         type: integer
 *                         example: 1
 *                       NumOCBusqueda:
 *                         type: string
 *                         example: "OC-2025-001"
 *                       ciudadorigen:
 *                         type: string
 *                         example: "Bogotá"
 *                       FKCiudadOrigen:
 *                         type: integer
 *                         example: 10
 *                       ciudaddestino:
 *                         type: string
 *                         example: "Medellín"
 *                       FKCiudadDestino:
 *                         type: integer
 *                         example: 20
 *                       acompanante:
 *                         type: string
 *                         example: "Juan Pérez"
 *                       FKLokAcompanianteOC:
 *                         type: integer
 *                         example: 5
 *                       FKLokEmpresaOC:
 *                         type: integer
 *                         example: 7
 *                       FechaCita:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-08-25T14:30:00Z"
 *                       Observaciones:
 *                         type: string
 *                         example: "Entrega prioritaria"
 *                       FechaFin:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-08-26T18:00:00Z"
 *                       FKLokCategoriaOC:
 *                         type: integer
 *                         example: 2
 *       401:
 *         description: Token inválido o no proporcionado
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
 *         description: Error del servidor al obtener las órdenes de compra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.post('/getordenescompra', OperacionesController.get_ordenescompra);
/**
 * @swagger
 * /operaciones2/getestadosdevice:
 *   post:
 *     summary: Obtiene los estados del dispositivo
 *     description: Retorna una lista con los estados del dispositivo desde la base de datos.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estados obtenida correctamente
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
 *                       IDEstado:
 *                         type: integer
 *                         example: 1
 *                       Descripcion:
 *                         type: string
 *                         example: Activo
 *       401:
 *         description: Token faltante o inválido
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
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.post('/getestadosdevice', OperacionesController.get_estadosdevice);
/**
 * @swagger
 * /operaciones2/getnumordencompra:
 *   get:
 *     summary: Obtiene el número de orden de compra
 *     description: Retorna el número de orden de compra generado por la función `dbo.NumeroBusquedaOC()`. Requiere autenticación con token JWT en el header `Authorization`.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Respuesta exitosa con el número de orden de compra.
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
 *                       num:
 *                         type: integer
 *                         example: 10234
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
 *         description: Error interno del servidor
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
 *                   example: Internal server error
 */

router.get('/getnumordencompra', OperacionesController.get_numordencompra);
/**
 * @swagger
 * /operaciones2/setciudad:
 *   post:
 *     summary: Registrar ciudad
 *     description: Registra una nueva ciudad para una agencia mediante el procedimiento almacenado setCiudad.
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
 *               - Nombre
 *               - FKAgencia
 *             properties:
 *               ID:
 *                 type: integer
 *               Nombre:
 *                 type: string
 *               FKAgencia:
 *                 type: integer
 *               Latitud:
 *                 type: string
 *               Longitud:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ciudad registrada correctamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error del servidor al registrar la ciudad.
 */

router.post('/setciudad', OperacionesController.set_ciudad);
/**
 * @swagger
 * /operaciones2/getacompanantes:
 *   post:
 *     summary: Obtener acompañantes
 *     description: Devuelve la lista de acompañantes de una ciudad mediante el procedimiento almacenado getAcompanantes.
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
 *               - FKCiudad
 *             properties:
 *               FKCiudad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Lista de acompañantes obtenida correctamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error del servidor al obtener los acompañantes.
 */

router.post('/getacompanantes', OperacionesController.get_acompanantes);
/**
 * @swagger
 * /operaciones2/getempresasbusqueda:
 *   post:
 *     summary: Obtiene la lista de empresas para búsqueda
 *     description: Devuelve las empresas registradas en el sistema ordenadas por descripción.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empresas obtenida correctamente
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
 *                       IDEmpresasOC:
 *                         type: integer
 *                         example: 1
 *                       Descripcion:
 *                         type: string
 *                         example: "Empresa XYZ"
 *       401:
 *         description: Token inválido o no proporcionado
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
 *         description: Error del servidor al obtener las empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 */


router.post('/getempresasbusqueda', OperacionesController.get_empresasbusqueda);
/**
 * @swagger
 * /operaciones2/setacompanantes:
 *   post:
 *     summary: Crea o actualiza un acompañante
 *     tags:
 *       - Operaciones2
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ID
 *               - NoDocumento
 *               - Nombre
 *               - Telefono
 *             properties:
 *               ID:
 *                 type: integer
 *                 description: Si es -1 se crea un nuevo acompañante, si es distinto se actualiza
 *                 example: -1
 *               NoDocumento:
 *                 type: string
 *                 example: "1234567890"
 *               Nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               Telefono:
 *                 type: string
 *                 example: "3014567890"
 *     responses:
 *       200:
 *         description: Resultado del guardado o actualización
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
 *                   description: Resultado de la consulta SQL si es éxito
 */


router.post('/setacompanantes', OperacionesController.set_acompanantes);
/**
 * @swagger
 * /operaciones2/deleteacompanantes:
 *   post:
 *     summary: Elimina un acompañante por ID
 *     tags:
 *       - Operaciones2
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ID
 *             properties:
 *               ID:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       200:
 *         description: Resultado de la eliminación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 */


router.post('/deleteacompanantes', OperacionesController.delete_acompanantes);
/**
 * @swagger
 * /operaciones2/getinstaladores:
 *   post:
 *     summary: Obtener instaladores
 *     description: Obtiene la lista de instaladores asociados al proyecto autenticado.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de instaladores obtenida exitosamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error del servidor al obtener los instaladores.
 */

router.post('/getinstaladores', OperacionesController.get_instaladores);
/**
 * @swagger
 * /operaciones2/setinstaladores:
 *   post:
 *     summary: Insertar o actualizar un instalador
 *     tags:
 *       - Operaciones2
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NEW:
 *                 type: integer
 *                 description: '-1 para insertar, otro valor para actualizar'
 *                 example: -1
 *               CCInstalador:
 *                 type: string
 *                 example: "123456789"
 *               NombreInstalador:
 *                 type: string
 *                 example: "Juan Pérez"
 *               TelefonoInstalador:
 *                 type: string
 *                 example: "3001234567"
 *     responses:
 *       200:
 *         description: Resultado de la operación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   nullable: true
 */


router.post('/setinstaladores', OperacionesController.set_instaladores);
/**
 * @swagger
 * /operaciones2/deleteinstalador:
 *   post:
 *     summary: Elimina un instalador por su cédula
 *     tags:
 *       - Operaciones2
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CCInstalador:
 *                 type: string
 *                 description: Cédula del instalador a eliminar
 *             required:
 *               - CCInstalador
 *     responses:
 *       200:
 *         description: Resultado de la operación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       401:
 *         description: Token inválido o ausente
 */


router.post('/deleteinstalador', OperacionesController.delete_instalador);
/**
 * @swagger
 * /operaciones2/gettraportadoras:
 *   post:
 *     summary: Obtener transportadoras
 *     description: Retorna la lista de transportadoras registradas.
 *     tags:
 *       - Operaciones2
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transportadoras obtenida exitosamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error del servidor al obtener las transportadoras.
 */

router.post('/gettraportadoras', OperacionesController.get_traportadoras);
/**
 * @swagger
 * /operaciones2/settransportadora:
 *   post:
 *     summary: Crear o actualizar transportadora
 *     description: Crea una nueva transportadora o actualiza una existente según el valor del campo ID. Si el ID es -1, se crea una nueva transportadora. Si es diferente de -1, se actualiza la transportadora existente.
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
 *               - NombreTranspo
 *               - AliasTranspo
 *             properties:
 *               ID:
 *                 type: integer
 *                 description: ID de la transportadora. Usar -1 para crear una nueva.
 *               NombreTranspo:
 *                 type: string
 *                 description: Nombre de la transportadora.
 *               AliasTranspo:
 *                 type: string
 *                 description: Alias de la transportadora.
 *               proyectoTransportadora:
 *                 type: integer
 *                 description: ID del proyecto (solo requerido para actualizar).
 *     responses:
 *       200:
 *         description: Transportadora creada o actualizada correctamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error del servidor al procesar la solicitud.
 */

router.post('/settransportadora', OperacionesController.set_transportadora);
/**
 * @swagger
 * /operaciones2/deletetransportadora:
 *   post:
 *     summary: Elimina una transportadora por su ID
 *     tags:
 *       - Operaciones2
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdTransportadora:
 *                 type: integer
 *                 description: ID de la transportadora a eliminar
 *             required:
 *               - IdTransportadora
 *     responses:
 *       200:
 *         description: Resultado de la operación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Token inválido o ausente
 */


router.post('/deletetransportadora', OperacionesController.delete_transportadora);


module.exports = router;
