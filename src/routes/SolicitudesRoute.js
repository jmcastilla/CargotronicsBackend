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
/**
 * @swagger
 * /solicitudes/deletesolicitud:
 *   post:
 *     summary: Anular una solicitud
 *     description: Anula una solicitud existente mediante un procedimiento almacenado.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: idsolicitud
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud a eliminar.
 *       - in: query
 *         name: causal
 *         required: true
 *         schema:
 *           type: string
 *         description: Causal de la eliminación.
 *     responses:
 *       200:
 *         description: Solicitud eliminada exitosamente.
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
 *                       [property]:
 *                         type: [type]
 *                         description: [description]
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
router.post('/deletesolicitud', SolicitudesController.delete_solicitud);
/**
 * @swagger
 * /solicitudes/getrutassolicitudesciudadorigen:
 *   get:
 *     summary: Obtener rutas de solicitudes por ciudad de origen
 *     description: Obtiene una lista de ciudades de origen de las rutas de solicitudes con estado específico.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos de las ciudades de origen obtenidos exitosamente.
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
 *                       ID:
 *                         type: integer
 *                         description: ID de la ciudad de origen.
 *                         example: 1
 *                       NOMBRE:
 *                         type: string
 *                         description: Nombre de la ciudad de origen.
 *                         example: Ciudad de Ejemplo
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
router.get('/getrutassolicitudesciudadorigen', SolicitudesController.get_rutassolicitudesciudadorigen);
/**
 * @swagger
 * /solicitudes/getlistaempresas:
 *   get:
 *     summary: Obtener lista de empresas
 *     description: Obtiene una lista de empresas asociadas a un proyecto específico.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empresas obtenida exitosamente.
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
 *                       IdEmpresa:
 *                         type: integer
 *                         description: ID de la empresa.
 *                         example: 1
 *                       NombreEmpresa:
 *                         type: string
 *                         description: Nombre de la empresa.
 *                         example: Empresa Ejemplo
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
router.get('/getlistaempresas', SolicitudesController.get_listaempresas);
/**
 * @swagger
 * /solicitudes/getlistatransportadoras:
 *   get:
 *     summary: Obtener lista de transportadoras
 *     description: Obtiene una lista de transportadoras asociadas a un proyecto específico.
 *     tags:
 *       - Solicitudes
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
 *                         example: Transportadora Ejemplo
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
router.get('/getlistatransportadoras', SolicitudesController.get_listatransportadoras);
/**
 * @swagger
 * /solicitudes/getlistaRutasNegociadas:
 *   post:
 *     summary: Obtener lista de rutas negociadas
 *     description: Obtiene una lista de rutas negociadas asociadas a una empresa específica.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresa:
 *                 type: integer
 *                 description: ID de la empresa.
 *                 example: 1
 *             required:
 *               - empresa
 *     responses:
 *       200:
 *         description: Lista de rutas negociadas obtenida exitosamente.
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
 *                       FKICRuta:
 *                         type: integer
 *                         description: ID de la ruta.
 *                         example: 123
 *                       DescripcionRuta:
 *                         type: string
 *                         description: Descripción de la ruta.
 *                         example: Ruta de ejemplo
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
router.post('/getlistaRutasNegociadas', SolicitudesController.get_listaRutasNegociadas);
/**
 * @swagger
 * /solicitudes/getlistaNegociaciones:
 *   post:
 *     summary: Obtener lista de negociaciones
 *     description: Obtiene una lista de negociaciones asociadas a una empresa y una ruta específicas.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresa:
 *                 type: integer
 *                 description: ID de la empresa.
 *                 example: 1
 *               ruta:
 *                 type: integer
 *                 description: ID de la ruta.
 *                 example: 123
 *             required:
 *               - empresa
 *               - ruta
 *     responses:
 *       200:
 *         description: Lista de negociaciones obtenida exitosamente.
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
 *                       IdClienteExterno:
 *                         type: integer
 *                         description: ID del cliente externo.
 *                         example: 456
 *                       Descripcion:
 *                         type: string
 *                         description: Descripción de la negociación.
 *                         example: Negociación ejemplo
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
router.post('/getlistaNegociaciones', SolicitudesController.get_listaNegociaciones);
/**
 * @swagger
 * /solicitudes/getlistaUnidadCarga:
 *   get:
 *     summary: Obtener lista de unidades de carga
 *     description: Obtiene una lista de tipos de unidades de carga.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de unidades de carga obtenida exitosamente.
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
 *                       TipoUnidadCargaID:
 *                         type: integer
 *                         description: ID del tipo de unidad de carga.
 *                         example: 1
 *                       DescripcionTipoCarga:
 *                         type: string
 *                         description: Descripción del tipo de unidad de carga.
 *                         example: Contenedor
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
router.get('/getlistaUnidadCarga', SolicitudesController.get_listaUnidadCarga);
/**
 * @swagger
 * /solicitudes/getlistaGeocercasEmpresa:
 *   post:
 *     summary: Obtener lista de geocercas de una empresa
 *     description: Obtiene una lista de geocercas asociadas a una empresa específica.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresa:
 *                 type: integer
 *                 description: ID de la empresa.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Lista de geocercas obtenida exitosamente.
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
 *                       Nombre:
 *                         type: string
 *                         description: Nombre de la geocerca.
 *                         example: Geocerca 1
 *                       ID:
 *                         type: integer
 *                         description: ID de la geocerca.
 *                         example: 1
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
router.post('/getlistaGeocercasEmpresa', SolicitudesController.get_listaGeocercasEmpresa);
/**
 * @swagger
 * /solicitudes/getlistaInstaladores:
 *   get:
 *     summary: Obtener lista de instaladores
 *     description: Obtiene una lista de instaladores.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de instaladores obtenida exitosamente.
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
 *                       CCInstalador:
 *                         type: string
 *                         description: Identificación del instalador.
 *                         example: "12345678"
 *                       NombreInstalador:
 *                         type: string
 *                         description: Nombre del instalador.
 *                         example: "Juan Pérez"
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
router.get('/getlistaInstaladores', SolicitudesController.get_listaInstaladores);
/**
 * @swagger
 * /solicitudes/gettiposervicio:
 *   post:
 *     summary: Obtener tipos de servicio
 *     description: Obtiene una lista de tipos de servicio negociados para una empresa y ruta específicos.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ruta:
 *                 type: integer
 *                 description: Identificación de la ruta.
 *                 example: 1
 *               empresa:
 *                 type: integer
 *                 description: Identificación de la empresa.
 *                 example: 123
 *     responses:
 *       200:
 *         description: Lista de tipos de servicio obtenida exitosamente.
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
 *                       IDNegociacion:
 *                         type: integer
 *                         description: Identificación de la negociación.
 *                         example: 456
 *                       Descripcion:
 *                         type: string
 *                         description: Descripción del tipo de servicio.
 *                         example: "Servicio Básico, Nota adicional"
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
router.post('/gettiposervicio', SolicitudesController.get_tiposervicio);
/**
 * @swagger
 * /solicitudes/getobtenerVehiculo:
 *   post:
 *     summary: Obtener información del vehículo
 *     description: Obtiene la información detallada de un vehículo específico por su placa.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *                 description: Placa del vehículo.
 *                 example: "ABC123"
 *     responses:
 *       200:
 *         description: Información del vehículo obtenida exitosamente.
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
 *                       IdLokVehiculo:
 *                         type: integer
 *                         description: Identificación del vehículo.
 *                         example: 1
 *                       Placa:
 *                         type: string
 *                         description: Placa del vehículo.
 *                         example: "ABC123"
 *                       Marca:
 *                         type: string
 *                         description: Marca del vehículo.
 *                         example: "Toyota"
 *                       Color:
 *                         type: string
 *                         description: Color del vehículo.
 *                         example: "Rojo"
 *                       Linea:
 *                         type: string
 *                         description: Línea del vehículo.
 *                         example: "Corolla"
 *                       Modelo:
 *                         type: integer
 *                         description: Modelo del vehículo.
 *                         example: 2020
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
router.post('/getobtenerVehiculo', SolicitudesController.get_obtenerVehiculo);
/**
 * @swagger
 * /solicitudes/getnumerosolicitudnuevo:
 *   get:
 *     summary: Obtener el número de la última solicitud
 *     description: Retorna el número de la última solicitud creada en el sistema.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Número de la última solicitud obtenida exitosamente.
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
 *                     IDSolicitudes:
 *                       type: integer
 *                       description: ID de la última solicitud.
 *                       example: 12345
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
router.get('/getnumerosolicitudnuevo', SolicitudesController.get_numerosolicitudnuevo);
/**
 * @swagger
 * /solicitudes/getcategoriasservicios:
 *   get:
 *     summary: Obtener categorías de servicios
 *     description: Retorna una lista de todas las categorías de servicios disponibles.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías de servicios obtenida exitosamente.
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
 *                       IdCategoriaServ:
 *                         type: integer
 *                         description: ID de la categoría de servicio.
 *                         example: 1
 *                       CategoriaServ:
 *                         type: string
 *                         description: Nombre de la categoría de servicio.
 *                         example: "Transporte"
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
router.get('/getcategoriasservicios', SolicitudesController.get_categoriasservicios);
/**
 * @swagger
 * /solicitudes/setinsertSolicitud:
 *   post:
 *     summary: Insertar una nueva solicitud
 *     description: Inserta una nueva solicitud en el sistema.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKICEmpresa:
 *                 type: integer
 *                 example: 1
 *               Ref:
 *                 type: string
 *                 example: "ABC123"
 *               ContainerNum:
 *                 type: string
 *                 example: "C123456"
 *               DigitoVerificacion:
 *                 type: string
 *                 example: "1"
 *               FKInstaladorId:
 *                 type: integer
 *                 example: 2
 *               Notas:
 *                 type: string
 *                 example: "Notas adicionales"
 *               NombreConductor:
 *                 type: string
 *                 example: "Juan Pérez"
 *               NitConductor:
 *                 type: string
 *                 example: "12345678"
 *               MovilConductor:
 *                 type: string
 *                 example: "3001234567"
 *               FKLokTipoUnidadCarga:
 *                 type: integer
 *                 example: 1
 *               PlacaTruck:
 *                 type: string
 *                 example: "ABC123"
 *               ColorTruck:
 *                 type: string
 *                 example: "Rojo"
 *               PlacaTrailer:
 *                 type: string
 *                 example: "XYZ987"
 *               NombreEscolta:
 *                 type: string
 *                 example: "Carlos Gómez"
 *               MovilEscolta:
 *                 type: string
 *                 example: "3111234567"
 *               FKLokCategoriaServ:
 *                 type: integer
 *                 example: 1
 *               NotasTI:
 *                 type: string
 *                 example: "Notas técnicas"
 *               Marca:
 *                 type: string
 *                 example: "Marca del vehículo"
 *               FKICTransportadora:
 *                 type: integer
 *                 example: 1
 *               FKICEmpresaConsulta:
 *                 type: integer
 *                 example: 1
 *               bitRestriccion:
 *                 type: boolean
 *                 example: false
 *               HoraInicioR:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-01-01T08:00:00Z"
 *               HoraFinR:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-01-01T17:00:00Z"
 *               FKICEmpresaConsulta2:
 *                 type: integer
 *                 example: 1
 *               FKLokEstados:
 *                 type: integer
 *                 example: 1
 *               FechaHoraCita:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-01-01T08:00:00Z"
 *               FechaHoraCitaDescargue:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-01-01T17:00:00Z"
 *               NotasDatosEntrega:
 *                 type: string
 *                 example: "Detalles de la entrega"
 *               UserSolicitud:
 *                 type: string
 *                 example: "user123"
 *               FKNegociacion:
 *                 type: integer
 *                 example: 1
 *               Solicitante:
 *                 type: string
 *                 example: "John Doe"
 *               Contacto:
 *                 type: string
 *                 example: "contacto@empresa.com"
 *               FKCercaAutorizada:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Solicitud insertada exitosamente.
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
router.post('/setinsertSolicitud', SolicitudesController.set_insertSolicitud);
/**
 * @swagger
 * /solicitudes/setupdateSolicitud:
 *   post:
 *     summary: Actualizar una solicitud
 *     description: Actualiza los detalles de una solicitud específica.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKICEmpresa:
 *                 type: integer
 *                 description: ID de la empresa.
 *                 example: 1
 *               IDSolicitudes:
 *                 type: integer
 *                 description: ID de la solicitud.
 *                 example: 123
 *               FKICEmpresaConsulta:
 *                 type: integer
 *                 description: ID de la empresa de consulta.
 *                 example: 2
 *               FKICEmpresaConsulta2:
 *                 type: integer
 *                 description: ID de la segunda empresa de consulta.
 *                 example: 3
 *               FKICEmpresaConsulta3:
 *                 type: integer
 *                 description: ID de la tercera empresa de consulta.
 *                 example: 4
 *               Ref:
 *                 type: string
 *                 description: Referencia de la solicitud.
 *                 example: "REF123"
 *               PlacaTruck:
 *                 type: string
 *                 description: Placa del camión.
 *                 example: "ABC123"
 *               ColorTruck:
 *                 type: string
 *                 description: Color del camión.
 *                 example: "Rojo"
 *               PlacaTrailer:
 *                 type: string
 *                 description: Placa del tráiler.
 *                 example: "DEF456"
 *               NombreConductor:
 *                 type: string
 *                 description: Nombre del conductor.
 *                 example: "Juan Perez"
 *               NitConductor:
 *                 type: string
 *                 description: NIT del conductor.
 *                 example: "123456789"
 *               MovilConductor:
 *                 type: string
 *                 description: Móvil del conductor.
 *                 example: "3001234567"
 *               ContainerNum:
 *                 type: string
 *                 description: Número del contenedor.
 *                 example: "CONT123"
 *               Notas:
 *                 type: string
 *                 description: Notas adicionales de la solicitud.
 *                 example: "Sin observaciones"
 *               NombreEscolta:
 *                 type: string
 *                 description: Nombre del escolta.
 *                 example: "Carlos Ramirez"
 *               MovilEscolta:
 *                 type: string
 *                 description: Móvil del escolta.
 *                 example: "3011234567"
 *               NotasTI:
 *                 type: string
 *                 description: Notas técnicas de instalación.
 *                 example: "Instalar en la bodega 1"
 *               FKLokCategoriaServ:
 *                 type: integer
 *                 description: ID de la categoría de servicio.
 *                 example: 8
 *               Marca:
 *                 type: string
 *                 description: Marca del vehículo.
 *                 example: "Toyota"
 *               FKICTransportadora:
 *                 type: integer
 *                 description: ID de la transportadora.
 *                 example: 9
 *               FechaHoraCita:
 *                 type: string
 *                 description: Fecha y hora de la cita.
 *                 example: "2022-01-01 08:00:00"
 *               Solicitante:
 *                 type: string
 *                 description: Nombre del solicitante.
 *                 example: "Pedro Martinez"
 *               Contacto:
 *                 type: string
 *                 description: Contacto de la solicitud.
 *                 example: "Maria Gomez"
 *               FKICRutas:
 *                 type: integer
 *                 description: ID de la ruta.
 *                 example: 12
 *               FKNegociacion:
 *                 type: integer
 *                 description: ID de la negociación.
 *                 example: 11
 *               FKLokTipoUnidadCarga:
 *                 type: integer
 *                 description: ID del tipo de unidad de carga.
 *                 example: 7
 *               DigitoVerificacion:
 *                 type: string
 *                 description: Dígito de verificación.
 *                 example: "9"
 *               FKCercaAutorizada:
 *                 type: integer
 *                 description: ID de la cerca autorizada.
 *                 example: 6
 *               usuario:
 *                 type: string
 *                 description: Usuario que realiza la actualización.
 *                 example: "admin"
 *               FKInstaladorId:
 *                 type: integer
 *                 description: ID del instalador.
 *                 example: 5
 *               bitRestriccion:
 *                 type: boolean
 *                 description: Indica si hay una restricción.
 *                 example: false
 *               HoraInicioR:
 *                 type: string
 *                 description: Hora de inicio de la restricción.
 *                 example: "08:00"
 *               HoraFinR:
 *                 type: string
 *                 description: Hora de fin de la restricción.
 *                 example: "18:00"
 *               NotasDatosEntrega:
 *                 type: string
 *                 description: Notas de datos de entrega.
 *                 example: "Entrega en la bodega 2"
 *               FechaHoraCitaDescargue:
 *                 type: string
 *                 description: Fecha y hora de la cita de descargue.
 *                 example: "2022-01-01 12:00:00"
 *     responses:
 *       200:
 *         description: Solicitud actualizada exitosamente.
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
 *                       // incluir otros campos necesarios aquí
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

router.post('/setupdateSolicitud', SolicitudesController.set_updateSolicitud);
/**
 * @swagger
 * /solicitudes/getlistaEstadosSolicitudes:
 *   get:
 *     summary: Obtener lista de estados de solicitudes
 *     description: Retorna una lista de todos los estados disponibles para las solicitudes.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estados de solicitudes obtenida exitosamente.
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
 *                       IDEstados:
 *                         type: integer
 *                         description: ID del estado.
 *                         example: 1
 *                       Descripcion:
 *                         type: string
 *                         description: Descripción del estado.
 *                         example: "En proceso"
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
router.get('/getlistaEstadosSolicitudes', SolicitudesController.get_listaEstadosSolicitudes);
/**
 * @swagger
 * /solicitudes/getobtenerSolicitud:
 *   post:
 *     summary: Obtener detalles de una solicitud
 *     description: Retorna los detalles de una solicitud específica.
 *     tags:
 *       - Solicitudes
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
 *                 description: ID de la solicitud a obtener.
 *                 example: 123
 *     responses:
 *       200:
 *         description: Detalles de la solicitud obtenidos exitosamente.
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
 *                       bitRestriccion:
 *                         type: boolean
 *                         description: Indica si hay una restricción.
 *                         example: false
 *                       HoraInicioR:
 *                         type: string
 *                         description: Hora de inicio de la restricción.
 *                         example: "08:00"
 *                       HoraFinR:
 *                         type: string
 *                         description: Hora de fin de la restricción.
 *                         example: "18:00"
 *                       FKICEmpresa:
 *                         type: integer
 *                         description: ID de la empresa.
 *                         example: 1
 *                       FKICEmpresaConsulta:
 *                         type: integer
 *                         description: ID de la empresa de consulta.
 *                         example: 2
 *                       FKICEmpresaConsulta2:
 *                         type: integer
 *                         description: ID de la segunda empresa de consulta.
 *                         example: 3
 *                       FKICEmpresaConsulta3:
 *                         type: integer
 *                         description: ID de la tercera empresa de consulta.
 *                         example: 4
 *                       Ref:
 *                         type: string
 *                         description: Referencia de la solicitud.
 *                         example: "REF123"
 *                       PlacaTruck:
 *                         type: string
 *                         description: Placa del camión.
 *                         example: "ABC123"
 *                       ColorTruck:
 *                         type: string
 *                         description: Color del camión.
 *                         example: "Rojo"
 *                       PlacaTriler:
 *                         type: string
 *                         description: Placa del tráiler.
 *                         example: "DEF456"
 *                       NombreConductor:
 *                         type: string
 *                         description: Nombre del conductor.
 *                         example: "Juan Perez"
 *                       NitConductor:
 *                         type: string
 *                         description: NIT del conductor.
 *                         example: "123456789"
 *                       FKInstaladorId:
 *                         type: integer
 *                         description: ID del instalador.
 *                         example: 5
 *                       MovilConductor:
 *                         type: string
 *                         description: Móvil del conductor.
 *                         example: "3001234567"
 *                       ContainerNum:
 *                         type: string
 *                         description: Número del contenedor.
 *                         example: "CONT123"
 *                       FKLokCercaAutorizada:
 *                         type: integer
 *                         description: ID de la cerca autorizada.
 *                         example: 6
 *                       Notas:
 *                         type: string
 *                         description: Notas adicionales de la solicitud.
 *                         example: "Sin observaciones"
 *                       DigitoVerificacion:
 *                         type: string
 *                         description: Dígito de verificación.
 *                         example: "9"
 *                       FKLokTipoUnidadCarga:
 *                         type: integer
 *                         description: ID del tipo de unidad de carga.
 *                         example: 7
 *                       Contacto:
 *                         type: string
 *                         description: Contacto de la solicitud.
 *                         example: "Maria Gomez"
 *                       NombreEscolta:
 *                         type: string
 *                         description: Nombre del escolta.
 *                         example: "Carlos Ramirez"
 *                       MovilEscolta:
 *                         type: string
 *                         description: Móvil del escolta.
 *                         example: "3011234567"
 *                       NotasTI:
 *                         type: string
 *                         description: Notas técnicas de instalación.
 *                         example: "Instalar en la bodega 1"
 *                       FKLokCategoriaServ:
 *                         type: integer
 *                         description: ID de la categoría de servicio.
 *                         example: 8
 *                       Marca:
 *                         type: string
 *                         description: Marca del vehículo.
 *                         example: "Toyota"
 *                       FKICTransportadora:
 *                         type: integer
 *                         description: ID de la transportadora.
 *                         example: 9
 *                       FKLokEstados:
 *                         type: integer
 *                         description: ID del estado de la solicitud.
 *                         example: 10
 *                       FechaHoraSolicitud:
 *                         type: string
 *                         description: Fecha y hora de la solicitud.
 *                         example: "2022-01-01 08:00:00"
 *                       Hora:
 *                         type: string
 *                         description: Hora de la cita.
 *                         example: "2022-01-01 10:00:00"
 *                       HoraCita:
 *                         type: string
 *                         description: Hora de la cita de descargue.
 *                         example: "2022-01-01 12:00:00"
 *                       NotasDatosEntrega:
 *                         type: string
 *                         description: Notas de datos de entrega.
 *                         example: "Entrega en la bodega 2"
 *                       UserSolicitud:
 *                         type: string
 *                         description: Usuario que creó la solicitud.
 *                         example: "admin"
 *                       FKNegociacion:
 *                         type: integer
 *                         description: ID de la negociación.
 *                         example: 11
 *                       Solicitante:
 *                         type: string
 *                         description: Nombre del solicitante.
 *                         example: "Pedro Martinez"
 *                       FKICRutas:
 *                         type: integer
 *                         description: ID de la ruta.
 *                         example: 12
 *                       IdClienteExterno:
 *                         type: integer
 *                         description: ID del cliente externo.
 *                         example: 13
 *                       bitMostrarCritico:
 *                         type: boolean
 *                         description: Indica si se debe mostrar como crítico.
 *                         example: true
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

router.post('/getobtenerSolicitud', SolicitudesController.get_obtenerSolicitud);
/**
 * @swagger
 * /solicitudes/setupdateSolicitud:
 *   post:
 *     summary: Actualizar solicitud
 *     description: Actualiza los detalles de una solicitud específica.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKICEmpresa:
 *                 type: integer
 *                 description: ID de la empresa.
 *                 example: 1
 *               IDSolicitudes:
 *                 type: integer
 *                 description: ID de la solicitud a actualizar.
 *                 example: 123
 *               FKICEmpresaConsulta:
 *                 type: integer
 *                 description: ID de la empresa de consulta.
 *                 example: 2
 *               FKICEmpresaConsulta2:
 *                 type: integer
 *                 description: Segundo ID de la empresa de consulta.
 *                 example: 3
 *               FKICEmpresaConsulta3:
 *                 type: integer
 *                 description: Tercer ID de la empresa de consulta.
 *                 example: 4
 *               Ref:
 *                 type: string
 *                 description: Referencia de la solicitud.
 *                 example: "REF-123"
 *               PlacaTruck:
 *                 type: string
 *                 description: Placa del camión.
 *                 example: "ABC123"
 *               ColorTruck:
 *                 type: string
 *                 description: Color del camión.
 *                 example: "Rojo"
 *               PlacaTrailer:
 *                 type: string
 *                 description: Placa del remolque.
 *                 example: "XYZ456"
 *               NombreConductor:
 *                 type: string
 *                 description: Nombre del conductor.
 *                 example: "Juan Pérez"
 *               NitConductor:
 *                 type: string
 *                 description: NIT del conductor.
 *                 example: "123456789"
 *               MovilConductor:
 *                 type: string
 *                 description: Número de móvil del conductor.
 *                 example: "555-1234"
 *               ContainerNum:
 *                 type: string
 *                 description: Número de contenedor.
 *                 example: "CONT-789"
 *               Notas:
 *                 type: string
 *                 description: Notas adicionales.
 *                 example: "Entregar antes de las 12 PM"
 *               NombreEscolta:
 *                 type: string
 *                 description: Nombre del escolta.
 *                 example: "María López"
 *               MovilEscolta:
 *                 type: string
 *                 description: Número de móvil del escolta.
 *                 example: "555-5678"
 *               NotasTI:
 *                 type: string
 *                 description: Notas de TI.
 *                 example: "Requiere conexión a internet"
 *               FKLokCategoriaServ:
 *                 type: integer
 *                 description: ID de la categoría de servicio.
 *                 example: 5
 *               Marca:
 *                 type: string
 *                 description: Marca del vehículo.
 *                 example: "Toyota"
 *               FKICTransportadora:
 *                 type: integer
 *                 description: ID de la transportadora.
 *                 example: 6
 *               FechaHoraCita:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de la cita.
 *                 example: "2024-07-03T10:00:00Z"
 *               Solicitante:
 *                 type: string
 *                 description: Nombre del solicitante.
 *                 example: "Pedro Gómez"
 *               Contacto:
 *                 type: string
 *                 description: Información de contacto.
 *                 example: "555-7890"
 *               FKICRutas:
 *                 type: integer
 *                 description: ID de la ruta.
 *                 example: 7
 *               FKNegociacion:
 *                 type: integer
 *                 description: ID de la negociación.
 *                 example: 8
 *               FKLokTipoUnidadCarga:
 *                 type: integer
 *                 description: ID del tipo de unidad de carga.
 *                 example: 9
 *               DigitoVerificacion:
 *                 type: string
 *                 description: Dígito de verificación.
 *                 example: "1234"
 *               FKCercaAutorizada:
 *                 type: integer
 *                 description: ID de la cerca autorizada.
 *                 example: 10
 *               usuario:
 *                 type: string
 *                 description: Usuario que realiza la solicitud.
 *                 example: "usuario123"
 *               FKInstaladorId:
 *                 type: integer
 *                 description: ID del instalador.
 *                 example: 11
 *               bitRestriccion:
 *                 type: boolean
 *                 description: Indicador de restricción.
 *                 example: true
 *               HoraInicioR:
 *                 type: string
 *                 description: Hora de inicio de restricción.
 *                 example: "09:00:00"
 *               HoraFinR:
 *                 type: string
 *                 description: Hora de fin de restricción.
 *                 example: "18:00:00"
 *               NotasDatosEntrega:
 *                 type: string
 *                 description: Notas de datos de entrega.
 *                 example: "Entregar en la puerta trasera"
 *               FechaHoraCitaDescargue:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de la cita de descargue.
 *                 example: "2024-07-04T08:00:00Z"
 *     responses:
 *       200:
 *         description: Solicitud actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue actualizada exitosamente.
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Datos de la solicitud actualizada.
 *                   example: {}
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

router.post('/setupdateSolicitud', SolicitudesController.set_updateSolicitud);
/**
 * @swagger
 * /solicitudes/getlistaNegociacionesFinal:
 *   post:
 *     summary: Obtener lista de negociaciones finales
 *     description: Recupera una lista de negociaciones finales basada en la empresa, la ruta y si es externo.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresa:
 *                 type: integer
 *                 description: ID de la empresa.
 *                 example: 1
 *               ruta:
 *                 type: integer
 *                 description: ID de la ruta.
 *                 example: 1
 *               externo:
 *                 type: integer
 *                 description: ID del cliente externo.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Lista de negociaciones recuperada exitosamente.
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
 *                       IDNegociacion:
 *                         type: integer
 *                         description: ID de la negociación.
 *                         example: 1
 *                       Descripcion:
 *                         type: string
 *                         description: Descripción de la negociación.
 *                         example: "Negociación 1, Nota"
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

router.post('/getlistaNegociacionesFinal', SolicitudesController.get_listaNegociacionesFinal);
/**
 * @swagger
 * /solicitudes/getreportesSolicitudes:
 *   post:
 *     summary: Obtener reportes de solicitudes
 *     description: Recupera una lista de reportes para una solicitud específica.
 *     tags:
 *       - Solicitudes
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
 *                 description: ID de la solicitud.
 *                 example: 123
 *     responses:
 *       200:
 *         description: Lista de reportes recuperada exitosamente.
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
 *                       id:
 *                         type: integer
 *                         description: ID del reporte.
 *                         example: 1
 *                       solicitud:
 *                         type: integer
 *                         description: ID de la solicitud.
 *                         example: 123
 *                       usuario:
 *                         type: integer
 *                         description: ID del usuario que hizo el reporte.
 *                         example: 456
 *                       nota:
 *                         type: string
 *                         description: Nota del reporte.
 *                         example: "Reporte de prueba"
 *                       estado:
 *                         type: string
 *                         description: Estado de la solicitud.
 *                         example: "En proceso"
 *                       hora:
 *                         type: string
 *                         format: date-time
 *                         description: Hora del reporte.
 *                         example: "2024-07-01T12:34:56Z"
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

router.post('/getreportesSolicitudes', SolicitudesController.get_reportesSolicitudes);
/**
 * @swagger
 * /solicitudes/setinsertReporteSolicitud:
 *   post:
 *     summary: Insertar reporte de solicitud
 *     description: Inserta un nuevo reporte para una solicitud específica.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKLokEstadoID:
 *                 type: integer
 *                 description: ID del estado.
 *                 example: 1
 *               Nota:
 *                 type: string
 *                 description: Nota del reporte.
 *                 example: "Se inició el proceso"
 *               XTime:
 *                 type: string
 *                 format: date-time
 *                 description: Tiempo del reporte.
 *                 example: "2024-07-01T12:34:56Z"
 *               XUser:
 *                 type: string
 *                 description: Usuario que realizó el reporte.
 *                 example: "user123"
 *               FKLokSolicitudID:
 *                 type: integer
 *                 description: ID de la solicitud.
 *                 example: 123
 *     responses:
 *       200:
 *         description: Reporte insertado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la inserción fue exitosa.
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       FKLokEstadoID:
 *                         type: integer
 *                         description: ID del estado.
 *                         example: 1
 *                       Nota:
 *                         type: string
 *                         description: Nota del reporte.
 *                         example: "Se inició el proceso"
 *                       XTime:
 *                         type: string
 *                         format: date-time
 *                         description: Tiempo del reporte.
 *                         example: "2024-07-01T12:34:56Z"
 *                       XUser:
 *                         type: string
 *                         description: Usuario que realizó el reporte.
 *                         example: "user123"
 *                       FKLokSolicitudID:
 *                         type: integer
 *                         description: ID de la solicitud.
 *                         example: 123
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

router.post('/setinsertReporteSolicitud', SolicitudesController.set_insertReporteSolicitud);
/**
 * @swagger
 * /solicitudes/setupdateReporteSolicitud:
 *   post:
 *     summary: Actualizar reporte de solicitud
 *     description: Actualiza un reporte existente para una solicitud específica.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKLokEstadoID:
 *                 type: integer
 *                 description: ID del estado.
 *                 example: 1
 *               Nota:
 *                 type: string
 *                 description: Nota del reporte.
 *                 example: "Actualización del estado del proceso"
 *               IdReport:
 *                 type: integer
 *                 description: ID del reporte.
 *                 example: 456
 *               XUser:
 *                 type: string
 *                 description: Usuario que realiza la actualización.
 *                 example: "user123"
 *               FKLokSolicitudID:
 *                 type: integer
 *                 description: ID de la solicitud.
 *                 example: 123
 *     responses:
 *       200:
 *         description: Reporte actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la actualización fue exitosa.
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       FKLokEstadoID:
 *                         type: integer
 *                         description: ID del estado.
 *                         example: 1
 *                       Nota:
 *                         type: string
 *                         description: Nota del reporte.
 *                         example: "Actualización del estado del proceso"
 *                       IdReport:
 *                         type: integer
 *                         description: ID del reporte.
 *                         example: 456
 *                       XUser:
 *                         type: string
 *                         description: Usuario que realiza la actualización.
 *                         example: "user123"
 *                       FKLokSolicitudID:
 *                         type: integer
 *                         description: ID de la solicitud.
 *                         example: 123
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

router.post('/setupdateReporteSolicitud', SolicitudesController.set_updateReporteSolicitud);
/**
 * @swagger
 * /solicitudes/setdeleteReporteSolicitud:
 *   post:
 *     summary: Eliminar reporte de solicitud
 *     description: Elimina un reporte específico para una solicitud.
 *     tags:
 *       - Solicitudes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdReport:
 *                 type: integer
 *                 description: ID del reporte.
 *                 example: 456
 *               XUser:
 *                 type: string
 *                 description: Usuario que realiza la eliminación.
 *                 example: "user123"
 *               FKLokSolicitudID:
 *                 type: integer
 *                 description: ID de la solicitud.
 *                 example: 123
 *     responses:
 *       200:
 *         description: Reporte eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la eliminación fue exitosa.
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       IdReport:
 *                         type: integer
 *                         description: ID del reporte.
 *                         example: 456
 *                       XUser:
 *                         type: string
 *                         description: Usuario que realiza la eliminación.
 *                         example: "user123"
 *                       FKLokSolicitudID:
 *                         type: integer
 *                         description: ID de la solicitud.
 *                         example: 123
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

router.post('/setdeleteReporteSolicitud', SolicitudesController.set_deleteReporteSolicitud);




module.exports = router;
