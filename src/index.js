var express = require('express');
const multer  = require('multer');
const path = require('path');
var mssql = require("mssql");
var cors = require('cors');
const jwt = require('jsonwebtoken');
var app = express();
var crypto = require('crypto');
var hash = crypto.createHash('sha1');
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
const PORT = 3002;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: {fileSize: 100 * 1024 * 1024} });

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

const allowedOrigins = [
  'https://infocarga-frontend-jwt-theta.vercel.app',
  'http://localhost:3000'
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
  res.header('Access-Control-Allow-Origin', req.headers.origin); // Permitir cualquier origen
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const solicitudesRouters = require('./routes/SolicitudesRoute');
const operacionesRouters = require('./routes/OperacionesRoute');
const empresasRouters = require('./routes/EmpresasRoute');
const dianRouters = require('./routes/DianRoute');
app.use('/solicitudes', solicitudesRouters);
app.use('/operaciones', operacionesRouters);
app.use('/empresas', empresasRouters);
app.use('/dian', dianRouters);


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
      console.log(row);
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
app.post('/login', async (req, res) =>{
    try{
        let user=req.body.user;
        let pass=req.body.pass;
        var consulta= "SELECT u.Pwd, u.Salt, u.FKProyecto, p.DiferenciaServidor, p.DiferenciaHorariaM, "+
        "u.RolTrafico, u.Trafico, ISNULL(p.ProyectoPrincipal, 1) as ownr, ISNULL(p.varidcliente, 2) as varidcliente, "+
        "e.IdEmpresa, ISNULL(clientede, 0) as clientede FROM ICUsers as u "+
        "INNER JOIN ICEmpresa as e on e.IdEmpresa = u.FKICEmpresa "+
        "INNER JOIN LokProyectos as p on p.IDProyecto = u.FKProyecto "+
        "WHERE u.IdUser='"+user+"' and u.Activo=1";
        console.log(consulta);
        let resultado=await sqlconfig.query(consulta);
        console.log(resultado);
        if(resultado.recordset.length > 0){
            const hashresult = crypto.createHash('sha256')
            .update(pass+'|'+resultado.recordset[0].Salt)
            .digest('hex');

            if(hashresult == resultado.recordset[0].Pwd){
                const tokenPayload = {
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
                    server: sqlconfig.server
                };
                const token = jwt.sign(tokenPayload, 'secret_key', { expiresIn: '1h' });
                res.json({success : true, entorno: sqlconfig.server, token});
            }else{
                res.json({success : false});
            }
        }else{
            res.json({success : false});
        }
    }catch(err){
        console.log(err);
        res.json({success : false});
    }
});

app.post('/falabella', async (req, res) =>{
    try{
        let contenedor=req.body.contenedor;
        let token=req.body.token;
        console.log(contenedor+" - "+token);
        if(token == "7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ"){
            var consulta= "SELECT c.LastReportUbica as Ubicacion, r.TipoReporte as Estado, c.ContainerNum as Contenedor FROM LokContractID as c " +
  					"INNER JOIN ICTipoReporte AS r on r.IdTipoReporte = c.LastICTipoReporte WHERE " +
  					"c.Active=1 AND c.FKICEmpresa=243 AND c.ContainerNum='"+contenedor+"'";
            console.log(consulta);
            let resultado=await sqlconfig.query(consulta);
            res.json({success : true, data : resultado.recordsets[0]});
        }else{
            res.json({success : false, msg : "El token es incorrecto."});
        }

    }catch(err){
        console.log(err);
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
                        server: decoded.server
                    };
                    const nuevotoken = jwt.sign(tokenPayload, 'secret_key', { expiresIn: '1h' });
                    res.json({success : true, nuevotoken});
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
    console.log(files);
    var enviados = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file.buffer);
      console.log(file.mimetype);
      try {
        if (file.mimetype.startsWith('image/')) {
          // Process image file using sharp
          const metadata = await sharp(file.buffer).metadata();
          console.log(metadata);

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
            console.log(`Received data from server: ${data.toString('utf8')}`);
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
    console.log(files);
    var enviados = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file.buffer);
      console.log(file.mimetype);
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


app.listen(PORT, () =>{
    console.log("Inicio Server");
    swaggerDocs(app,PORT);
});
