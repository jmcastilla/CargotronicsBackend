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
/**
 * @swagger
 * /contratos/getinfocontrato:
 *   post:
 *     summary: Obtener información del contrato
 *     description: Retorna información detallada de un contrato específico.
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
 *                 description: ID del contrato para el cual se solicita información.
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Información del contrato obtenida exitosamente.
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
 *                       ContractID:
 *                         type: string
 *                         description: ID del contrato.
 *                         example: "12345"
 *                       LightBit:
 *                         type: integer
 *                         description: Bit de estado.
 *                         example: 1
 *                       FKICEmpresa:
 *                         type: integer
 *                         description: ID de la empresa.
 *                         example: 1001
 *                       FKICEmpresaConsulta:
 *                         type: integer
 *                         description: ID de la empresa consultada.
 *                         example: 1002
 *                       FKICEmpresaConsulta2:
 *                         type: integer
 *                         description: ID de la segunda empresa consultada.
 *                         example: 1003
 *                       FKICEmpresaConsulta3:
 *                         type: integer
 *                         description: ID de la tercera empresa consultada.
 *                         example: 1004
 *                       FKICRutas:
 *                         type: integer
 *                         description: ID de las rutas.
 *                         example: 2001
 *                       FKLokBarsSLM:
 *                         type: integer
 *                         description: ID de los bares SLM.
 *                         example: 3001
 *                       Active:
 *                         type: boolean
 *                         description: Estado activo del contrato.
 *                         example: true
 *                       FKLokDeviceID:
 *                         type: integer
 *                         description: ID del dispositivo.
 *                         example: 4001
 *                       Ref:
 *                         type: string
 *                         description: Referencia del contrato.
 *                         example: "Ref12345"
 *                       PlacaTruck:
 *                         type: string
 *                         description: Placa del camión.
 *                         example: "ABC123"
 *                       ColorTruck:
 *                         type: string
 *                         description: Color del camión.
 *                         example: "Rojo"
 *                       PlacaTrailer:
 *                         type: string
 *                         description: Placa del tráiler.
 *                         example: "XYZ789"
 *                       NombreConductor:
 *                         type: string
 *                         description: Nombre del conductor.
 *                         example: "Juan Pérez"
 *                       NitConductor:
 *                         type: string
 *                         description: NIT del conductor.
 *                         example: "123456789"
 *                       FechaHoraCita:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de la cita.
 *                         example: "2024-08-09T08:00:00Z"
 *                       FechaHoraCitaDescargue:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de la cita de descargue.
 *                         example: "2024-08-09T12:00:00Z"
 *                       NotasDatosEntrega:
 *                         type: string
 *                         description: Notas sobre los datos de entrega.
 *                         example: "Entrega en bodega principal"
 *                       FechaHoraDescargue:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de descargue.
 *                         example: "2024-08-09T15:00:00Z"
 *                       FKCercaAutorizada:
 *                         type: integer
 *                         description: ID de la cerca autorizada.
 *                         example: 5001
 *                       UserCreacion:
 *                         type: string
 *                         description: Usuario que creó el contrato.
 *                         example: "admin"
 *                       Solicitante:
 *                         type: string
 *                         description: Nombre del solicitante.
 *                         example: "Empresa XYZ"
 *                       bitRestriccion:
 *                         type: boolean
 *                         description: Indica si el contrato tiene restricción.
 *                         example: false
 *                       HoraInicioR:
 *                         type: string
 *                         format: date-time
 *                         description: Hora de inicio de restricción.
 *                         example: "2024-08-09T06:00:00Z"
 *                       HoraFinR:
 *                         type: string
 *                         format: date-time
 *                         description: Hora de fin de restricción.
 *                         example: "2024-08-09T18:00:00Z"
 *                       MovilConductor:
 *                         type: string
 *                         description: Móvil del conductor.
 *                         example: "3001234567"
 *                       ContainerNum:
 *                         type: string
 *                         description: Número de contenedor.
 *                         example: "CONT1234567"
 *                       Notas:
 *                         type: string
 *                         description: Notas adicionales.
 *                         example: "Requiere escolta"
 *                       chequeo_ident:
 *                         type: integer
 *                         description: Identificador del chequeo.
 *                         example: 9876
 *                       tipo_equipo:
 *                         type: string
 *                         description: Tipo de equipo.
 *                         example: "GPS"
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

router.post('/getinfocontrato', ContratosController.get_infocontrato);
/**
 * @swagger
 * /getinfocontratoproyecto:
 *   post:
 *     summary: Obtiene información detallada de un contrato de proyecto.
 *     description: Retorna la información completa de un contrato específico basado en el ID del contrato proporcionado.
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
 *                 description: El ID del contrato a consultar.
 *                 example: "CONTRACT123"
 *     responses:
 *       200:
 *         description: Información del contrato obtenida exitosamente.
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
 *                     description: Detalles del contrato.
 *                     properties:
 *                       ContractID:
 *                         type: string
 *                         example: "CONTRACT123"
 *                       FKICEmpresa:
 *                         type: integer
 *                         example: 1
 *                       SlavesAsignados:
 *                         type: integer
 *                         example: 5
 *                       AlertasActivas:
 *                         type: integer
 *                         example: 3
 *                       LightBit:
 *                         type: boolean
 *                         example: true
 *                       FKICEmpresaConsulta:
 *                         type: integer
 *                         example: 2
 *                       FKICEmpresaConsulta2:
 *                         type: integer
 *                         example: 3
 *                       FKICEmpresaConsulta3:
 *                         type: integer
 *                         example: 4
 *                       FKICRutas:
 *                         type: integer
 *                         example: 6
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       FKLokDeviceID:
 *                         type: integer
 *                         example: 7
 *                       Ref:
 *                         type: string
 *                         example: "REF123456"
 *                       PlacaTruck:
 *                         type: string
 *                         example: "ABC123"
 *                       ColorTruck:
 *                         type: string
 *                         example: "Rojo"
 *                       PlacaTrailer:
 *                         type: string
 *                         example: "DEF456"
 *                       NombreConductor:
 *                         type: string
 *                         example: "Juan Pérez"
 *                       NitConductor:
 *                         type: string
 *                         example: "987654321"
 *                       FechaHoraCita:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-16T10:00:00Z"
 *                       MovilConductor:
 *                         type: string
 *                         example: "3001234567"
 *                       ContainerNum:
 *                         type: string
 *                         example: "CONT001"
 *                       Notas:
 *                         type: string
 *                         example: "Entregar a tiempo"
 *                       NombreEscolta:
 *                         type: string
 *                         example: "Pedro González"
 *                       FKCercaAutorizada:
 *                         type: integer
 *                         example: 8
 *                       FKLokSolicitud:
 *                         type: integer
 *                         example: 9
 *                       MovilEscolta:
 *                         type: string
 *                         example: "3109876543"
 *                       NotasTI:
 *                         type: string
 *                         example: "Verificar sistema"
 *                       FKLokCategoriaServ:
 *                         type: integer
 *                         example: 10
 *                       OtrosDatosTruck:
 *                         type: string
 *                         example: "Nuevo modelo"
 *                       FKICTransportadora:
 *                         type: integer
 *                         example: 11
 *                       FKLokInstalador:
 *                         type: integer
 *                         example: 12
 *                       FKLokDesistaladores:
 *                         type: integer
 *                         example: 13
 *                       NotaDesisntalaciones:
 *                         type: string
 *                         example: "Retirar con cuidado"
 *                       Contacto:
 *                         type: string
 *                         example: "contacto@empresa.com"
 *                       LokTipoServicios:
 *                         type: string
 *                         example: "Transporte"
 *                       chequeo_ident:
 *                         type: integer
 *                         description: ID del chequeo asociado al contrato.
 *                         example: 1001
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

router.post('/getinfocontratoproyecto', ContratosController.get_infocontratoproyecto);
/**
 * @swagger
 * /contratos/limpiarcontrato:
 *   post:
 *     summary: Limpiar información del contrato
 *     description: Ejecuta un procedimiento almacenado para limpiar la información de un contrato específico.
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
 *               contractID:
 *                 type: string
 *                 description: ID del contrato que se desea limpiar.
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Contrato limpiado exitosamente.
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
 *                     description: Resultado de la operación.
 *                     example:
 *                       column1: value1
 *                       column2: value2
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

router.post('/limpiarcontrato', ContratosController.limpiar_contrato);
/**
 * @swagger
 * /contratos/limpiarcontratoSalvoInfo:
 *   post:
 *     summary: Limpiar información del contrato, salvo información específica
 *     description: Ejecuta un procedimiento almacenado para limpiar la información de un contrato específico, preservando ciertos datos.
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
 *               contractID:
 *                 type: string
 *                 description: ID del contrato que se desea limpiar.
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Contrato limpiado exitosamente, salvo la información específica.
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
 *                     description: Resultado de la operación.
 *                     example:
 *                       column1: value1
 *                       column2: value2
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

router.post('/limpiarcontratoSalvoInfo', ContratosController.limpiar_contratoSalvoInfo);
/**
 * @swagger
 * /contratos/setupdatecontrato:
 *   post:
 *     summary: Actualiza los detalles de un contrato.
 *     description: Llama a un procedimiento almacenado para actualizar los detalles de un contrato especificado.
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
 *               FKICEmpresa:
 *                 type: integer
 *                 description: ID de la empresa principal.
 *                 example: 1
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
 *               FKICRutas:
 *                 type: integer
 *                 description: ID de la ruta.
 *                 example: 5
 *               Ref:
 *                 type: string
 *                 description: Referencia del contrato.
 *                 example: "REF123456"
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
 *                 example: "DEF456"
 *               NombreConductor:
 *                 type: string
 *                 description: Nombre del conductor.
 *                 example: "Juan Pérez"
 *               FKLokSolicitud:
 *                 type: integer
 *                 description: ID de la solicitud Lok. No debe ser null.
 *                 example: 6
 *               NitConductor:
 *                 type: string
 *                 description: NIT del conductor.
 *                 example: "987654321"
 *               MovilConductor:
 *                 type: string
 *                 description: Número de móvil del conductor.
 *                 example: "3001234567"
 *               ContainerNum:
 *                 type: string
 *                 description: Número del contenedor.
 *                 example: "CONT001"
 *               DigitoVerificacion:
 *                 type: string
 *                 description: Dígito de verificación del contenedor.
 *                 example: "2"
 *               FKLokTipoUnidadCarga:
 *                 type: integer
 *                 description: ID del tipo de unidad de carga. No debe ser null.
 *                 example: 7
 *               Notas:
 *                 type: string
 *                 description: Notas adicionales del contrato.
 *                 example: "Entregar a tiempo"
 *               NombreEscolta:
 *                 type: string
 *                 description: Nombre del escolta.
 *                 example: "Pedro González"
 *               MovilEscolta:
 *                 type: string
 *                 description: Número de móvil del escolta.
 *                 example: "3109876543"
 *               NotasTI:
 *                 type: string
 *                 description: Notas de TI.
 *                 example: "Verificar sistema"
 *               FKLokCategoriaServ:
 *                 type: integer
 *                 description: ID de la categoría de servicio.
 *                 example: 8
 *               OtrosDatosTruck:
 *                 type: string
 *                 description: Otros datos del camión.
 *                 example: "Nuevo modelo"
 *               FKICTransportadora:
 *                 type: integer
 *                 description: ID de la transportadora. Debe ser diferente de 3.
 *                 example: 9
 *               contractID:
 *                 type: string
 *                 description: ID del contrato.
 *                 example: "CONTRACT123"
 *               FKLokInstalador:
 *                 type: integer
 *                 description: ID del instalador.
 *                 example: 10
 *               FechaHoraCita:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de la cita.
 *                 example: "2024-08-16T10:00:00Z"
 *               FechaHoraCitaDescargue:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de la cita de descargue.
 *                 example: "2024-08-16T12:00:00Z"
 *               NotasDatosEntrega:
 *                 type: string
 *                 description: Notas sobre los datos de entrega.
 *                 example: "Cuidado con la carga"
 *               FechaHoraDescargue:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de descargue.
 *                 example: "2024-08-16T14:00:00Z"
 *               bitRestriccion:
 *                 type: boolean
 *                 description: Indicador de restricción.
 *                 example: false
 *               HoraInicioR:
 *                 type: string
 *                 description: Hora de inicio de restricción.
 *                 example: "08:00"
 *               HoraFinR:
 *                 type: string
 *                 description: Hora de fin de restricción.
 *                 example: "18:00"
 *               Solicitante:
 *                 type: string
 *                 description: Nombre del solicitante.
 *                 example: "Empresa XYZ"
 *               Contacto:
 *                 type: string
 *                 description: Información de contacto.
 *                 example: "contacto@empresa.com"
 *               LightBit:
 *                 type: boolean
 *                 description: Estado del bit de luz.
 *                 example: true
 *               critico:
 *                 type: boolean
 *                 description: Indicador de si el contrato es crítico.
 *                 example: true
 *               AlertasBit:
 *                 type: boolean
 *                 description: Estado del bit de alertas.
 *                 example: false
 *               FKCelloTrack:
 *                 type: integer
 *                 description: ID del CelloTrack.
 *                 example: 11
 *               FKLokModalidadServ:
 *                 type: integer
 *                 description: ID de la modalidad de servicio.
 *                 example: 12
 *               FKTipoDocumento:
 *                 type: integer
 *                 description: ID del tipo de documento.
 *                 example: 13
 *               FKCercaAutorizada:
 *                 type: integer
 *                 description: ID de la cerca autorizada.
 *                 example: 14
 *               Documento:
 *                 type: string
 *                 description: Número de documento.
 *                 example: "12345678"
 *               Equivalencia:
 *                 type: string
 *                 description: Equivalencia del contrato.
 *                 example: "Eq123"
 *               FKLokBarsSLM:
 *                 type: integer
 *                 description: ID de las barras SLM.
 *                 example: 15
 *               Active:
 *                 type: boolean
 *                 description: Estado de activación del contrato.
 *                 example: true
 *               FKLokDesistaladores:
 *                 type: integer
 *                 description: ID de los desistaladores.
 *                 example: 16
 *               NotaDesisntalaciones:
 *                 type: string
 *                 description: Nota sobre las desinstalaciones.
 *                 example: "Retirar con cuidado"
 *     responses:
 *       200:
 *         description: Contrato actualizado exitosamente.
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
 *                     description: Resultado de la operación.
 *                     example:
 *                       column1: value1
 *                       column2: value2
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

router.post('/setupdatecontrato', ContratosController.set_updatecontrato);
/**
 * @swagger
 * /contratos/gettiporeportes:
 *   get:
 *     summary: Obtiene los tipos de reportes disponibles.
 *     description: Retorna una lista de los tipos de reportes que están configurados para ser mostrados.
 *     tags:
 *       - Contratos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de reportes obtenida exitosamente.
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
 *                     description: Detalles del tipo de reporte.
 *                     properties:
 *                       IdTipoReporte:
 *                         type: integer
 *                         example: 1
 *                       TipoReporte:
 *                         type: string
 *                         example: "Reporte de Seguridad"
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

router.get('/gettiporeportes', ContratosController.get_tiporeportes);
/**
 * @swagger
 * /contratos/gettipoacciones:
 *   get:
 *     summary: Obtiene los tipos de acciones disponibles.
 *     description: Retorna una lista de los tipos de acciones configurados para ser mostrados.
 *     tags:
 *       - Contratos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de acciones obtenida exitosamente.
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
 *                     description: Detalles del tipo de acción.
 *                     properties:
 *                       IdTipoAccion:
 *                         type: integer
 *                         example: 1
 *                       TipoAccion:
 *                         type: string
 *                         example: "Acción Correctiva"
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

router.get('/gettipoacciones', ContratosController.get_tipoacciones);
/**
 * @swagger
 * /contratos/getreportetraficoid:
 *   post:
 *     summary: Obtiene un reporte de tráfico específico por ID.
 *     description: Retorna los detalles de un reporte de tráfico específico según el ID proporcionado.
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
 *               IdReport:
 *                 type: integer
 *                 description: ID del reporte de tráfico.
 *                 example: 123
 *     responses:
 *       200:
 *         description: Reporte de tráfico obtenido exitosamente.
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
 *                     description: Detalles del reporte de tráfico.
 *                     properties:
 *                       IdReport:
 *                         type: integer
 *                         example: 123
 *                       NombreReporte:
 *                         type: string
 *                         example: "Reporte de Tráfico 123"
 *                       FechaCreacion:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-09-02T10:00:00Z"
 *                       Estado:
 *                         type: string
 *                         example: "Completado"
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

router.post('/getreportetraficoid', ContratosController.get_reportetraficoid);
/**
 * @swagger
 * /contratos/getaseguradotiporeporte:
 *   post:
 *     summary: Obtiene el estado de aseguramiento para un tipo de reporte específico.
 *     description: Retorna si un tipo de reporte está asegurado, según su ID proporcionado.
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
 *               FKICTipoReporte:
 *                 type: integer
 *                 description: ID del tipo de reporte.
 *                 example: 456
 *     responses:
 *       200:
 *         description: Estado de aseguramiento obtenido exitosamente.
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
 *                       Asegurar:
 *                         type: boolean
 *                         description: Indica si el tipo de reporte está asegurado.
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

router.post('/getaseguradotiporeporte', ContratosController.get_aseguradotiporeporte);
/**
 * @swagger
 * /contratos/getreportestrafico:
 *   post:
 *     summary: Obtiene los reportes de tráfico asociados a un contrato específico.
 *     description: Retorna una lista de reportes de tráfico para un contrato dado, incluyendo detalles como tipo de reporte, ubicación, nota, tiempo y usuario.
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
 *                 description: ID del contrato para el cual se desean obtener los reportes.
 *                 example: "CONTRACT123"
 *     responses:
 *       200:
 *         description: Lista de reportes de tráfico obtenida exitosamente.
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
 *                       IdReport:
 *                         type: integer
 *                         description: ID del reporte.
 *                         example: 101
 *                       TipoReporte:
 *                         type: string
 *                         description: Tipo de reporte asociado.
 *                         example: "Trafico Normal"
 *                       Ubicacion:
 *                         type: string
 *                         description: Ubicación asociada al reporte.
 *                         example: "Ubicación XYZ"
 *                       Nota:
 *                         type: string
 *                         description: Nota del reporte, incluyendo una indicación si el reporte es automático.
 *                         example: "Nota del reporte (A)"
 *                       XTime:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora del reporte.
 *                         example: "2023-12-01T14:30:00Z"
 *                       XUser:
 *                         type: string
 *                         description: Usuario que generó el reporte.
 *                         example: "user123"
 *                       TipoAccion:
 *                         type: string
 *                         description: Tipo de acción asociada al reporte.
 *                         example: "Accion XYZ"
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

router.post('/getreportestrafico', ContratosController.get_reportestrafico);
/**
 * @swagger
 * /contratos/deletereportetrafico:
 *   post:
 *     summary: Elimina un reporte de tráfico específico.
 *     description: Permite eliminar un reporte de tráfico identificado por su ID. El usuario debe estar autenticado y autorizado para realizar esta acción.
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
 *               IdReport:
 *                 type: integer
 *                 description: ID del reporte que se desea eliminar.
 *                 example: 101
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
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Información adicional sobre la eliminación del reporte.
 *                     example: []
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

router.post('/deletereportetrafico', ContratosController.delete_reportetrafico);
/**
 * @swagger
 * /contratos/insertreportetrafico:
 *   post:
 *     summary: Inserta un nuevo reporte de tráfico.
 *     description: Permite agregar un nuevo reporte de tráfico a la base de datos. El usuario debe estar autenticado y autorizado para realizar esta acción.
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
 *               FKICTipoReporte:
 *                 type: integer
 *                 description: ID del tipo de reporte.
 *                 example: 1
 *               FKLokTipoAccion:
 *                 type: integer
 *                 description: ID del tipo de acción.
 *                 example: 2
 *               Ubicacion:
 *                 type: string
 *                 description: Ubicación del evento.
 *                 example: "Calle 123"
 *               Nota:
 *                 type: string
 *                 description: Nota o comentario adicional.
 *                 example: "Nuevo reporte de tráfico"
 *               XTime:
 *                 type: string
 *                 description: Fecha y hora del reporte.
 *                 example: "2023-09-01T12:34:56Z"
 *               FKLokContractID:
 *                 type: integer
 *                 description: ID del contrato relacionado con el reporte.
 *                 example: 101
 *               Individual:
 *                 type: boolean
 *                 description: Indica si el reporte es individual.
 *                 example: true
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
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Información adicional sobre el reporte insertado.
 *                     example: []
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
 *                   description: Indica si la operación fue exitosa.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Detalle del error de autenticación.
 *                   example: "Failed to authenticate token"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: false
 */

router.post('/insertreportetrafico', ContratosController.insert_reportetrafico);
/**
 * @swagger
 * /contratos/updatereportetrafico:
 *   post:
 *     summary: Actualiza un reporte de tráfico existente.
 *     description: Permite actualizar los detalles de un reporte de tráfico existente. El usuario debe estar autenticado y autorizado para realizar esta acción.
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
 *               FKICTipoReporte:
 *                 type: integer
 *                 description: ID del tipo de reporte.
 *                 example: 1
 *               FKLokTipoAccion:
 *                 type: integer
 *                 description: ID del tipo de acción.
 *                 example: 2
 *               Ubicacion:
 *                 type: string
 *                 description: Ubicación del evento.
 *                 example: "Calle 123"
 *               Nota:
 *                 type: string
 *                 description: Nota o comentario adicional.
 *                 example: "Actualización de reporte"
 *               IdReport:
 *                 type: integer
 *                 description: ID del reporte a actualizar.
 *                 example: 1001
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
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Información adicional sobre la actualización del reporte.
 *                     example: []
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
 *                   description: Indica si la operación fue exitosa.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Detalle del error de autenticación.
 *                   example: "Failed to authenticate token"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: false
 */

router.post('/updatereportetrafico', ContratosController.update_reportetrafico);
/**
 * @swagger
 * /contratos/insertfiltro:
 *   post:
 *     summary: Inserta o actualiza un filtro de tráfico.
 *     description: Permite insertar un nuevo filtro o actualizar uno existente, dependiendo del valor de `IdFiltro`.
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
 *             required:
 *               - IdFiltro
 *               - DescripcionFiltro
 *               - FiltroJson
 *               - FkIdUser
 *             properties:
 *               IdFiltro:
 *                 type: integer
 *                 description: ID del filtro. Use -1 para insertar un nuevo filtro.
 *                 example: -1
 *               DescripcionFiltro:
 *                 type: string
 *                 description: Descripción del filtro.
 *                 example: "Filtro de tráfico importante"
 *               FiltroJson:
 *                 type: string
 *                 description: Contenido del filtro en formato JSON.
 *                 example: "{\"key\": \"value\"}"
 *               FkIdUser:
 *                 type: string
 *                 description: ID del usuario que crea o actualiza el filtro.
 *                 example: "username"
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
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Resultados de la consulta en caso de éxito.
 *       400:
 *         description: Error en la solicitud, falta el token.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Token is missing
 *       401:
 *         description: Error de autenticación, token inválido o expirado.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Failed to authenticate token
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 */

router.post('/insertfiltro', ContratosController.insert_filtro);

module.exports = router;
