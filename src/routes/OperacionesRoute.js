const express = require('express');
const router = express.Router();
const multer = require('multer');

// Guardar en memoria (lo mismo que usas en tu controller)
const upload = multer({ storage: multer.memoryStorage() });
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
 * /operaciones/uploadplantilla:
 *   post:
 *     summary: Subir una plantilla al servidor y enviarla a Azure
 *     description: >
 *       Este endpoint permite subir un archivo (plantilla) al servidor.
 *       El archivo se recibe en memoria y luego se envía al servicio externo de Azure SmartForms.
 *       Se requiere autenticación mediante token JWT en el header `Authorization`.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de plantilla a subir
 *     responses:
 *       200:
 *         description: Archivo subido correctamente a Azure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 info:
 *                   type: object
 *                   description: Respuesta del servicio de Azure
 *       400:
 *         description: No se envió un archivo en la petición
 *       401:
 *         description: Token JWT faltante o inválido
 *       500:
 *         description: Error al subir el archivo a Azure
 */

 router.post('/uploadplantilla',upload.single('file'), OperacionesController.upload_plantilla);
 /**
  * @swagger
  * /operaciones/setplantilla:
  *   post:
  *     summary: Crear o actualizar una plantilla
  *     description: >
  *       Crea una nueva plantilla o actualiza una existente en la base de datos `LokPlantillas`.
  *       Si el campo `IDPlantilla` es **-1**, se crea una nueva plantilla.
  *       En caso contrario, se actualiza la plantilla con el ID especificado.
  *       Requiere autenticación mediante token JWT en el header `Authorization`.
  *     tags:
  *       - Operaciones
  *     security:
  *       - bearerAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - IDPlantilla
  *               - NombrePlantilla
  *               - JsonData
  *               - FKEmpresa
  *               - UrlFile
  *             properties:
  *               IDPlantilla:
  *                 type: integer
  *                 example: -1
  *                 description: >
  *                   ID de la plantilla.
  *                   Use **-1** para insertar una nueva plantilla.
  *                   Use un ID existente para actualizar.
  *               NombrePlantilla:
  *                 type: string
  *                 example: "Formato Inspección Vehicular"
  *               JsonData:
  *                 type: string
  *                 example: "{\"campos\": [{\"nombre\": \"placa\", \"tipo\": \"texto\"}]}"
  *                 description: Estructura JSON que define los campos del formulario o plantilla
  *               UrlFile:
  *                 type: string
  *                 example: "https://misarchivos.blob.core.windows.net/plantillas/inspeccion.pdf"
  *                 description: URL del archivo asociado a la plantilla
  *     responses:
  *       200:
  *         description: Operación exitosa (inserción o actualización)
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
  *                   description: Resultado de la consulta SQL
  *       400:
  *         description: Faltan parámetros requeridos
  *       401:
  *         description: Token JWT faltante o inválido
  *       500:
  *         description: Error interno del servidor
  */

router.post('/setplantilla', OperacionesController.set_plantilla);
/**
 * @swagger
 * /operaciones/getplantillas:
 *   get:
 *     summary: Obtener las plantillas de la empresa
 *     description: >
 *       Retorna todas las plantillas registradas en la tabla **LokPlantillas**
 *       asociadas a la empresa del usuario autenticado.
 *       Requiere autenticación mediante token JWT en el header `Authorization`.
 *     tags:
 *       - Operaciones
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
 *         description: Lista de plantillas obtenida correctamente
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
 *                       IDPlantilla:
 *                         type: integer
 *                         example: 12
 *                       NombrePlantilla:
 *                         type: string
 *                         example: "Formato de Inspección Vehicular"
 *                       JsonData:
 *                         type: string
 *                         example: "{\"campos\": [{\"nombre\": \"placa\", \"tipo\": \"texto\"}]}"
 *                       FKEmpresa:
 *                         type: integer
 *                         example: 5
 *                       UrlFile:
 *                         type: string
 *                         example: "https://misarchivos.blob.core.windows.net/plantillas/inspeccion.pdf"
 *       401:
 *         description: Token JWT faltante o inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get('/getplantillas', OperacionesController.get_plantillas);
router.post('/setrespuestaplantillasinauth', OperacionesController.set_respuestaplantillasinauth);
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
 * /operaciones/getcategoriasBI:
 *   get:
 *     summary: Obtiene las categorías de reportes BI
 *     description: Retorna todas las categorías almacenadas en la tabla `LokReportCategorias`. Requiere autenticación con JWT.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías obtenidas correctamente
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
 *                       IdCategoria:
 *                         type: integer
 *                         example: 1
 *                       NombreCategoria:
 *                         type: string
 *                         example: "Ventas"
 *                       Descripcion:
 *                         type: string
 *                         example: "Reportes relacionados con ventas"
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

router.get('/getcategoriasBI', OperacionesController.get_categoriasBI);
/**
 * @swagger
 * /operaciones/setreportesBI:
 *   post:
 *     tags:
 *       - Operaciones
 *     summary: Inserta o actualiza un reporte de Power BI
 *     description: >
 *       Inserta un nuevo reporte de Power BI o actualiza uno existente en la tabla `LokReportesPBI`.
 *       Requiere un token JWT válido en el header `Authorization`.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Id_Reporte
 *               - NombreReporte
 *               - Id_PowerBI
 *               - BitFiltroProyecto
 *               - BitFiltroEmpresa
 *               - ReportCategoria
 *               - RolesAutorizados
 *             properties:
 *               Id_Reporte:
 *                 type: integer
 *                 example: -1
 *                 description: |
 *                   ID del reporte.
 *                   Si es **-1**, se crea un nuevo registro.
 *                   Si es distinto de -1, se actualiza el reporte con ese ID.
 *               NombreReporte:
 *                 type: string
 *                 example: "Reporte de Ventas"
 *               Id_PowerBI:
 *                 type: string
 *                 example: "abc123-powerbi-id"
 *               BitFiltroProyecto:
 *                 type: boolean
 *                 example: true
 *               BitFiltroEmpresa:
 *                 type: boolean
 *                 example: false
 *               ReportCategoria:
 *                 type: integer
 *                 example: 2
 *                 description: ID de la categoría (FK de LokReportCategorias)
 *               RolesAutorizados:
 *                 type: string
 *                 example: "admin,gerente"
 *                 description: Lista separada por comas de roles autorizados
 *     responses:
 *       200:
 *         description: Operación exitosa
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
 *                   nullable: true
 *                   description: Respuesta SQL
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
 *                   example: "Failed to authenticate token"
 *       500:
 *         description: Error interno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.post('/setreportesBI', OperacionesController.set_reportesBI);
/**
 * @swagger
 * /operaciones/getcontratoscontroldevice:
 *   post:
 *     summary: Obtener contratos de control de un dispositivo
 *     description: Recupera la lista de contratos asociados a un dispositivo específico dentro de un proyecto.
 *     tags:
 *       - Operaciones
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device:
 *                 type: string
 *                 description: ID del dispositivo para buscar contratos asociados.
 *                 example: "ABC123"
 *     responses:
 *       200:
 *         description: Lista de contratos obtenida exitosamente.
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
 *                       ContractID:
 *                         type: integer
 *                         description: ID del contrato.
 *                         example: 101
 *                       NombreEmpresa:
 *                         type: string
 *                         description: Nombre de la empresa asociada.
 *                         example: "Empresa X"
 *                       DescripcionRuta:
 *                         type: string
 *                         description: Descripción de la ruta asignada.
 *                         example: "Ruta 5 Norte"
 *                       InicioServicio:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de inicio del contrato.
 *                         example: "2024-09-25T08:00:00Z"
 *                       FechaHoraFin:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de finalización del contrato.
 *                         example: "2024-09-25T10:00:00Z"
 *                       Position:
 *                         type: string
 *                         description: Ubicación asociada al contrato.
 *                         example: "Ciudad X, Departamento Y"
 *       401:
 *         description: Token no válido o ausente.
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
 *                   example: "Token is missing"
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

router.post('/getcontratoscontroldevice', OperacionesController.get_contratoscontroldevice);
/**
 * @swagger
 * /operaciones/getinfofechascontrato:
 *   post:
 *     summary: Obtener información de fechas de un contrato
 *     description: Recupera las fechas de inicio y fin de un contrato específico.
 *     tags:
 *       - Operaciones
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrato:
 *                 type: string
 *                 description: ID del contrato a consultar.
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
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ContractID:
 *                         type: integer
 *                         description: ID del contrato.
 *                         example: 12345
 *                       FKLokDeviceID:
 *                         type: string
 *                         description: ID del dispositivo asociado al contrato.
 *                         example: "ABC123"
 *                       InicioServicio:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de inicio del contrato.
 *                         example: "2024-09-25T08:00:00Z"
 *                       FechaHoraInicio:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora real de inicio.
 *                         example: "2024-09-25T08:15:00Z"
 *                       FechaHoraFin:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora real de finalización.
 *                         example: "2024-09-25T10:00:00Z"
 *       401:
 *         description: Token no válido o ausente.
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
 *                   example: "Token is missing"
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

router.post('/getinfofechascontrato', OperacionesController.get_infofechascontrato);
/**
 * @swagger
 * /operaciones/setfechascontrato:
 *   post:
 *     summary: Actualizar fechas de un contrato
 *     description: Modifica las fechas de instalación, inicio y fin de un contrato específico.
 *     tags:
 *       - Operaciones
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrato:
 *                 type: string
 *                 description: ID del contrato a modificar.
 *                 example: "12345"
 *               instalacion:
 *                 type: string
 *                 format: date-time
 *                 description: Nueva fecha de instalación.
 *                 example: "2024-09-25T08:00:00Z"
 *               inicio:
 *                 type: string
 *                 format: date-time
 *                 description: Nueva fecha de inicio del servicio.
 *                 example: "2024-09-25T08:15:00Z"
 *               fin:
 *                 type: string
 *                 format: date-time
 *                 description: Nueva fecha de finalización del servicio.
 *                 example: "2024-09-25T10:00:00Z"
 *     responses:
 *       200:
 *         description: Fechas del contrato actualizadas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Token no válido o ausente.
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
 *                   example: "Token is missing"
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

router.post('/setfechascontrato', OperacionesController.set_fechascontrato);
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
router.post('/gethistoricossinauth', OperacionesController.list_historicos_sinauth);
/**
 * @swagger
 * /operaciones/getcontratounico:
 *   post:
 *     summary: Obtiene información detallada de un contrato único.
 *     description: Recupera información relacionada a un contrato único, como detalles del vehículo, conductor, ubicación y tiempos de servicio.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: ID del contrato para obtener la información.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrato:
 *                 type: string
 *                 description: ID del contrato.
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Información del contrato recuperada exitosamente.
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
 *                     properties:
 *                       ContractID:
 *                         type: string
 *                         description: ID del contrato.
 *                         example: "12345"
 *                       FKLokDeviceID:
 *                         type: string
 *                         description: ID del dispositivo asociado.
 *                         example: "98765"
 *                       NombreEmpresa:
 *                         type: string
 *                         description: Nombre de la empresa.
 *                         example: "Transportes XYZ"
 *                       PlacaTruck:
 *                         type: string
 *                         description: Placa del camión.
 *                         example: "ABC123"
 *                       username:
 *                         type: string
 *                         description: Nombre de usuario que hizo la consulta.
 *                         example: "admin"
 *                       fecha:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de la consulta.
 *                         example: "2023-09-15T08:30:00"
 *                       pos:
 *                         type: string
 *                         description: Ubicación (latitud, longitud).
 *                         example: "10.123456,-84.123456"
 *                       trayecto:
 *                         type: integer
 *                         description: ID del trayecto.
 *                         example: 2
 *                       DescripcionRuta:
 *                         type: string
 *                         description: Descripción de la ruta.
 *                         example: "Ruta Norte"
 *                       DescripcionTrayecto:
 *                         type: string
 *                         description: Descripción del trayecto.
 *                         example: "Trayecto Principal"
 *                       ContainerNum:
 *                         type: string
 *                         description: Número del contenedor.
 *                         example: "C12345"
 *                       NombreConductor:
 *                         type: string
 *                         description: Nombre del conductor.
 *                         example: "Juan Pérez"
 *                       Ref:
 *                         type: string
 *                         description: Referencia del contrato.
 *                         example: "REF-001"
 *                       NombreTranspo:
 *                         type: string
 *                         description: Nombre de la empresa transportadora.
 *                         example: "Transportadora ABC"
 *                       MovilConductor:
 *                         type: string
 *                         description: Número de móvil del conductor.
 *                         example: "+50612345678"
 *                       PlacaTrailer:
 *                         type: string
 *                         description: Placa del remolque.
 *                         example: "DEF456"
 *                       fechainicio:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de inicio del servicio.
 *                         example: "2023-09-15T08:30:00"
 *                       fechafin:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de fin del servicio.
 *                         example: "2023-09-15T18:30:00"
 *                       LastMsgLat:
 *                         type: string
 *                         description: Última latitud reportada.
 *                         example: "10.123456"
 *                       LastMsgLong:
 *                         type: string
 *                         description: Última longitud reportada.
 *                         example: "-84.123456"
 *                       Active:
 *                         type: boolean
 *                         description: Indica si el contrato está activo.
 *                         example: true
 *                       Locked:
 *                         type: boolean
 *                         description: Indica si el dispositivo está bloqueado.
 *                         example: false
 *                       DistanciaCompleta:
 *                         type: number
 *                         format: float
 *                         description: Distancia total recorrida en el trayecto.
 *                         example: 150.75
 *                       Origen:
 *                         type: string
 *                         description: Origen del trayecto.
 *                         example: "San José"
 *                       FKLokTipoEquipo:
 *                         type: string
 *                         description: Tipo de equipo asociado al contrato.
 *                         example: "GPS Tracker"
 *                       LastReportNota:
 *                         type: string
 *                         description: Última nota reportada.
 *                         example: "Todo en orden"
 *                       LastReportUbica:
 *                         type: string
 *                         description: Última ubicación reportada.
 *                         example: "Punto A"
 *                       LastReportTime:
 *                         type: string
 *                         format: date-time
 *                         description: Última fecha y hora del reporte.
 *                         example: "2023-09-15T08:30:00"
 *                       TiempoServ:
 *                         type: string
 *                         description: Tiempo total de servicio.
 *                         example: "3 horas 15 minutos"
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

router.post('/getcontratounico', OperacionesController.get_contratounico);
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
 * /operaciones/getcontratostraficooculto:
 *   get:
 *     summary: Obtener contratos de trafico oculto
 *     description: Endpoint para obtener contratos de trafico oculto asociados al proyecto.
 *     tags:
 *       - Operaciones
 *     responses:
 *       200:
 *         description: Contratos de trafico oculto obtenidos con exito.
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
router.get('/getcontratostraficooculto', OperacionesController.get_contratostraficooculto);
/**
 * @swagger
 * /operaciones/getcontratostraficocritico:
 *   get:
 *     summary: Obtiene contratos de tráfico crítico.
 *     description: Recupera una lista de contratos que están en estado crítico con detalles de ubicación, tiempo y más información relacionada. El usuario debe estar autenticado para realizar esta solicitud.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contratos en tráfico crítico recuperada exitosamente.
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
 *                     properties:
 *                       ContractID:
 *                         type: integer
 *                         description: ID del contrato.
 *                         example: 12345
 *                       NombreEmpresa:
 *                         type: string
 *                         description: Nombre de la empresa.
 *                         example: "Empresa XYZ"
 *                       PlacaTruck:
 *                         type: string
 *                         description: Placa del camión.
 *                         example: "ABC123"
 *                       NombreConductor:
 *                         type: string
 *                         description: Nombre del conductor.
 *                         example: "Juan Pérez"
 *                       LastMsgLat:
 *                         type: string
 *                         description: Latitud del último mensaje.
 *                         example: "-25.363882"
 *                       LastMsgLong:
 *                         type: string
 *                         description: Longitud del último mensaje.
 *                         example: "131.044922"
 *                       LastReportUbica:
 *                         type: string
 *                         description: Última ubicación reportada.
 *                         example: "Calle 123 (10 min)"
 *                       Tiempo:
 *                         type: string
 *                         description: Tiempo transcurrido desde el último reporte.
 *                         example: "5 minutos"
 *                       Bateria:
 *                         type: number
 *                         description: Nivel de batería del dispositivo.
 *                         example: 3.75
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

router.get('/getcontratostraficocritico', OperacionesController.get_contratostraficocritico);
/**
 * @swagger
 * /operaciones/getlatlngcontrato:
 *   post:
 *     summary: Obtiene la latitud y longitud de un contrato específico.
 *     description: Recupera la última latitud y longitud asociada a un contrato proporcionado. El usuario debe estar autenticado para realizar esta solicitud.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Contrato para el cual se solicita la latitud y longitud.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrato:
 *                 type: string
 *                 description: ID del contrato.
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Latitud y longitud del contrato recuperadas exitosamente.
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
 *                     properties:
 *                       LastMsgLat:
 *                         type: string
 *                         description: Última latitud registrada.
 *                         example: "-25.363882"
 *                       LastMsgLong:
 *                         type: string
 *                         description: Última longitud registrada.
 *                         example: "131.044922"
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

router.post('/getlatlngcontrato', OperacionesController.get_latlngcontrato);
/**
 * @swagger
 * /operaciones/getinfocontrato:
 *   post:
 *     summary: Obtiene la información detallada de un contrato.
 *     description: Recupera información clave asociada a un contrato específico, como el dispositivo asignado, el estado del servicio y la finalización del contrato.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: ID del contrato para el cual se solicita la información.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrato:
 *                 type: string
 *                 description: ID del contrato.
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Información del contrato recuperada exitosamente.
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
 *                     properties:
 *                       Dispositivo:
 *                         type: string
 *                         description: ID del dispositivo asignado.
 *                         example: "98765"
 *                       ComienzoServicio:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de inicio del servicio.
 *                         example: "2023-09-15T08:30:00"
 *                       backup_:
 *                         type: string
 *                         description: Indica si el contrato tiene respaldo.
 *                         example: "NO"
 *                       FinalServicio:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de finalización del servicio.
 *                         example: "2023-09-15T18:30:00"
 *                       isActive:
 *                         type: boolean
 *                         description: Indica si el contrato está activo.
 *                         example: true
 *                       FKLokTipoEquipo:
 *                         type: string
 *                         description: Tipo de equipo asignado al contrato.
 *                         example: "GPS Tracker"
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

router.post('/getinfocontrato', OperacionesController.get_infocontrato);
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
router.post('/getreportesdevice2', OperacionesController.get_reportesdevice2);
router.post('/getreportesdevicesimplificado', OperacionesController.get_reportesdevicesimplificado);
router.get('/getnotificaciones', OperacionesController.get_notificaciones);
router.get('/notificacionprueba', OperacionesController.notificacionprueba);
/**
 * @swagger
 * /operaciones/getdispositivoscambio:
 *   post:
 *     summary: Obtener lista de dispositivos disponibles para cambio
 *     description: Devuelve los dispositivos del proyecto origen que están disponibles para realizar un cambio (sin contrato activo y en estado 1).
 *     tags:
 *       - Operaciones
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proyectoorigen:
 *                 type: integer
 *                 description: ID del proyecto origen desde donde se desea obtener los dispositivos disponibles.
 *                 example: 3
 *     responses:
 *       200:
 *         description: Lista de dispositivos disponibles retornada exitosamente.
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
 *                       DeviceID:
 *                         type: string
 *                         example: "ABC123"
 *                       LastContractID:
 *                         type: string
 *                         example: "none"
 *                       FKLokProyecto:
 *                         type: integer
 *                         example: 3
 *                       Estado:
 *                         type: integer
 *                         example: 1
 *       401:
 *         description: Token ausente o no válido.
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
 *                   example: "Token is missing"
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
router.post('/getdispositivoscambio', OperacionesController.get_dispositivoscambio);
/**
 * @swagger
 * /operaciones/getexistencontratos:
 *   post:
 *     summary: Verifica si existen contratos en la base de datos
 *     description: >
 *       Recibe una lista de IDs de contratos y retorna aquellos que existen
 *       en la tabla **LokContractID**, según la empresa del usuario autenticado.
 *       Requiere autenticación mediante token JWT en el header `Authorization`.
 *     tags:
 *       - Operaciones
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contratos:
 *                 type: string
 *                 example: "1001,1002,1005"
 *                 description: Lista separada por coma de ContractID a validar
 *     responses:
 *       200:
 *         description: Resultado de contratos encontrados
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
 *                   example:
 *                     recordset:
 *                       - ContractID: 1001
 *                       - ContractID: 1005
 *       401:
 *         description: Token JWT faltante o inválido
 *       500:
 *         description: Error interno del servidor
 */

router.post('/getexistencontratos', OperacionesController.get_existencontratos);

/**
 * @swagger
 * /operaciones/updatecambioproyecto:
 *   post:
 *     summary: Actualiza el proyecto de multiples dispositivos
 *     description: Cambia el proyecto FKLokProyecto de los dispositivos especificados a uno nuevo.
 *     tags:
 *       - Operaciones
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listadevice:
 *                 type: string
 *                 description: Lista de DeviceID separados por coma
 *                 example: "ABC123,XYZ456"
 *               proyectodestino:
 *                 type: integer
 *                 description: ID del nuevo proyecto al cual mover los dispositivos.
 *                 example: 5
 *     responses:
 *       200:
 *         description: Actualización exitosa del proyecto para los dispositivos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Lista de dispositivos vacía.
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
 *                   example: "Device list is empty"
 *       401:
 *         description: Token ausente o inválido.
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
 *                   example: "Token is missing"
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
router.post('/updatecambioproyecto', OperacionesController.update_cambioproyecto);

/**
 * @swagger
 * /operaciones/updatechecklist:
 *   post:
 *     summary: Actualiza informacion del checklist de un contrato
 *     description: Permite actualizar el nombre del conductor, la placa y agregar observaciones a un registro de checklist asociado a un contrato.
 *     tags:
 *       - Operaciones
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrato:
 *                 type: string
 *                 description: ID del contrato relacionado con el checklist.
 *                 example: "CNT-001"
 *               conductor:
 *                 type: string
 *                 description: Nombre del conductor.
 *                 example: "Juan Pérez"
 *               placa:
 *                 type: string
 *                 description: Placa del vehículo.
 *                 example: "ABC123"
 *               observaciones:
 *                 type: string
 *                 description: Observaciones adicionales para el checklist.
 *                 example: "Se encontró la unidad con rayón en el costado derecho."
 *     responses:
 *       200:
 *         description: Actualización exitosa del checklist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Faltan datos obligatorios (por ejemplo, contrato vacío).
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
 *                   example: "Faltan datos"
 *       401:
 *         description: Token ausente o inválido.
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
 *                   example: "Token is missing"
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

router.post('/updatechecklist', OperacionesController.update_checklist);
/**
 * @swagger
 * /operaciones/getreportescontroldevice:
 *   post:
 *     summary: Obtiene reportes de control de dispositivos
 *     description: Retorna un listado detallado de dispositivos con su estado, voltaje, contrato, cliente y otros datos relacionados al control del dispositivo.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - proyecto
 *               - filtro
 *               - estado
 *               - orden1
 *               - orden2
 *             properties:
 *               proyecto:
 *                 type: integer
 *                 example: 1
 *               filtro:
 *                 type: string
 *                 example: "ABC123"
 *               estado:
 *                 type: string
 *                 example: "1"
 *               orden1:
 *                 type: string
 *                 example: "Activos"
 *               orden2:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       200:
 *         description: Lista de dispositivos obtenida exitosamente
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
 *                       DeviceID:
 *                         type: string
 *                         example: "DEV12345"
 *                       UltContrato:
 *                         type: string
 *                         example: "CONTR123"
 *                       Ruta:
 *                         type: string
 *                         example: "Ruta Norte"
 *                       Cliente:
 *                         type: string
 *                         example: "Empresa XYZ"
 *                       IDEstado:
 *                         type: integer
 *                         example: 1
 *                       Estado:
 *                         type: string
 *                         example: "Activo"
 *                       voltage:
 *                         type: number
 *                         example: 3.7
 *                       icon_bat:
 *                         type: string
 *                         example: "battery-full"
 *                       eventDateTime:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-08-26T15:30:00Z"
 *                       Position:
 *                         type: string
 *                         example: "Bogotá, Cundinamarca"
 *                       Compania:
 *                         type: string
 *                         example: "Claro (732)"
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
 *         description: Error interno en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
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
/**
 * @swagger
 * /operaciones/getproyectos:
 *   get:
 *     summary: Obtiene la lista de proyectos.
 *     description: Recupera la información de proyectos. Si el token pertenece a un usuario con un proyecto específico, solo devuelve ese proyecto.
 *     tags:
 *       - Operaciones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de proyectos recuperada exitosamente.
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
 *                     properties:
 *                       IDProyecto:
 *                         type: integer
 *                         description: ID del proyecto.
 *                         example: 1
 *                       Descripcion:
 *                         type: string
 *                         description: Descripción del proyecto.
 *                         example: "Proyecto A"
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
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: false
 */

router.get('/getproyectos', OperacionesController.get_proyectos);


module.exports = router;
