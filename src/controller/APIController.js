const controller = {}
const jwt = require('jsonwebtoken');
const axios = require('axios');
var sqlconfig = require("../model/dbpool");

controller.get_rutas = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_api', async (err, decoded) => {
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
                        if(await existePlaca(req.body.Placa)){
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
                                "NombreConductor": NULL,
                                "NitConductor": NULL,
                                "MovilConductor": NULL,
                                "ContainerNum": req.body.Contenedor,
                                "DigitoVerificacion": NULL,
                                "Notas": "CREADO DESDE API CLIENTE",
                                "FKLokCategoriaServ": 2,
                                "FKLokModalidadServ": NULL,
                                "error": { type: sql.Int, dir: sql.Output }
                            };
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

                        }else{
                            res.json({ success: false, message: 'La placa no existe.' });
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

async function existePlaca(placa) {
    const consulta = `
      SELECT c.FKLokDeviceID
      FROM LokContractID c
      INNER JOIN LokDeviceID d ON c.FKLokDeviceID = d.DeviceID
      WHERE c.LokTipoServicios = 12 AND c.FKLokDeviceID=${placa}
    `;

    const resultado = await sqlconfig.query(consulta);

    if (!resultado.recordset || resultado.recordset.length === 0) {
      console.log("no hay placas");
      return false;
    }

    return true;
}



module.exports = controller;
