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
 *               Nombre:
 *                 type: string
 *               FKAgencia:
 *                 type: integer
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
 * /operaciones2/setacompanante:
 *   post:
 *     summary: Registrar acompañante
 *     description: Registra un nuevo acompañante para una ciudad mediante el procedimiento almacenado setAcompanante.
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
 *               - FKCiudad
 *             properties:
 *               Nombre:
 *                 type: string
 *               FKCiudad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Acompañante registrado correctamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error del servidor al registrar el acompañante.
 */

router.post('/setacompanantes', OperacionesController.set_acompanantes);
/**
 * @swagger
 * /operaciones2/deleteacompanante:
 *   post:
 *     summary: Eliminar acompañante
 *     description: Elimina un acompañante de la ciudad mediante el procedimiento almacenado deleteAcompanante.
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
 *             properties:
 *               ID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Acompañante eliminado correctamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error del servidor al eliminar el acompañante.
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
 *     summary: Crear o actualizar instalador
 *     description: Crea o actualiza un instalador mediante un procedimiento almacenado.
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
 *         description: Instalador registrado correctamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error del servidor al registrar el instalador.
 */

router.post('/setinstaladores', OperacionesController.set_instaladores);
/**
 * @swagger
 * /operaciones2/deleteinstalador:
 *   post:
 *     summary: Eliminar instalador
 *     description: Elimina un instalador del proyecto actual.
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
 *             properties:
 *               ID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Instalador eliminado correctamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error del servidor al eliminar el instalador.
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
 *     description: Crea o actualiza una transportadora mediante procedimiento almacenado.
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
 *         description: Transportadora registrada correctamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error del servidor al registrar la transportadora.
 */

router.post('/settransportadora', OperacionesController.set_transportadora);
/**
 * @swagger
 * /operaciones2/deletetransportadora:
 *   post:
 *     summary: Eliminar transportadora
 *     description: Elimina una transportadora asociada al proyecto autenticado.
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
 *             properties:
 *               ID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Transportadora eliminada correctamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error del servidor al eliminar la transportadora.
 */

router.post('/deletetransportadora', OperacionesController.delete_transportadora);


module.exports = router;
