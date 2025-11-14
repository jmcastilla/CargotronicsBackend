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
 * /maestros/getgeocercas:
 *   get:
 *     summary: Obtener lista de geocercas del proyecto
 *     description: Retorna todas las geocercas registradas del proyecto asociado al usuario autenticado.
 *     tags:
 *       - Maestros
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de geocercas obtenida correctamente
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
 *                       ID:
 *                         type: integer
 *                         example: 12
 *                       Nombre:
 *                         type: string
 *                         example: "Zona Norte"
 *                       Vertices:
 *                         type: string
 *                         example: "[-74.1, 10.9], [-74.2, 10.95], [-74.15, 10.92]"
 *                       Descripcion:
 *                         type: string
 *                         example: "Zona de entrega preferencial"
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
 *         description: Error interno al obtener las geocercas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.get('/getgeocercas', MaestrosController.get_geocercas);
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
/**
 * @swagger
 * /maestros/getpropietario:
 *   get:
 *     summary: Obtiene la lista de propietarios
 *     description: >
 *       Retorna todos los propietarios registrados en la tabla **CtPropietarios**.
 *       Requiere autenticación mediante token JWT en el header `Authorization`.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         description: Token JWT del usuario autenticado
 *     responses:
 *       200:
 *         description: Lista de propietarios obtenida correctamente
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
 *                       IdPropietario:
 *                         type: integer
 *                         example: 12
 *                       NombrePropietario:
 *                         type: string
 *                         example: "Juan Pérez"
 *                       EmailPropietario:
 *                         type: string
 *                         example: "juanperez@mail.com"
 *                       CelularPropietario:
 *                         type: string
 *                         example: "3001234567"
 *       401:
 *         description: Token faltante o inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get('/getpropietario', MaestrosController.get_propietario);
/**
 * @swagger
 * /maestros/setpropietario:
 *   post:
 *     summary: Crea o actualiza un propietario
 *     description: >
 *       Inserta o actualiza registros en **CtPropietarios** según el valor de `id`.
 *       - Si `id = -1`: crea un nuevo propietario.
 *       - Si `id` es diferente de -1: actualiza el propietario existente.
 *       Requiere autenticación mediante token JWT en el header `Authorization`.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT con formato `Bearer <token>`
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - NombrePropietario
 *               - EmailPropietario
 *               - CelularPropietario
 *             properties:
 *               id:
 *                 type: integer
 *                 example: -1
 *                 description: >
 *                   - **-1** para crear un nuevo propietario
 *                   - ID existente para actualizar
 *               NombrePropietario:
 *                 type: string
 *                 example: "Juan Pérez"
 *               EmailPropietario:
 *                 type: string
 *                 example: "juan@example.com"
 *               CelularPropietario:
 *                 type: string
 *                 example: "3001234567"
 *     responses:
 *       200:
 *         description: Propietario creado o actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Resultado del query SQL
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: Token faltante o inválido
 *       500:
 *         description: Error interno del servidor
 */

router.post('/setpropietario', MaestrosController.set_propietario);
/**
 * @swagger
 * /maestros/getvehiculos:
 *   get:
 *     summary: Obtiene la lista de vehículos
 *     description: >
 *       Retorna todos los vehículos registrados en la tabla **LokVehiculos**.
 *       Requiere autenticación mediante token JWT en el header `Authorization`.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         description: Token JWT del usuario autenticado
 *     responses:
 *       200:
 *         description: Lista de vehículos obtenida correctamente
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
 *                       idLokVehiculo:
 *                         type: integer
 *                         example: 10
 *                       Placa:
 *                         type: string
 *                         example: "ABC123"
 *                       Color:
 *                         type: string
 *                         example: "Blanco"
 *                       Marca:
 *                         type: string
 *                         example: "Toyota"
 *                       Linea:
 *                         type: string
 *                         example: "Corolla"
 *                       Modelo:
 *                         type: string
 *                         example: "2020"
 *                       FkOperadorGPS:
 *                         type: integer
 *                         example: 5
 *                       FkPropietario:
 *                         type: integer
 *                         example: 12
 *       401:
 *         description: Token faltante o inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get('/getvehiculos', MaestrosController.get_vehiculos);
/**
 * @swagger
 * /maestros/setvehiculo:
 *   post:
 *     summary: Crea o actualiza un vehículo
 *     description: >
 *       Inserta o actualiza registros en **LokVehiculos** según el valor de `id`.
 *       - Si `id = -1`: crea un nuevo vehículo.
 *       - Si `id` es diferente de -1: actualiza el vehículo existente.
 *       Requiere autenticación mediante token JWT en el header `Authorization`.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT con formato `Bearer <token>`
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - Placa
 *               - Color
 *               - Marca
 *               - Linea
 *               - Modelo
 *               - FkOperadorGPS
 *               - FkPropietario
 *             properties:
 *               id:
 *                 type: integer
 *                 example: -1
 *                 description: >
 *                   - **-1** para crear un nuevo vehículo
 *                   - ID existente para actualizar
 *               Placa:
 *                 type: string
 *                 example: "ABC123"
 *               Color:
 *                 type: string
 *                 example: "Negro"
 *               Marca:
 *                 type: string
 *                 example: "Toyota"
 *               Linea:
 *                 type: string
 *                 example: "Corolla"
 *               Modelo:
 *                 type: string
 *                 example: "2021"
 *               FkOperadorGPS:
 *                 type: integer
 *                 example: 3
 *               FkPropietario:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       200:
 *         description: Vehículo creado o actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Resultado del query SQL
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: Token faltante o inválido
 *       500:
 *         description: Error interno del servidor
 */

router.post('/setvehiculo', MaestrosController.set_vehiculo);
/**
 * @swagger
 * /maestros/getoperadorgps:
 *   get:
 *     summary: Obtiene la lista de operadores GPS
 *     description: >
 *       Retorna todos los operadores GPS registrados en **CtOperadorGPS**.
 *       Requiere autenticación mediante token JWT en el header `Authorization`.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         description: Token JWT del usuario autenticado
 *     responses:
 *       200:
 *         description: Lista de operadores GPS obtenida correctamente
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
 *                       IdOperadorGPS:
 *                         type: integer
 *                         example: 1
 *                       OperadorGPS:
 *                         type: string
 *                         example: "TrackZone"
 *                       FkCtPaises:
 *                         type: integer
 *                         example: 57
 *                       urlOperador:
 *                         type: string
 *                         example: "https://trackzone.com/api"
 *       401:
 *         description: Token faltante o inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get('/getoperadorgps', MaestrosController.get_operadorgps);
/**
 * @swagger
 * /maestros/getpaises:
 *   get:
 *     summary: Obtiene la lista de países
 *     description: >
 *       Retorna todos los países registrados en **CtPaises**.
 *       Requiere autenticación mediante token JWT en el header `Authorization`.
 *     tags:
 *       - Maestros
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         description: Token JWT válido
 *     responses:
 *       200:
 *         description: Lista de países obtenida correctamente
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
 *                       IdPais:
 *                         type: integer
 *                         example: 57
 *                       NombrePais:
 *                         type: string
 *                         example: "Colombia"
 *       401:
 *         description: Token faltante o inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get('/getpaises', MaestrosController.get_paises);



module.exports = router;
