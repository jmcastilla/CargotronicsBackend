const controller = {}
const jwt = require('jsonwebtoken');
const axios = require('axios');
const sql = require("mssql");
var sqlconfig = require("../model/dbpool");

controller.get_rutas = async (req, res) => {
    try{
        var token = req.headers.authorization;
        console.log(token);
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_api', async (err, decoded) => {
              console.log(decoded);
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var consulta="SELECT IdRuta, DescripcionRuta FROM ICRutas WHERE FKProyecto="+decoded.proyecto+" ORDER BY DescripcionRuta";
                    //agregar antes el no asignado
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.crear_contrato = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_api', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Token incorrecto.' });
                } else {
                    if(req.body.Placa === '' || req.body.Placa === null){
                        res.json({ success: false, message: 'Faltan campos por llenar.' });
                    }else{
                        var valorresultado = await existePlaca(req.body.Placa, decoded.proyecto);
                        console.log("resultado:   "+valorresultado);
                        if(valorresultado === 1 ){
                            const hoy = new Date();
                            hoy.setHours(hoy.getHours() - 5);
                            let data = {
                                "DeviceID": req.body.Placa,
                                "PositionTimestamp": hoy.getTime(),
                                "LokTipoServicios": 12,
                                "ubicacion": "ORIGEN",
                                "InicioContrato": formatYYYYMMDD_HHMMSS(hoy),
                                "UserCreacion": decoded.username,
                                "Proyecto": decoded.proyecto,
                                "FKICEmpresa": decoded.idempresa,
                                "FKICRutas": req.body.Ruta,
                                "Ref": req.body.Ref,
                                "PlacaTruck": req.body.Placa,
                                "NombreConductor": null,
                                "NitConductor": null,
                                "MovilConductor": null,
                                "ContainerNum": req.body.Contenedor,
                                "DigitoVerificacion": null,
                                "Notas": "CREADO DESDE API CLIENTE",
                                "FKLokCategoriaServ": 2,
                                "FKLokModalidadServ": null,
                                "error": { type: sql.Int, dir: sql.Output }
                            };
                            console.log(data);
                            let resultado=await sqlconfig.queryProcedureconoutput('LokCrearContractGeneralMovil', data);
                            var resbool = true;
                            var mensaje = "";
                            if(resultado.returnValue === 1){
                                resbool = true;
                                mensaje = "El contrato creado exitosamente.";
                            }else{
                                resbool = false;
                                mensaje = "El contrato no fue creado, se presento un error.";
                            }
                            res.json({success : resbool, data : resultado.recordsets[0], mensaje: mensaje});

                        }else if(valorresultado === 0){
                            res.json({ success: false, message: 'La placa no existe.' });
                        }else{
                            res.json({ success: false, message: 'La placa no esta disponible.' });
                        }
                    }

                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

function formatYYYYMMDD_HHMMSS(date) {
  const pad = (n) => String(n).padStart(2, '0');

  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}

async function existePlaca(placa, proyecto) {
  const consulta = `
    SELECT TOP 1 DeviceID, Estado
    FROM LokDeviceID
    WHERE DeviceID='${placa}'
      AND FKLokProyecto=${proyecto}
      AND FKLokTipoEquipo=12
  `;

  const resultado = await sqlconfig.query(consulta);

  if (!resultado.recordset || resultado.recordset.length === 0) {
    return -1;
  }

  const estado = resultado.recordset[0].Estado;
  return estado === 1 ? 1 : 2;
}



module.exports = controller;
