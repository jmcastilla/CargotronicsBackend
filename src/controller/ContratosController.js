const controller = {}
const jwt = require('jsonwebtoken');
const axios = require('axios');
var sqlconfig = require("../model/dbpool");

controller.get_listadispositivos = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var consulta= "SELECT DeviceID FROM LokDeviceID WHERE FKLokProyecto = "+decoded.proyecto+" ORDER BY DeviceID";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_modalidadservicio = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var consulta= "select idModalidadServicio, ModalidadServicio from LokModalidadServicios ORDER BY ModalidadServicio";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_rutas = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var consulta= "SELECT IdRuta, DescripcionRuta FROM ICRutas WHERE FKProyecto = "+decoded.proyecto+" ORDER BY DescripcionRuta";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_barras = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var consulta= "SELECT BarsID FROM LokBarsSLM "+
                    "LEFT JOIN LokContractID ON LokBarsSLM.LastContractID = LokContractID.ContractID "+
                    "WHERE (LokContractID.Active = 0 OR LokBarsSLM.LastContractID = 'none')";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_controlestrafico = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var consulta= "SELECT dbo.TotalServicios("+decoded.idempresa+", "+decoded.proyecto+", "+decoded.roltrafico+") AS Blanco, "+
                    "dbo.ServiciosPrev("+decoded.idempresa+", "+decoded.proyecto+", "+decoded.roltrafico+") AS Amarillo, "+
                    "dbo.ServiciosWarn("+decoded.idempresa+", "+decoded.proyecto+", "+decoded.roltrafico+")  AS Rojo;"
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_listachequeo = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var contrato= req.body.contrato;
                    var consulta= "SELECT id_chequeo, usuario1, Fk_ContractID, patio, naviera, doc_conductor1, nombre_conductor1, embarcador, placa1, precinto1, respuestas1, "+
                    "observaciones1, datetime_patio, usuario2, vigilante1, precinto2, respuestas2, observaciones2, datetime_iplanta, usuario3, vigilante2, "+
                    "doc_conductor2, nombre_conductor2, placa2, etiqueta1, etiqueta2, sellobotella, datetime_splanta, completo, (ContainerNum + CAST(isnull(DigitoVerificacion, '') AS CHAR(1))) as contenedor "+
                    "FROM ValitronicsChequeo V LEFT JOIN LokContractID C ON V.Fk_ContractID = C.ContractID WHERE Fk_ContractID = '"+contrato+"'";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

module.exports = controller;
