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
const upload = multer({ storage: storage });

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

app.use(cors({
  origin : 'http://localhost:3000',
  credentials: true
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
/*app.use(cors({
  origin: '*', // Permitir cualquier origen
  credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir cualquier origen
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});*/

const operacionesRouters = require('./routes/OperacionesRoute');
const empresasRouters = require('./routes/EmpresasRoute');
const dianRouters = require('./routes/DianRoute');
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
                const token = jwt.sign(tokenPayload, 'secret_key', { expiresIn: '1m' });
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

// FUNCION PARA DESLOGUEARSE DEL SISTEMA
app.get('/logout', async (req, res) =>{
    res.json({success : true});
});

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
                    delete decoded.exp;
                    const nuevotoken = jwt.sign(decoded, 'secret_key', { expiresIn: '1m' });
                    res.json({success : true, nuevotoken});
                }
            });

        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false });
    }
});

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
                    const clientId = 'df2f25be-943f-45b7-8185-b01f6cb30fd0';
                    const clientSecret = 'eb58Q~JrMrxe4hWikVit6QJDEbxNNEvtrDRCvbAF';
                    const resource = 'https://analysis.windows.net/powerbi/api';

                    const requestData = {
                        grant_type: 'Password',
                        username: 'alondono@logiseguridad.com',
                        password:'Pruebas2024',
                        resource,
                        client_id: clientId,
                        client_secret: clientSecret,
                        scope: 'Dataset.Read.All',
                    };

                    const response = await axios.post(tokenEndpoint, null, {
                        params: requestData,
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
