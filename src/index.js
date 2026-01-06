var express = require('express');
const multer  = require('multer');
const path = require('path');
var mssql = require("mssql");
var cors = require('cors');
const jwt = require('jsonwebtoken');
var app = express();
var crypto = require('crypto');
var hash = crypto.createHash('sha1');
const Configuracion = require("./config");
var sqlconfig = require("./model/dbpool");
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const axios = require('axios');
const XlsxPopulate = require('xlsx-populate');
const bodyParser = require('body-parser');
const net = require('net');
const fs = require('fs');
const { Readable } = require('stream');
const {swaggerDocs} = require('./swagger');
const { GoogleAuth } = require('google-auth-library');
const WebSocket = require('ws');
const PORT = Configuracion.PUERTO;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: {fileSize: 100 * 1024 * 1024} });

const auth = new GoogleAuth({
  keyFile: 'valitronicskt-firebase-adminsdk-fbsvc-3d3889fb2b.json',
  scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
});

const PROJECT_ID = '614539482642';

app.use(express.json({ limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'secret_key', (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({ success: false, message: 'No token provided' });
  }
};

const verifyTokenApi = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'secret_api', (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({ success: false, message: 'No token provided' });
  }
};

const allowedOrigins = [
  'https://infocarga-frontend-jwt-theta.vercel.app',
  'https://infocarga-frontend-jwt-fkp2.vercel.app',
  'http://localhost:3000',
  'https://cargotronics.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; frame-ancestors 'self' https://lookerstudio.google.com;");
  res.setHeader('X-Frame-Options', 'ALLOW-FROM https://lookerstudio.google.com');
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin); // Permitir cualquier origen
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/*app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Define aquí las IPs que permites (pueden ser públicas o internas)
  const whitelistIps = ['64.29.17.193', '216.198.79.1', '216.198.79.65', '216.198.79.129', '216.198.79.193', '201.216.13.106']; // reemplaza por IPs reales de Vercel o tus servidores

  // Opcional: Mostrar IP para debug
  console.log('IP solicitante:', ip);

  // Si la IP no está permitida, bloquea
  if (!whitelistIps.includes(ip)) {
    console.warn('Bloqueado acceso desde IP no autorizada:', ip);
    return res.status(403).json({ success: false, message: 'IP no autorizada' });
  }

  next(); // Permitir si está en whitelist
});*/



const contratosRouters = require('./routes/ContratosRoute');
const maestrosRouters = require('./routes/MaestrosRoute');
const solicitudesRouters = require('./routes/SolicitudesRoute');
const operacionesRouters = require('./routes/OperacionesRoute');
const operacionesRouters2 = require('./routes/OperacionesRoute2');
const empresasRouters = require('./routes/EmpresasRoute');
const dianRouters = require('./routes/DianRoute');
const usuariosRouters = require('./routes/UsuariosRoute');
const apiRouters = require('./routes/ApiRoute');
app.use('/contratos', contratosRouters);
app.use('/maestros', maestrosRouters);
app.use('/solicitudes', solicitudesRouters);
app.use('/operaciones', operacionesRouters);
app.use('/operaciones2', operacionesRouters2);
app.use('/empresas', empresasRouters);
app.use('/dian', dianRouters);
app.use('/usuarios', usuariosRouters);
app.use('/api', apiRouters);

app.post('/enviarnotificacion', async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ success: false, message: 'Token is missing' });
    }

    const token = authorization.split(' ')[1];
    jwt.verify(token, 'secret_key', async (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Invalid token' });
      }

      const client = await auth.getClient();
      const accessToken = await client.getAccessToken();

      const mensaje = req.body; // debe incluir el body FCM válido

      const response = await axios.post(
        `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`,
        mensaje,
        {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      res.json({ success: true, message: 'Enviado correctamente', fcmResponse: response.data });
    });
  } catch (error) {
    console.error('Error al enviar notificación:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.response?.data || error.message });
  }
});


app.post('/editar-excel', async (req, res) => {
  try {
    let datos=req.body;
    // Leer el archivo de Excel localmente utilizando el módulo fs
    const filePath = './plantilla1.xlsx';
    const fileData = await fs.promises.readFile(filePath);

    // Cargar el archivo de Excel con XlsxPopulate
    const workbook = await XlsxPopulate.fromDataAsync(fileData);

    // Editar el archivo de Excel
    const sheet = workbook.sheet('Hoja1');

    const generadopor = sheet.cell('F2');
    generadopor.value(req.session.username);
    const generadoen = sheet.cell('F3');
    const now = new Date();
    generadoen.value(`${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);

    let startCell = sheet.cell('A6');
    datos.forEach((objeto, indice) => {
      // Obtener la fila correspondiente a este objeto (por ejemplo, A3+indice)
      const row = startCell.row(indice);
      row.cell(1).value(objeto.ContractID);
      row.cell(2).value(objeto.FKLokDeviceID);
      row.cell(3).value(objeto.NombreEmpresa);
      row.cell(4).value(objeto.PlacaTruck);
      row.cell(5).value(objeto.DescripcionRuta);
      row.cell(6).value(objeto.NombreTranspo);
      row.cell(7).value(objeto.fechainicio);
      startCell = startCell.relativeCell(1, 0);

    });

    // Convertir el archivo de Excel editado en un ArrayBuffer y enviarlo al cliente
    const editedData = await workbook.outputAsync({ type: 'arraybuffer' });
    res.send(Buffer.from(editedData));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al editar el archivo de Excel.');
  }
});

// FUNCION PARA LOGUEARSE EN EL SISTEMA
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Este endpoint permite a un usuario iniciar sesión.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: Nombre de usuario.
 *               pass:
 *                 type: string
 *                 description: Contraseña del usuario.
 *             example:
 *               user: usuario123
 *               pass: password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Se devuelve un token de acceso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si el inicio de sesión fue exitoso.
 *                 entorno:
 *                   type: string
 *                   description: Entorno del servidor de base de datos.
 *                 token:
 *                   type: string
 *                   description: Token de acceso JWT.
 *       401:
 *         description: Credenciales inválidas. El inicio de sesión ha fallado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si el inicio de sesión ha fallado debido a credenciales inválidas.
 */
/*app.post('/login', async (req, res) =>{
    try{
        let user=req.body.user;
        let pass=req.body.pass;
        var consulta= "SELECT u.Pwd, u.Salt, u.FKProyecto, p.DiferenciaServidor, p.DiferenciaHorariaM, "+
        "u.RolTrafico, u.Trafico, ISNULL(p.ProyectoPrincipal, 1) as ownr, ISNULL(p.varidcliente, 2) as varidcliente, "+
        "e.IdEmpresa, ISNULL(clientede, 0) as clientede, p.TimeReload, u.tipoUser, r.Jerarquia, u.EmpresasTrafico FROM ICUsers as u "+
        "INNER JOIN ICEmpresa as e on e.IdEmpresa = u.FKICEmpresa "+
        "INNER JOIN LokProyectos as p on p.IDProyecto = u.FKProyecto "+
        "INNER JOIN LokRoles as r on r.IDRol = u.tipoUser "+
        "WHERE u.IdUser='"+user+"' and u.Activo=1";
        let resultado=await sqlconfig.query(consulta);
        if(resultado.recordset.length > 0){
            const hashresult = crypto.createHash('sha256')
            .update(pass+'|'+resultado.recordset[0].Salt)
            .digest('hex');

            if(hashresult == resultado.recordset[0].Pwd){
                var tokenPayload = {
                    username: user,
                    proyecto: resultado.recordset[0].FKProyecto,
                    diffhorario: resultado.recordset[0].DiferenciaServidor,
                    diffUTC: resultado.recordset[0].DiferenciaHorariaM,
                    roltrafico: resultado.recordset[0].RolTrafico,
                    trafico: resultado.recordset[0].Trafico,
                    owner: resultado.recordset[0].ownr,
                    empresaprincipal: resultado.recordset[0].varidcliente,
                    idempresa: resultado.recordset[0].IdEmpresa,
                    idcliente: resultado.recordset[0].clientede,
                    tipouser: resultado.recordset[0].tipoUser,
                    jerarquia: resultado.recordset[0].Jerarquia,
                    empresastrafico: resultado.recordset[0].EmpresasTrafico,
                    server: sqlconfig.server
                };
                const token = jwt.sign(tokenPayload, 'secret_key', { expiresIn: '1h' });
                res.json({success : true, entorno: sqlconfig.server, timereload:resultado.recordset[0].TimeReload, proyecto:resultado.recordset[0].FKProyecto, token, empresa: resultado.recordset[0].IdEmpresa});
            }else{
                res.json({success : false});
            }
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }
});*/

app.post('/login', async (req, res) => {
    try {
        const userAgent = req.headers['user-agent'] || '';

        // Detecta automatización (headless browsers, Selenium, scripts Python, etc.)
        const patronesBot = /headless|selenium|phantomjs|python|webdriver|curl|node-fetch/i;

        if (patronesBot.test(userAgent) || userAgent.length < 10) {
            return res.status(403).json({
                success: false,
                message: 'Automatización detectada. Acceso denegado.'
            });
        }

        let user = req.body.user;
        let pass = req.body.pass;

        var consulta = "SELECT u.Pwd, u.Salt, u.FKProyecto, p.DiferenciaServidor, p.DiferenciaHorariaM, " +
            "u.RolTrafico, u.Trafico, ISNULL(p.ProyectoPrincipal, 1) as ownr, ISNULL(p.varidcliente, 2) as varidcliente, " +
            "e.IdEmpresa, ISNULL(clientede, 0) as clientede, p.TimeReload, u.tipoUser, r.Jerarquia, u.EmpresasTrafico, u.TiempoSesionH, p.logo FROM ICUsers as u " +
            "INNER JOIN ICEmpresa as e on e.IdEmpresa = u.FKICEmpresa " +
            "INNER JOIN LokProyectos as p on p.IDProyecto = u.FKProyecto " +
            "INNER JOIN LokRoles as r on r.IDRol = u.tipoUser " +
            "WHERE u.IdUser='" + user + "' and u.Activo=1";

        let resultado = await sqlconfig.query(consulta);

        if (resultado.recordset.length > 0) {
            const hashresult = crypto.createHash('sha256')
                .update(pass + '|' + resultado.recordset[0].Salt)
                .digest('hex');

            if (hashresult == resultado.recordset[0].Pwd) {
                var tokenPayload = {
                    username: user,
                    proyecto: resultado.recordset[0].FKProyecto,
                    diffhorario: resultado.recordset[0].DiferenciaServidor,
                    diffUTC: resultado.recordset[0].DiferenciaHorariaM,
                    roltrafico: resultado.recordset[0].RolTrafico,
                    trafico: resultado.recordset[0].Trafico,
                    owner: resultado.recordset[0].ownr,
                    empresaprincipal: resultado.recordset[0].varidcliente,
                    idempresa: resultado.recordset[0].IdEmpresa,
                    idcliente: resultado.recordset[0].clientede,
                    tipouser: resultado.recordset[0].tipoUser,
                    jerarquia: resultado.recordset[0].Jerarquia,
                    empresastrafico: resultado.recordset[0].EmpresasTrafico,
                    server: sqlconfig.server,
                    tiempo: resultado.recordset[0].TiempoSesionH,
                };
                var time= resultado.recordset[0].TiempoSesionH+"h";
                const token = jwt.sign(tokenPayload, 'secret_key', { expiresIn: time });
                res.json({
                    success: true,
                    entorno: sqlconfig.server,
                    timereload: resultado.recordset[0].TimeReload,
                    proyecto: resultado.recordset[0].FKProyecto,
                    token,
                    empresa: resultado.recordset[0].IdEmpresa,
                    TiempoSesionH: resultado.recordset[0].TiempoSesionH,
                    logo: resultado.recordset[0].logo
                });
            } else {
                res.json({ success: false, message: 'Password Incorrecto' });
            }
        } else {
            res.json({ success: false, message: 'No existe el usuario' });
        }
    } catch (err) {
        console.error('Error en /login:', err);
        res.json({ success: false, message: err.message || String(err) });
    }
});

app.post('/loginapi', async (req, res) => {
    try {
        const userAgent = req.headers['user-agent'] || '';

        // Detecta automatización (headless browsers, Selenium, scripts Python, etc.)
        const patronesBot = /headless|selenium|phantomjs|python|webdriver|curl|node-fetch/i;

        if (patronesBot.test(userAgent) || userAgent.length < 10) {
            return res.status(403).json({
                success: false,
                message: 'Automatización detectada. Acceso denegado.'
            });
        }

        let user = req.body.user;
        let pass = req.body.pass;

        var consulta = "SELECT UserExt, PwdExt, FkProyecto, FkEmpresa, SessionTimeH FROM CtExtenalUsers where UserExt='"+user+"' and PwdExt='"+pass+"' AND ActiveUser=1";
        console.log(consulta);
        let resultado = await sqlconfig.query(consulta);
        console.log(resultado.recordset[0]);
        let proy = resultado.recordset[0].FkProyecto;
        console.log(proy);
        if (resultado.recordset.length > 0) {
            var tokenPayload = {
                username: user,
                proyecto: resultado.recordset[0].FkProyecto,
                idempresa: resultado.recordset[0].FkEmpresa,
                tiempo: resultado.recordset[0].SessionTimeH,
            };
            var time= resultado.recordset[0].SessionTimeH+"h";
            const token = jwt.sign(tokenPayload, 'secret_api', { expiresIn: time });
            res.json({
                success: true,
                token,
                TiempoSesionH: resultado.recordset[0].TiempoSesionH
            });
        } else {
            res.json({ success: false, message: 'No existe el usuario' });
        }
    } catch (err) {
        console.error('Error en /login:', err);
        res.json({ success: false, message: err.message || String(err) });
    }
});


app.post('/falabella', async (req, res) =>{
    try{
        let contenedor=req.body.contenedor;
        let token=req.body.token;
        if(token == "7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ"){
            var consulta= "SELECT c.LastReportUbica as Ubicacion, r.TipoReporte as Estado, c.ContainerNum as Contenedor FROM LokContractID as c " +
  					"INNER JOIN ICTipoReporte AS r on r.IdTipoReporte = c.LastICTipoReporte WHERE " +
  					"c.Active=1 AND c.FKICEmpresa=243 AND c.ContainerNum='"+contenedor+"'";
            let resultado=await sqlconfig.query(consulta);
            res.json({success : true, data : resultado.recordsets[0]});
        }else{
            res.json({success : false, msg : "El token es incorrecto."});
        }

    }catch(err){
        res.json({success : false});
    }
});

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Cerrar sesión
 *     description: Este endpoint permite a un usuario cerrar sesión.
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si el cierre de sesión fue exitoso.
 *                   example: true
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si el usuario no está autorizado para cerrar sesión.
 *                   example: false
 */

// FUNCION PARA DESLOGUEARSE DEL SISTEMA
app.get('/logout', async (req, res) =>{
    res.json({success : true});
});

/**
 * @swagger
 * /actualizartoken:
 *   get:
 *     summary: Actualizar token de sesión
 *     description: Este endpoint permite actualizar un token de sesión válido.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token de autorización JWT
 *         required: true
 *         type: string
 *         format: token
 *     responses:
 *       200:
 *         description: Token actualizado correctamente
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             nuevotoken:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicHJvamVjdCI6MSwiZGlmZmhvcmFyaW8iOjIwLCJkaWZmVVBDIjoxMjEsImRpZmZVVENCIjoxMjIsInJvbHRyYWZyaWNhIjowLCJ0cmFmaWNvIjowLCJ0cmFmaWNvSWQiOjIsInNlcnZlciI6Im5ldyJ9.uDc4N7Jf6gfsOd7kx6PXr5hV_7FhMvYK7eE6a0ru6Wo"
 *       400:
 *         description: Token is missing o Token inválido
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: Token is missing
 *       500:
 *         description: Error interno del servidor
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 */
//METODO PARA ACTUALIZAR TOKEN JWT
app.get('/actualizartoken', async (req, res) => {
    try {
        var token = req.headers.authorization;
        if (!token) {
          	return res.json({ success: false, message: 'Token is missing' });
      	}else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    // Si hay un error en la verificación del token, devolvemos un mensaje de error
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    // Si el token es válido, podemos continuar con la lógica de la función
                    const tokenPayload = {
                        username: decoded.username,
                        proyecto: decoded.proyecto,
                        diffhorario: decoded.diffhorario,
                        diffUTC: decoded.diffUTC,
                        roltrafico: decoded.roltrafico,
                        trafico: decoded.trafico,
                        owner: decoded.owner,
                        empresaprincipal: decoded.empresaprincipal,
                        idempresa: decoded.idempresa,
                        idcliente: decoded.idcliente,
                        tipouser: decoded.tipouser,
                        jerarquia: decoded.jerarquia,
                        empresastrafico: decoded.empresastrafico,
                        server: decoded.server,
                        tiempo: decoded.tiempo
                    };
                    var time = decoded.tiempo+"h";
                    const nuevotoken = jwt.sign(tokenPayload, 'secret_key', { expiresIn: time });
                    res.json({success : true, nuevotoken});
                }
            });

        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false });
    }
});

app.get('/confirmartoken', async (req, res) => {
    try {
        var token = req.headers.authorization;
        if (!token) {
          	return res.json({ success: false, message: 'Token is missing' });
      	}else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    // Si hay un error en la verificación del token, devolvemos un mensaje de error
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    // Si el token es válido, podemos continuar con la lógica de la función
                    res.json({ success: true, message: 'success authenticate token' });
                }
            });

        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false });
    }
});

/**
 * @swagger
 * /token:
 *   get:
 *     summary: Obtener token de acceso
 *     description: Este endpoint permite obtener un token de acceso utilizando el flujo de contraseña (Password Grant) de OAuth 2.0.
 *     responses:
 *       200:
 *         description: Token de acceso obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la obtención del token de acceso fue exitosa.
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: Token de acceso obtenido.
 *       400:
 *         description: Token faltante o inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si el token está faltante o es inválido.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallando la causa.
 *                   example: Token is missing
 *       401:
 *         description: Falló la autenticación del token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la autenticación del token ha fallado.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallando la causa.
 *                   example: Failed to authenticate token
 */

//METODO PARA OBTENER EL TOKEN DE AZURE PARA POWERBI
/*app.get('/token', async (req, res) => {
    try {
        var token = req.headers.authorization;
        if (!token) {
          	return res.json({ success: false, message: 'Token is missing' });
      	}else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    // Si hay un error en la verificación del token, devolvemos un mensaje de error
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    // Si el token es válido, podemos continuar con la lógica de la función
                    const tokenEndpoint = 'https://login.microsoftonline.com/common/oauth2/token';
                    const clientId = 'fe98af75-7d45-44bd-ae62-1215d42b63bf';
                    const clientSecret = 'ngg8Q~NK.49AhELDdXmaj04e6cj_p2cUPQJqqcXr';
                    const resource = 'https://analysis.windows.net/powerbi/api';

                    const requestData = {
                        grant_type: 'Password',
                        username: 'juan.berrio@logiseguridad.com',
                        password:'Peluche.123',
                        resource,
                        client_id: clientId,
                        client_secret: clientSecret,
                        scope: 'Dataset.Read.All',
                    };

                    const response = await axios.post(tokenEndpoint, requestData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    });

                    res.json({ success: true, token: response.data.access_token });
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false });
    }
});*/

// https://lookerstudio.google.com/embed/reporting/7c77d324-03ea-4f3c-8081-d8c805cf5bdd/page/Pq0aE


app.get('/reportLooker', async (req, res) => {
    try {
        var token = req.headers.authorization;
        if (!token) {
          	return res.json({ success: false, message: 'Token is missing' });
      	}else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    // Si hay un error en la verificación del token, devolvemos un mensaje de error
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    // Si el token es válido, podemos continuar con la lógica de la función
                    const iframeHTML = `<iframe src="/proxy-reporte?token=${token}" width="100%" height="800px"></iframe>`;

                    res.json({ success: true, data: iframeHTML });
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false });
    }
});

app.get('/proxy-reporte', async (req, res) => {
    try {
        var token = `Bearer ${req.query.token}`;
        var reporte = req.query.reporte;
        var txtfiltro = req.query.filtro;
        console.log(txtfiltro);
        if (!token) {
          	return res.json({ success: false, message: 'Token is missing' });
      	}else{
            token = req.query.token;
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    // Si hay un error en la verificación del token, devolvemos un mensaje de error
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    // Si el token es válido, podemos continuar con la lógica de la función
                    var filtro = encodeURIComponent(txtfiltro);
                    var url = `https://lookerstudio.google.com/embed/reporting/${reporte}?params=${filtro}`;
                    console.log(url);
                    res.redirect(url);
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false });
    }
});

app.get('/token', async (req, res) => {
    try {
        var token = req.headers.authorization;
        if (!token) {
          	return res.json({ success: false, message: 'Token is missing' });
      	}else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    // Si hay un error en la verificación del token, devolvemos un mensaje de error
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    // Si el token es válido, podemos continuar con la lógica de la función
                    const tokenEndpoint = 'https://login.microsoftonline.com/ac2b1bbb-747e-4208-918a-3fb2f83ceaa0/oauth2/v2.0/token';
                    const clientId = 'e8e44489-91c0-47ab-bc9f-365bade9e1ff';
                    const clientSecret = '5Il8Q~fJNxM-YvWoxoDgfuN_v.qSF4dOtk5a-a5V';

                    const requestData = {
                        grant_type: 'client_credentials',
                        client_id: clientId,
                        client_secret: clientSecret,
                        scope: 'https://analysis.windows.net/powerbi/api/.default',
                    };

                    const response = await axios.post(tokenEndpoint, requestData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    });

                    res.json({ success: true, token: response.data.access_token });
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false });
    }
});


// FUNCION PARA SUBIR FOTOS AL SERVIDOR DE TRAKAPHOTO
app.post('/upload2', upload.array('files'), (req, res) => {
  const files = req.files;
  let enviados = 0;
  let responseSent = false;

  const client = net.createConnection({ port: 233, host: '157.230.222.224' }, () => {
    files.forEach((file) => {
      const message = file.originalname;
      const messageBuffer = Buffer.from(message, 'utf8');
      const messageLength = messageBuffer.length;
      const buffer = Buffer.alloc(2 + messageLength);
      buffer.writeUInt16BE(messageLength, 0);
      messageBuffer.copy(buffer, 2);

      client.write(buffer);

      const readStream = Readable.from(file.buffer);
      readStream.pipe(client);
    });
  });

  client.on('data', (data) => {
    //console.log(`Received data from server: ${data.toString('utf8')}`);
    enviados++;
    if (enviados === files.length && !responseSent) {
      res.json({ success: true });
      responseSent = true;
    }
    client.end();
  });

  client.on('end', () => {
    console.log('Disconnected from server');
  });

  client.on('error', (err) => {
    console.error('Error connecting to server:', err);
    res.status(500).json({ success: false, error: 'Error connecting to server' });
  });
});

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Subir archivos
 *     description: Este endpoint permite subir archivos al servidor.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Archivos subidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la subida de archivos fue exitosa.
 *                   example: true
 *       500:
 *         description: Error en la subida de archivos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si ocurrió un error en la subida de archivos.
 *                   example: false
 *                 error:
 *                   type: string
 *                   description: Descripción del error ocurrido.
 */

app.post('/upload', upload.array('files'), async (req, res) => {
  let responseSent = false;
  try {
    const files = req.files;
    //console.log(files);
    var enviados = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      //console.log(file.buffer);
      //console.log(file.mimetype);
      try {
        if (file.mimetype.startsWith('image/')) {
          // Process image file using sharp
          const metadata = await sharp(file.buffer).metadata();
          //console.log(metadata);

          const dataFoto = await sharp(file.buffer)
            .resize({ width: 800, height: 600, fit: sharp.fit.inside, withoutEnlargement: true })
            .jpeg({ quality: 80 })
            .toBuffer();

          const client = net.createConnection({ port: 232, host: '157.230.222.224' }, () => {
            const message = file.originalname;
            const messageBuffer = Buffer.from(message, 'utf8');
            const messageLength = messageBuffer.length;
            const buffer = Buffer.alloc(2 + messageLength);
            buffer.writeUInt16BE(messageLength, 0);
            messageBuffer.copy(buffer, 2);
            client.write(buffer);
            const readStream = Readable.from(dataFoto);
            readStream.pipe(client);
          });

          client.on('data', (data) => {
            //console.log(`Received data from server: ${data.toString('utf8')}`);
            enviados++;
            if (enviados == files.length) {
              res.json({ success: true });
              responseSent = true;
            }
            client.end();
          });

          client.on('end', () => {
            console.log('Disconnected from server');
          });

          // Add an error handler for the client
          client.on('error', (err) => {
              console.error('Error in client:', err);
              if (!responseSent) {
                  res.status(500).json({ success: false, error: 'An error occurred during file processing' });
                  responseSent = true;  // Set the flag to true to indicate response has been sent
              }
          });
        }

      } catch (err) {
          console.error('Error processing file:', err);
          if (!responseSent) {
            res.status(500).json({ success: false, error: 'An error occurred during file processing' });
            responseSent = true;  // Set the flag to true to indicate response has been sent
          }
      }
    }
  } catch (err) {
      console.error('Error in try-catch block:', err);
      if (!responseSent) {
        res.status(500).json({ success: false, error: 'An error occurred' });
        responseSent = true;  // Set the flag to true to indicate response has been sent
      }
  }
});

/**
 * @swagger
 * /uploadvideo:
 *   post:
 *     summary: Subir videos
 *     description: Este endpoint permite subir videos al servidor.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Videos subidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la subida de videos fue exitosa.
 *                   example: true
 *       500:
 *         description: Error en la subida de videos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si ocurrió un error en la subida de videos.
 *                   example: false
 *                 error:
 *                   type: string
 *                   description: Descripción del error ocurrido.
 */
app.post('/uploadvideo', upload.array('files'), async (req, res) => {
  let responseSent = false;
  try {
    const files = req.files;
    //console.log(files);
    var enviados = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      //console.log(file.buffer);
      //console.log(file.mimetype);
      try {
        if (file.mimetype.startsWith('video/')) {
          // Process video file
          const client = net.createConnection({ port: 233, host: '157.230.222.224' }, () => {
            files.forEach((file) => {
              const message = file.originalname;
              const messageBuffer = Buffer.from(message, 'utf8');
              const messageLength = messageBuffer.length;
              const buffer = Buffer.alloc(2 + messageLength);
              buffer.writeUInt16BE(messageLength, 0);
              messageBuffer.copy(buffer, 2);

              client.write(buffer);

              const readStream = Readable.from(file.buffer);
              readStream.pipe(client);
            });
          });

          client.on('data', (data) => {
            console.log(`Received data from server: ${data.toString('utf8')}`);
            enviados++;
            if (enviados === files.length && !responseSent) {
              res.json({ success: true });
              responseSent = true;
            }
            client.end();
          });

          client.on('end', () => {
            console.log('Disconnected from server');
          });

          client.on('error', (err) => {
            console.error('Error connecting to server:', err);
            res.status(500).json({ success: false, error: 'Error connecting to server' });
          });

          // Use outputBuffer for further processing or sending to the server
        }

      } catch (err) {
          console.error('Error processing file:', err);
          if (!responseSent) {
            res.status(500).json({ success: false, error: 'An error occurred during file processing' });
            responseSent = true;  // Set the flag to true to indicate response has been sent
          }
      }
    }
  } catch (err) {
      console.error('Error in try-catch block:', err);
      if (!responseSent) {
        res.status(500).json({ success: false, error: 'An error occurred' });
        responseSent = true;  // Set the flag to true to indicate response has been sent
      }
  }
});

const wss = new WebSocket.Server({ port: Configuracion.PORT_WS_SOLICITUDES });
const wss2 = new WebSocket.Server({ port: Configuracion.PORT_WS_TRAFICO });
const wss3 = new WebSocket.Server({ port: Configuracion.PORT_WS_NOTIFICACIONES });
//let lastSolicitudId = "2024-10-23 00:00:00"; // Variable para almacenar el último ID procesado
let clients = new Set(); // Array para almacenar los clientes conectados
let clientsTrafico = new Set();
let clientsNotificaciones = new Set();
// Función para realizar una consulta global sin el filtro de empresa
const getSolicitudesGlobal = async () => {
    var consulta = "SELECT IDSolicitudes, PlacaTruck, NombreInstalador, m.IdEmpresa, NombreEmpresa, CASE when FechaHoraCita < '2012-01-01 00:00:00.000'"
        + " THEN 'Hora-Nula Fecha-Nula' else CONVERT(nvarchar(30), FechaHoraCita, 120) end AS Hora, s.FKLokEstados , DescripcionRuta + '' + CASE WHEN n.FKLokClienteExt = 0 THEN '' ELSE '( ' + x.Descripcion + ' )' END AS Ruta, u.FKLokCiudadOrigen, "
        + " ContainerNum + CASE WHEN DigitoVerificacion IS NOT NULL THEN '-' + CAST(DigitoVerificacion AS nvarchar(2)) ELSE '' END AS Contenedor,Contacto, DATEDIFF(MINUTE, GETUTCDATE(), DATEADD(hh, 5, FechaHoraCita)) AS Tiempo, r.NotaReporte as nota, e.Descripcion as estado, HoraReporte as hora_e"
        + " FROM LokSolicitudes s INNER JOIN ICEmpresa m ON s.FKICEmpresa = m.IdEmpresa"
        + " INNER JOIN LokNegociacion n ON FKNegociacion = IDNegociacion"
        + " LEFT OUTER JOIN ICRutas u ON s.FKICRutas = u.IDRuta"
        + " LEFT JOIN LokClienteExt x ON x.IdClienteExterno = n.FKLokClienteExt"
        + " LEFT JOIN LokInstaladores i ON i.CCInstalador = s.FKInstaladorId"
        + " LEFT JOIN LokReporteSolicitudes r ON s.LastReport = r.idReporteSolicitud"
        + " LEFT JOIN LokEstados e ON r.FKLokEstados = e.IDEstados"
        + " WHERE (s.FKLokEstados = 2 OR s.FKLokEstados = 7)"
        + " ORDER BY FechaHoraCita";

    try {
        let resultado = await sqlconfig.query(consulta);
        console.log(resultado);
        return { success: true, data: resultado.recordsets[0] };
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        return { success: false, message: 'Error al ejecutar la consulta' };
    }
};

const getTraficoGlobal = async () => {
    var consulta = "SELECT c.ContractID, c.FKLokSolicitud, c.FKLokDeviceID, e.IdEmpresa, e.NombreEmpresa, c.PlacaTruck, '' as username, "+
    "CONVERT(varchar,DATEADD(MINUTE,0,c.FechaHoraInicio),20) as fecha, CONCAT(c.LastMsgLat,',',c.LastMsgLong) as pos, "+
    "ISNULL(c.FKTrayecto, 0) as trayecto, d.bitGPS, d.ContadorGps, r.DescripcionRuta, t.DescripcionTrayecto, c.NombreConductor, "+
    "CASE WHEN c.ContainerNum IS NULL OR c.ContainerNum = 'ND' THEN (LEFT(c.Documento, 35) + CASE WHEN LEN(c.Documento) > 35 THEN '...' ELSE '' END) ELSE c.ContainerNum END as ContainerNum, "+
    "c.Ref, tp.NombreTranspo, c.MovilConductor, c.PlacaTrailer, CONVERT(varchar,DATEADD(minute,0,c.FechaHoraInicio),20) as fechainicio, "+
    "ISNULL(CONVERT(varchar,DATEADD(minute,0,c.FechaHoraFin),20), CONVERT(varchar,DATEADD(minute,120,GETDATE()),20)) as fechafin, c.LastMsgLat, c.LastMsgLong, "+
    "d.Locked, c.Active, ISNULL(t.DistanciaReal,0) as DistanciaCompleta, t.Origen, d.FKLokTipoEquipo, "+
    "dbo.Tiempo(DATEDIFF(SECOND, LoksysServerTime, GETUTCDATE())) as Tiempo, DATEDIFF(SECOND, '1970-01-01 00:00:00', LoksysServerTime) as tiempoUnix, "+
    "dbo.iconbateria2(ISNULL(ROUND(BatteryVoltage, 2),3), d.FKLokTipoEquipo, c.FKLokDeviceID) as icon_bat, ROUND(BatteryVoltage, 2) as bateria, "+
    "c.LastReportNota, tr.TipoReporte, c.LastReportUbica+ ' ('+CONVERT(NVARCHAR(20), DATEDIFF(MINUTE, LastReportTime, DATEADD(MINUTE,120, GETDATE())))+' min)' as LastReportUbica, "+
    "d.Ciudad+': '+d.Location+ CASE WHEN ContadorGps <> 0 THEN ' ('+CONVERT(NVARCHAR(20), ContadorGps)+')' ELSE '' END as Ciudad, "+
    "DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()) + 120, LoksysServerTime) as LoksysServerTime, "+"SUBSTRING(iconos.IconMoving, 2, CHARINDEX('|', iconos.IconMoving) - 2) AS IconMoving, "+
    "ISNULL(geo.Nombre, 'ND') as geocerca, CASE WHEN ISNULL(d.DatetimeUltGeo, '2024-01-01 00:00:00') > c.FechaHoraInicio THEN 1 ELSE 0 END as mostrargeocerca, DATEDIFF(MINUTE, ISNULL(d.DatetimeUltGeo, '2024-01-01 00:00:00'), DATEADD(MINUTE,120, GETDATE())) as LastReportgeocerca, "+
    "SUBSTRING(iconos.IconLocked, 2, CHARINDEX('|', iconos.IconLocked) - 2) AS IconLocked, "+
    "SUBSTRING(iconos.IconDesvio, 2, CHARINDEX('|', iconos.IconDesvio) - 2) AS IconDesvio, "+
    "SUBSTRING(iconos.IconSeguro, 2, CHARINDEX('|', iconos.IconSeguro) - 2) AS IconSeguro, "+
    "SUBSTRING(iconos.IconBack, 2, CHARINDEX('|', iconos.IconBack) - 2) AS IconBack, "+
    "CAST(CASE WHEN c.Active=1 THEN 0 ELSE 1 END AS BIT) AS expanded, "+
    "CASE WHEN qr.Verificado_global=1 AND c.FKQrMaestro IS NOT NULL THEN '/images/valitronics.png' "+
    "WHEN qr.Verificado_global=0 AND c.FKQrMaestro IS NOT NULL THEN '/images/valitronics_gris.png' "+
    "ELSE '/images/transparent.png' END as IconValitronics, d.Speed, Convert(nvarchar(10),DATEDIFF(MINUTE, isnull(d.DateDetencion, DATEADD(hh,2,getdate())), DATEADD(hh,2,getdate()))) as tiempodetencion, c.FKLokProyecto, c.FKICEmpresa, "+
    "CASE WHEN c.FKLokProyecto = 1 THEN CASE WHEN d.FKLokTipoEquipo IN (SELECT IDTipoEquipo FROM LokTipoEquipo WHERE Critico = 1) AND e.bitCritico = 1 AND (bitAperturaRespo = 0 OR bitBackRespo = 0 OR bitAlejadoRespo = 0 OR bitDesvioRespo = 0 OR bitDetencionRespo = 0 "+
    "OR Locked = 0 OR Desautorizado = 1 OR ContadorGps > 3 OR dbo.TiemposDetencion(ContractID) = 1 OR DATEDIFF(SECOND, LoksysServerTime, GETUTCDATE()) > 960 OR ROUND(d.BatteryVoltage,2) <= 3.65) "+
    "THEN 1 ELSE 0 END ELSE CASE WHEN d.FKLokTipoEquipo IN (SELECT IDTipoEquipo FROM LokTipoEquipo WHERE Critico = 1) THEN 1 ELSE 0 END END AS EsCritico, corig.NombreCiudad as CiudadOrigen, cdest.NombreCiudad as CiudadDestino "+
    "FROM LokcontractID as c "+
    "INNER JOIN LokDeviceID as d ON d.DeviceID = c.FKLokDeviceID "+
    "LEFT JOIN ICEmpresa as e ON e.IdEmpresa = c.FKICEmpresa "+
    "LEFT JOIN ICRutas as r ON r.IdRuta = c.FKICRutas "+
    "LEFT JOIN Trayectos as t ON c.FKTrayecto =  t.IDTrayecto "+
    "LEFT JOIN ICTipoReporte as tr ON c.LastICTipoReporte =  tr.IdTipoReporte "+
    "LEFT JOIN ICTransportadora as tp ON tp.IdTransportadora = c.FKICTransportadora "+
    "LEFT JOIN QR_Maestro as qr ON c.FKQrMaestro = qr.ID_QRMaestro "+
    "LEFT JOIN GeoCercas as geo ON geo.ID = d.UltimaGeoCerca "+
    "LEFT JOIN LokCiudades as corig ON corig.IDCiudad = r.FKLokCiudadOrigen "+
    "LEFT JOIN LokCiudades as cdest ON cdest.IDCiudad = r.FKLokCiudadDestino "+
    "OUTER APPLY dbo.IconosContract(c.ContractID, c.FKLokDeviceID) AS iconos WHERE c.Active=1 "+
    "ORDER BY bitAperturaRespo ASC, d.Locked ASC";
    //"ORDER BY d.Locked ASC, bitAperturaRespo ASC, bitBackRespo ASC, bitAlejadoRespo ASC, bitDesvioRespo ASC, bitDetencionRespo ASC, bitGpsRespo ASC, bitTiempoRespo ASC, d.LoksysServerTime";
    try {
        let resultado = await sqlconfig.query(consulta);
        return { success: true, data: resultado.recordsets[0] };
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        return { success: false, message: 'Error al ejecutar la consulta' };
    }
};

const getNotificacionesGlobal = async () => {
    var consulta = "SELECT TOP 1000 n.IdNotificacion, n.FkLokDeviceID, n.alertValue, n.idMensaje, n.DatetimeNoti, n.FkTipoNotificacion, "
    +"n.NotificacionCliente, n.DatetimeEvento, n.AlertLevel, "
    +"n.FkLokContractID, n.FkUltGeoCerca, n.bitGeoAutorizada, n.Notificacion, n.FkLokProyecto, n.FkICEmpresa, n.FkIdAtencionNoti, '' as NombreEmpresa "
    +"FROM LokNotificaciones as n INNER JOIN LokcontractID as c ON n.FkLokContractID = c.ContractID where n.FkIdAtencionNoti is null AND c.Active=1 order by n.IdNotificacion desc";
    try {
        let resultado = await sqlconfig.query(consulta);
        return { success: true, data: resultado.recordsets[0] };
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        return { success: false, message: 'Error al ejecutar la consulta' };
    }
};

// Función para consultar la base de datos
const checkSolicitudes = async () => {
    try {
      const globalSolicitudesData = await getSolicitudesGlobal();

      if (globalSolicitudesData.success) {
          // Filtrar los datos para cada cliente según su idempresa
          clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN && client.decoded) {
                  let dataToSend;
                  //console.log("idempresa="+client.decoded.idempresa);
                  //console.log("globalSolicitudesData.data=",JSON.stringify(globalSolicitudesData.data, null, 2));
                  // Verificar si la idempresa del cliente es diferente de 2
                  var aceptar=false;
                  if (client.decoded.idempresa !== 2) {
                      // Filtrar los datos para el cliente con idempresa diferente de 2
                      dataToSend = globalSolicitudesData.data.filter(solicitud => solicitud.IdEmpresa === client.decoded.idempresa);
                  } else {
                      // Si la idempresa es 2, enviar todos los datos sin filtrar
                      dataToSend = globalSolicitudesData.data;
                      aceptar= true;
                  }
                  console.log(dataToSend);
                  // Enviar los datos filtrados al cliente
                  if (dataToSend.length > 0) {
                      client.send(JSON.stringify({
                          event: true,
                          message: 'Nueva solicitud',
                          data: dataToSend,
                          aceptar: aceptar
                      }));
                  } else {
                      client.send(JSON.stringify({
                          event: false,
                          message: 'No hay solicitudes para tu empresa'
                      }));
                  }
              }
          });
      } else {
          // Enviar mensaje a todos los usuarios en caso de error en la consulta
          broadcast({
              event: false,
              message: 'Error al obtener datos de solicitudes'
          });
      }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        broadcast({
            event: false,
            message: 'Error al verificar solicitudes'
        });
    }
};

const checkNotificaciones = async () => {
    try {
      console.log("entro a check notificaciones");
      const globalNotificacionesData = await getNotificacionesGlobal();
      if (globalNotificacionesData.success) {
          // Filtrar los datos para cada cliente según su idempresa
          clientsNotificaciones.forEach((client) => {

              if (client.readyState === WebSocket.OPEN && client.decoded) {
                  let dataToSend;
                  if (client.decoded.idempresa !== 2) {

                      // Filtrar los datos para el cliente con idempresa diferente de 2
                      //dataToSend = globalNotificacionesData.data.filter(noti => noti.FkICEmpresa === clientsNotificaciones.decoded.idempresa);
                      //dataToSend = globalNotificacionesData.data;
                      dataToSend = globalNotificacionesData.data.filter(noti => noti.FkICEmpresa === client.decoded.idempresa);
                  } else {
                      // Si la idempresa es 2, enviar todos los datos sin filtrar
                      dataToSend = globalNotificacionesData.data.filter(noti => noti.FkLokProyecto === client.decoded.proyecto);
                  }

                  // Enviar los datos filtrados al cliente
                  if (dataToSend.length > 0) {
                      client.send(JSON.stringify({
                          event: true,
                          message: 'Nueva Notificacion',
                          data: dataToSend
                      }));
                  } else {
                      client.send(JSON.stringify({
                          event: false,
                          message: 'No hay Notificaciones para tu empresa'
                      }));
                  }
              }
          });
      } else {
          // Enviar mensaje a todos los usuarios en caso de error en la consulta
          clientsNotificaciones.send(JSON.stringify({
              event: false,
              message: 'Error BD Notificaciones'
          }));
      }
    } catch (err) {
        clientsNotificaciones.send(JSON.stringify({
            event: false,
            message: 'Error WS Notificaciones'
        }));
    }
};

const filtrarContratos = (contratos, decoded) => {
    const empresasTraficoIds = decoded.empresastrafico
      ? decoded.empresastrafico.split(',').map(id => parseInt(id.trim(), 10))
      : [];
    return contratos.filter(contrato => {
        // Filtrar primero por FKLokProyecto¿
        if (contrato.FKLokProyecto !== decoded.proyecto) {
            return false; // Excluye el contrato si el proyecto no coincide
        }
        // Condición 1: Si el proyecto es 1, se requiere que FKICEmpresa no sea nulo
        if (decoded.proyecto === 1 && contrato.FKICEmpresa === null) {
            return false; // Excluye el contrato si FKICEmpresa es nulo
        }

        // Condición 2: Si idempresa no es igual a empresaprincipal y proyecto es igual a owner,
        // se aplica la condición FKICEmpresa o alguna FKICEmpresaConsulta coincide con idempresa
        /*if (decoded.idempresa !== decoded.empresaprincipal && decoded.proyecto === decoded.owner) {
            return (
                contrato.FKICEmpresa === decoded.idempresa ||
                contrato.FKICEmpresaConsulta === decoded.idempresa ||
                contrato.FKICEmpresaConsulta2 === decoded.idempresa ||
                contrato.FKICEmpresaConsulta3 === decoded.idempresa ||
                contrato.Owner === decoded.idempresa
            );
        }*/

        if (decoded.idempresa !== decoded.empresaprincipal && decoded.proyecto === decoded.owner) {
            if (
                contrato.FKICEmpresa !== decoded.idempresa &&
                contrato.FKICEmpresaConsulta !== decoded.idempresa &&
                contrato.FKICEmpresaConsulta2 !== decoded.idempresa &&
                contrato.FKICEmpresaConsulta3 !== decoded.idempresa &&
                contrato.Owner !== decoded.idempresa
            ) {
                if (empresasTraficoIds.length > 0 && !empresasTraficoIds.includes(contrato.FKICEmpresa)) {
                    return false; // Excluye el contrato si FKICEmpresa no está en EmpresasTrafico
                }
            }
        }

        // Si ninguna de las condiciones anteriores aplica, incluye el contrato en el resultado
        return true;
    });
};

const solicitudesHB = async () => {
  broadcast({
      event: false,
      message: 'No hay solicitudes'
  });
};

const notificacionesHB = async () => {
  broadcast2({
      event: false,
      message: 'No hay notificaciones'
  });
};

const checkContratos = async () => {
    try {
        const globalContratosData = await getTraficoGlobal();
        const contratos = globalContratosData.data;
        clientsTrafico.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && client.decoded) {
                let dataToSend= filtrarContratos(contratos, client.decoded);
                // Enviar los datos filtrados al cliente
                if (dataToSend.length > 0) {
                    client.send(JSON.stringify({
                        event: true,
                        message: 'Actualizacion trafico',
                        data: dataToSend,
                        username: client.decoded.username,
                        diffhorario: client.decoded.diffhorario
                    }));
                } else {
                    client.send(JSON.stringify({
                        event: false,
                        message: 'No hay actualizacion de trafico'
                    }));
                }
            }
        });
    } catch (err) {
        console.error('Error al consultar contratos:', err);
    }
};

// Función para enviar mensajes a todos los clientes conectados
const broadcast = (data) => {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

const broadcast2 = (data) => {
    clientsNotificaciones.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            console.log("envio de hb de notificaciones");
            client.send(JSON.stringify(data));
        }
    });
};

// Evento cuando un cliente se conecta
wss.on('connection', (ws, req) => {
    const token = req.headers['sec-websocket-protocol'];
    if (!token || token === 'undefined') {
        ws.send(JSON.stringify({ success: false, message: 'Token is missing' }));
        ws.close(); // Cerrar la conexión si no hay token
    } else {
        jwt.verify(token, 'secret_key', (err, decoded) => {
            if (err) {
                ws.send(JSON.stringify({ success: false, message: 'Failed to authenticate token' }));
                ws.close(); // Cerrar la conexión si el token no es válido
            } else {
                // El token es válido, podemos agregar el socket al conjunto de clientes
                ws.decoded = decoded;
                clients.add(ws);
                console.log("entro a clientes solicitudes");
                ws.send(JSON.stringify({ success: true, message: 'Successfully authenticated' }));

                // Cuando el cliente se desconecta
                ws.on('close', () => {
                    clients.delete(ws);
                });
            }
        });
    }
});


wss2.on('connection', (ws, req) => {
    console.log("entro  a ws");
    const token = req.headers['sec-websocket-protocol'];
    if (!token || token === 'undefined') {
        ws.send(JSON.stringify({ success: false, message: 'Token is missing' }));
        ws.close();
    } else {
        jwt.verify(token, 'secret_key', (err, decoded) => {
            if (err) {
                ws.send(JSON.stringify({ success: false, message: 'Failed to authenticate token' }));
                ws.close();
            } else {
                ws.decoded = decoded;
                clientsTrafico.add(ws);
                ws.send(JSON.stringify({ success: true, message: 'Successfully authenticated for contratos' }));
                ws.on('close', () => clientsTrafico.delete(ws));
            }
        });
    }
});

wss3.on('connection', (ws, req) => {
    const token = req.headers['sec-websocket-protocol'];
    if (!token || token === 'undefined') {
        ws.send(JSON.stringify({ success: false, message: 'Token is missing' }));
        ws.close(); // Cerrar la conexión si no hay token
    } else {
        jwt.verify(token, 'secret_key', (err, decoded) => {
            if (err) {
                ws.send(JSON.stringify({ success: false, message: 'Failed to authenticate token' }));
                ws.close(); // Cerrar la conexión si el token no es válido
            } else {
                // El token es válido, podemos agregar el socket al conjunto de clientes
                ws.decoded = decoded;
                clientsNotificaciones.add(ws);
                console.log("entro a clientes notificaciones");
                ws.send(JSON.stringify({ success: true, message: 'Successfully authenticated' }));

                // Cuando el cliente se desconecta

                ws.on('close', (code, reason) => {
                    console.log(`Conexión cerrada. Código: ${code}, Motivo: ${reason}`);
                    clientsNotificaciones.delete(ws);
                });
            }
        });
    }
});

// Ejecutar la consulta cada 10 segundos
setInterval(solicitudesHB, Configuracion.HB_SOLICITUDES);
setInterval(notificacionesHB, Configuracion.HB_SOLICITUDES);
setInterval(checkContratos, Configuracion.TIME_TRAFICO);

/*sqlconfig.registerNotification('SELECT IDSolicitudes FROM LokSolicitudes WHERE FKLokEstados = 2')
    .then((data) => {
        console.log("Resultado de la consulta inicial o notificación:", data);
        // Aquí puedes enviar la notificación al cliente WebSocket
    })
    .catch((err) => {
        console.error("Error al registrar notificación:", err);
    });*/

    sqlconfig.registerNotification('Sol_Queue', 'Sol_Notifications', async (message) => {
        console.log("Mensaje procesado:", message);
        await checkSolicitudes();
    });

    sqlconfig.registerNotification('Noti_Queue', 'Noti_Notifications', async (message) => {
        console.log("Mensaje procesado:", message);
        await checkNotificaciones();
    });


app.listen(PORT, () =>{
    console.log("Inicio Server = "+Configuracion.IP_BD+" - "+Configuracion.PUERTO);

    swaggerDocs(app,PORT);
});
