var express = require('express');
const session = require('express-session');
const multer  = require('multer');
const path = require('path');
var mssql = require("mssql");
var cors = require('cors');
var app = express();
var crypto = require('crypto');
var hash = crypto.createHash('sha1');
var sqlconfig = require("./model/dbpool");
const sharp = require('sharp');
const XlsxPopulate = require('xlsx-populate');
const bodyParser = require('body-parser');
const net = require('net');
const fs = require('fs');
const { Readable } = require('stream');

const upload = multer();

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

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
        var consulta= "SELECT u.Pwd, u.Salt, u.FKProyecto, p.DiferenciaServidor FROM ICUsers as u "+
        "INNER JOIN LokProyectos as p on p.IDProyecto = u.FKProyecto "+
        "WHERE u.IdUser='"+user+"'";
        console.log(consulta);
        let resultado=await sqlconfig.query(consulta);
        console.log(resultado);
        if(resultado.recordset.length > 0){
            const hashresult = crypto.createHash('sha256')
            .update(pass+'|'+resultado.recordset[0].Salt)
            .digest('hex');

            if(hashresult == resultado.recordset[0].Pwd){
                req.session.loggedin = true;
                req.session.username = user;
                req.session.proyecto = resultado.recordset[0].FKProyecto;
                req.session.diffhorario = resultado.recordset[0].DiferenciaServidor;
                req.session.diffUTC = resultado.recordset[0].DiferenciaHorariaM;
                res.json({success : true});
            }else{
                if (req.session) {
                    req.session.destroy();
                }
                res.json({success : false});
            }
        }else{
            if (req.session) {
                req.session.destroy();
            }
            res.json({success : false});
        }
    }catch(err){
        console.log(err);
        res.json({success : false});
    }
});

// FUNCION PARA DESLOGUEARSE DEL SISTEMA
app.get('/logout', async (req, res) =>{
    if (req.session) {
        console.log("entro a destruir");
        req.session.destroy();
        console.log(req.session);
    }
    res.json({success : true});
});


// FUNCION PARA SUBIR FOTOS AL SERVIDOR DE TRAKAPHOTO
app.post('/upload',upload.array('files'), async (req, res) =>{
    try{
        const files = req.files;
        console.log(files);
        var enviados=0;

        for(let i = 0; i < files.length; i++) {
            const file = files[i];
            sharp(file.buffer)
            .metadata() // Obtener los metadatos de la imagen
            .then(metadata => {
              console.log(metadata); // Imprimir los metadatos en la consola
              return sharp(file.buffer)
                .resize({ width: 800, height: 600, fit: sharp.fit.inside, withoutEnlargement: true })
                .jpeg({ quality: 80 })
                .toBuffer();
            })
            .then(dataFoto => {
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
                  if(enviados== files.length){
                      res.json({success : true});
                  }
                  client.end(); // Close the connection after receiving data from the server
              });

              client.on('end', () => {
                  console.log('Disconnected from server');
              });
            })
            .catch(err => {
              console.error(err);
            });
        }
    }catch(err){
      console.log(err);
        res.json({success : false});
    }

});


app.listen(5000);
