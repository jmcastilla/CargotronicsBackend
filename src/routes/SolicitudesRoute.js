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
 *   get:
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


module.exports = router;
