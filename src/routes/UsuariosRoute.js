const express = require('express');
const router = express.Router();
const UsuariosController = require('../controller/UsuariosController');

/**
 * @swagger
 * /usuarios/getusuarios:
 *   get:
 *     summary: Obtiene la lista de usuarios activos.
 *     description: Recupera información detallada de los usuarios activos, incluyendo empresa, proyecto, rol, y más.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios recuperada exitosamente.
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
 *                       idUser:
 *                         type: integer
 *                         description: ID del usuario.
 *                         example: 123
 *                       FKICEmpresa:
 *                         type: integer
 *                         description: ID de la empresa asociada.
 *                         example: 1
 *                       FKProyecto:
 *                         type: integer
 *                         description: ID del proyecto asociado.
 *                         example: 2
 *                       tipoUser:
 *                         type: integer
 *                         description: Tipo de usuario (rol).
 *                         example: 5
 *                       IDRol:
 *                         type: integer
 *                         description: ID del rol.
 *                         example: 3
 *                       NombreEmpresa:
 *                         type: string
 *                         description: Nombre de la empresa.
 *                         example: "Empresa XYZ"
 *                       NombreRol:
 *                         type: string
 *                         description: Nombre del rol del usuario.
 *                         example: "Administrador"
 *                       Descripcion:
 *                         type: string
 *                         description: Descripción del proyecto asociado.
 *                         example: "Proyecto Alpha"
 *                       descr_roltrafico:
 *                         type: string
 *                         description: Descripción del rol de tráfico asociado.
 *                         example: "Rol de tráfico principal"
 *                       id_roltrafico:
 *                         type: integer
 *                         description: ID del rol de tráfico.
 *                         example: 1
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

router.get('/getusuarios', UsuariosController.get_usuarios);
/**
 * @swagger
 * /usuarios/getlistaproyectos:
 *   get:
 *     summary: Obtiene la lista de proyectos.
 *     description: Recupera la lista de proyectos, con la posibilidad de filtrarla según el proyecto del usuario autenticado.
 *     tags:
 *       - Usuarios
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
 *                         example: "Proyecto de Infraestructura"
 *                       ProyectoOwner:
 *                         type: integer
 *                         description: ID del dueño del proyecto.
 *                         example: 5
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

router.get('/getlistaproyectos', UsuariosController.get_listaproyectos);
/**
 * @swagger
 * /usuarios/getlistaempresa:
 *   post:
 *     summary: Obtiene la lista de empresas por proyecto.
 *     description: Recupera una lista de empresas asociadas a un proyecto específico.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proyecto:
 *                 type: integer
 *                 description: ID del proyecto para filtrar las empresas.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Lista de empresas recuperada exitosamente.
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
 *                       IdEmpresa:
 *                         type: integer
 *                         description: ID de la empresa.
 *                         example: 101
 *                       NombreEmpresa:
 *                         type: string
 *                         description: Nombre de la empresa.
 *                         example: "Empresa XYZ"
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

router.post('/getlistaempresa', UsuariosController.get_listaempresa);
/**
 * @swagger
 * /usuarios/getlistaempresasFijaInventario:
 *   post:
 *     summary: Obtiene la lista de empresas con inventario fijo asociadas a un proyecto.
 *     description: Recupera una lista de empresas que tienen inventario fijo dentro de un proyecto específico.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proyecto:
 *                 type: integer
 *                 description: ID del proyecto para filtrar las empresas.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Lista de empresas recuperada exitosamente.
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
 *                       IdEmpresa:
 *                         type: integer
 *                         description: ID de la empresa.
 *                         example: 101
 *                       NombreEmpresa:
 *                         type: string
 *                         description: Nombre de la empresa.
 *                         example: "Empresa Fija Inventario XYZ"
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

router.post('/getlistaempresasFijaInventario', UsuariosController.get_listaempresasFijaInventario);
/**
 * @swagger
 * /usuarios/getlistaRolusuarios:
 *   post:
 *     summary: Obtiene la lista de roles de usuarios.
 *     description: Recupera la lista de roles disponibles para un proyecto específico y de acuerdo con el tipo de usuario autenticado.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proyecto:
 *                 type: integer
 *                 description: ID del proyecto para filtrar los roles.
 *                 example: 9
 *     responses:
 *       200:
 *         description: Lista de roles recuperada exitosamente.
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
 *                       IDRol:
 *                         type: integer
 *                         description: ID del rol.
 *                         example: 9
 *                       NombreRol:
 *                         type: string
 *                         description: Nombre del rol.
 *                         example: "Administrador"
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

router.post('/getlistaRolusuarios', UsuariosController.get_listaRolusuarios);
/**
 * @swagger
 * /usuarios/getlistaRolTrafico:
 *   post:
 *     summary: Obtiene la lista de roles de tráfico.
 *     description: Recupera la lista de roles de tráfico asociados a un proyecto específico.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proyecto:
 *                 type: integer
 *                 description: ID del proyecto para filtrar los roles de tráfico.
 *                 example: 9
 *     responses:
 *       200:
 *         description: Lista de roles de tráfico recuperada exitosamente.
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
 *                       id_roltrafico:
 *                         type: integer
 *                         description: ID del rol de tráfico.
 *                         example: 5
 *                       descr_roltrafico:
 *                         type: string
 *                         description: Descripción del rol de tráfico.
 *                         example: "Coordinador de Tráfico"
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

router.post('/getlistaRolTrafico', UsuariosController.get_listaRolTrafico);
/**
 * @swagger
 * /usuarios/getlistaIps:
 *   post:
 *     summary: Obtiene la lista de direcciones IP por proyecto.
 *     description: Recupera la lista de direcciones IP asociadas a un proyecto específico.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proyecto:
 *                 type: integer
 *                 description: ID del proyecto para filtrar las direcciones IP.
 *                 example: 9
 *     responses:
 *       200:
 *         description: Lista de direcciones IP recuperada exitosamente.
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
 *                       id_direccion:
 *                         type: integer
 *                         description: ID de la dirección IP.
 *                         example: 5
 *                       Nombre_direccion:
 *                         type: string
 *                         description: Nombre de la dirección IP.
 *                         example: "Direccion IP Central"
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

router.post('/getlistaIps', UsuariosController.get_listaIps);
/**
 * @swagger
 * /usuarios/crearip:
 *   post:
 *     summary: Crea una nueva dirección IP.
 *     description: Permite crear una nueva dirección IP asociada a un proyecto específico.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la dirección IP.
 *                 example: "Dirección IP Principal"
 *               proyecto:
 *                 type: integer
 *                 description: ID del proyecto asociado a la IP.
 *                 example: 9
 *               ip:
 *                 type: string
 *                 description: Dirección IP.
 *                 example: "192.168.0.1"
 *     responses:
 *       200:
 *         description: Dirección IP creada exitosamente.
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
 *                   description: Resultado de la consulta de inserción.
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

router.post('/crearip', UsuariosController.crear_ip);
/**
 * @swagger
 * /usuarios/getobtenerusuario:
 *   post:
 *     summary: Obtiene la información detallada de un usuario por su nombre de usuario.
 *     description: Devuelve los detalles del usuario, incluyendo su rol, empresa, proyecto, y otros permisos relacionados.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario o ID de usuario.
 *                 example: "usuario123"
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente.
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
 *                       IdUser:
 *                         type: string
 *                         description: ID del usuario.
 *                         example: "usuario123"
 *                       Inventario:
 *                         type: boolean
 *                         description: Permiso de inventario.
 *                         example: true
 *                       Geocerca:
 *                         type: boolean
 *                         description: Permiso de geocerca.
 *                         example: false
 *                       CreacionRutas:
 *                         type: boolean
 *                         description: Permiso para creación de rutas.
 *                         example: true
 *                       Trafico:
 *                         type: boolean
 *                         description: Permiso de tráfico.
 *                         example: false
 *                       ModificarDisp:
 *                         type: boolean
 *                         description: Permiso para modificar dispositivos.
 *                         example: true
 *                       ipfija:
 *                         type: boolean
 *                         description: Indica si tiene IP fija.
 *                         example: true
 *                       NombreEmpresa:
 *                         type: string
 *                         description: Nombre de la empresa.
 *                         example: "Empresa ABC"
 *                       Descripcion:
 *                         type: string
 *                         description: Descripción del proyecto.
 *                         example: "Proyecto XYZ"
 *                       NombreRol:
 *                         type: string
 *                         description: Nombre del rol del usuario.
 *                         example: "Administrador"
 *                       comando:
 *                         type: string
 *                         description: Comando asociado al usuario.
 *                         example: "admin_command"
 *                       direccion_ip:
 *                         type: string
 *                         description: Dirección IP fija asociada al usuario.
 *                         example: "192.168.1.1"
 *                       Nombre_direccion:
 *                         type: string
 *                         description: Nombre de la dirección IP.
 *                         example: "Dirección IP Principal"
 *                       CorreoUsers:
 *                         type: string
 *                         description: Correo electrónico del usuario.
 *                         example: "usuario@correo.com"
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

router.post('/getobtenerusuario', UsuariosController.get_obtenerusuario);
/**
 * @swagger
 * /usuarios/inhabilitarusuario:
 *   post:
 *     summary: Inhabilita un usuario desactivando su cuenta.
 *     description: Cambia la contraseña del usuario a '-' y establece el estado de la cuenta como inactivo.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario a inhabilitar.
 *                 example: "usuario123"
 *     responses:
 *       200:
 *         description: Usuario inhabilitado exitosamente.
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
 *                   description: Resultado de la operación de actualización.
 *                   items:
 *                     type: object
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

router.post('/inhabilitarusuario', UsuariosController.inhabilitar_usuario);
/**
 * @swagger
 * /usuarios/insertusuario:
 *   post:
 *     summary: Inserta un nuevo usuario en el sistema.
 *     description: Crea un nuevo registro de usuario con la información proporcionada.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdUser:
 *                 type: string
 *                 description: Identificador único del usuario.
 *                 example: "user123"
 *               Pwd:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: "password123"
 *               FKICEmpresa:
 *                 type: string
 *                 description: ID de la empresa asociada al usuario.
 *                 example: "empresa001"
 *               tipouser:
 *                 type: integer
 *                 description: Tipo de usuario (rol).
 *                 example: 1
 *               FKProyecto:
 *                 type: string
 *                 description: ID del proyecto al que pertenece el usuario.
 *                 example: "proyecto001"
 *               Inventario:
 *                 type: boolean
 *                 description: Indica si el usuario tiene acceso a inventario.
 *                 example: true
 *               Geocerca:
 *                 type: boolean
 *                 description: Indica si el usuario tiene acceso a geocerca.
 *                 example: true
 *               CreacionRutas:
 *                 type: boolean
 *                 description: Indica si el usuario puede crear rutas.
 *                 example: true
 *               Trafico:
 *                 type: boolean
 *                 description: Indica si el usuario tiene acceso a tráfico.
 *                 example: true
 *               ipfija:
 *                 type: string
 *                 description: Dirección IP fija del usuario.
 *                 example: "192.168.1.1"
 *               RolTrafico:
 *                 type: string
 *                 description: Rol de tráfico del usuario.
 *                 example: "Rol1"
 *               comando:
 *                 type: string
 *                 description: Comando asociado al usuario.
 *                 example: "Comando1"
 *               NombreCompleto:
 *                 type: string
 *                 description: Nombre completo del usuario.
 *                 example: "Juan Pérez"
 *               FKIp:
 *                 type: string
 *                 description: ID de la dirección IP asociada al usuario.
 *                 example: "direccionIp001"
 *               CorreoUsers:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: "juan.perez@example.com"
 *               EmpresaInventario:
 *                 type: string
 *                 description: Nombre de la empresa asociada al inventario.
 *                 example: "Empresa XYZ"
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente.
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
 *                   description: Resultado de la operación de inserción.
 *                   items:
 *                     type: object
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

router.post('/insertusuario', UsuariosController.insert_usuario);
/**
 * @swagger
 * /usuarios/updateusuario:
 *   post:
 *     summary: Actualiza los datos de un usuario en el sistema.
 *     description: Modifica los datos de un usuario existente en función de la información proporcionada.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdUser:
 *                 type: string
 *                 description: Identificador único del usuario.
 *                 example: "user123"
 *               FKICEmpresa:
 *                 type: string
 *                 description: ID de la empresa asociada al usuario.
 *                 example: "empresa001"
 *               tipouser:
 *                 type: integer
 *                 description: Tipo de usuario (rol).
 *                 example: 1
 *               FKProyecto:
 *                 type: string
 *                 description: ID del proyecto al que pertenece el usuario.
 *                 example: "proyecto001"
 *               Pwd:
 *                 type: string
 *                 description: Contraseña del usuario. Se actualizará si el campo "cambiar" es verdadero.
 *                 example: "newpassword123"
 *               Inventario:
 *                 type: boolean
 *                 description: Indica si el usuario tiene acceso a inventario.
 *                 example: true
 *               Geocerca:
 *                 type: boolean
 *                 description: Indica si el usuario tiene acceso a geocerca.
 *                 example: true
 *               CreacionRutas:
 *                 type: boolean
 *                 description: Indica si el usuario puede crear rutas.
 *                 example: true
 *               Trafico:
 *                 type: boolean
 *                 description: Indica si el usuario tiene acceso a tráfico.
 *                 example: true
 *               ipfija:
 *                 type: string
 *                 description: Dirección IP fija del usuario.
 *                 example: "192.168.1.1"
 *               RolTrafico:
 *                 type: string
 *                 description: Rol de tráfico del usuario.
 *                 example: "Rol1"
 *               comando:
 *                 type: string
 *                 description: Comando asociado al usuario.
 *                 example: "Comando1"
 *               NombreCompleto:
 *                 type: string
 *                 description: Nombre completo del usuario.
 *                 example: "Juan Pérez"
 *               FKIp:
 *                 type: string
 *                 description: ID de la dirección IP asociada al usuario.
 *                 example: "direccionIp001"
 *               CorreoUsers:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: "juan.perez@example.com"
 *               EmpresaInventario:
 *                 type: string
 *                 description: Nombre de la empresa asociada al inventario.
 *                 example: "Empresa XYZ"
 *               cambiar:
 *                 type: boolean
 *                 description: Indica si se debe actualizar la contraseña del usuario.
 *                 example: true
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
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
 *                   description: Resultado de la operación de actualización.
 *                   items:
 *                     type: object
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

router.post('/updateusuario', UsuariosController.update_usuario);
/**
 * @swagger
 * /usuarios/updateusuariopass:
 *   post:
 *     summary: Actualiza la contraseña del usuario autenticado.
 *     description: Permite que un usuario autenticado actualice su contraseña.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Pwd:
 *                 type: string
 *                 description: Nueva contraseña del usuario.
 *                 example: "newSecurePassword123"
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente.
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
 *                   description: Resultado de la operación de actualización.
 *                   items:
 *                     type: object
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

router.post('/updateusuariopass', UsuariosController.update_usuariopass);
/**
 * @swagger
 * /usuarios/getconfiguracionpagina:
 *   post:
 *     summary: Obtiene la configuración de permisos de una página según el rol del usuario.
 *     description: Retorna los permisos de acceso a una página (abrir, crear, editar, eliminar) para un usuario autenticado basado en su rol.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pagina:
 *                 type: integer
 *                 description: ID de la página para la que se quieren obtener los permisos.
 *                 example: 5
 *     responses:
 *       200:
 *         description: Configuración de permisos de la página obtenida exitosamente.
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
 *                       bitAbrir:
 *                         type: boolean
 *                         description: Permiso para abrir la página.
 *                         example: true
 *                       bitCrear:
 *                         type: boolean
 *                         description: Permiso para crear en la página.
 *                         example: false
 *                       bitEditar:
 *                         type: boolean
 *                         description: Permiso para editar en la página.
 *                         example: true
 *                       bitEliminar:
 *                         type: boolean
 *                         description: Permiso para eliminar en la página.
 *                         example: false
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
router.post('/getconfiguracionpagina', UsuariosController.get_configuracionPagina);

module.exports = router;
