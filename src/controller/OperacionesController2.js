const controller = {}
const jwt = require('jsonwebtoken');
const axios = require('axios');
var sqlconfig = require("../model/dbpool");
const Configuracion = require("../config");
const moment = require('moment');


controller.get_contactos = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var proyecto=decoded.proyecto;
                    var idcliente=decoded.idempresa;
                    var tipo = req.body.tipo;

                    if (tipo === undefined || tipo === null || tipo === '') {
                        return res.json({ success: false, message: 'Error de parametros' });
                    }

                    var consulta = "SELECT * FROM LOKCONTACTOS WHERE TipoContacto ="+tipo+" AND FKProyecto ="+proyecto;
                    consulta += " order by NOMBRECONTACTO";

                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}

controller.set_insertcontacto = async (req, res) => {
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
                    let data = {
                        "NombreContacto": req.body.NombreContacto,
                        "FKICEmpresa": req.body.FKICEmpresa,
                        "Mail": req.body.Mail,
                        "Telefono": req.body.Telefono,
                        "AperturaM": req.body.AperturaM,
                        "AperturaT": req.body.AperturaT,
                        "ZonaSeguraM": req.body.ZonaSeguraM,
                        "ZonaSeguraT": req.body.ZonaSeguraT,
                        "GeocercasM": req.body.GeocercasM,
                        "GeocercasT": req.body.GeocercasT,
                        "DesvioM": req.body.DesvioM,
                        "DesvioT": req.body.DesvioT,
                        "RetrocesoM": req.body.RetrocesoM,
                        "RetrocesoT": req.body.RetrocesoT,
                        "BateriaM": req.body.BateriaM,
                        "BateriaT": req.body.BateriaT,
                        "LuzM": req.body.LuzM,
                        "LuzT": req.body.LuzT,
                        "GpsEstaticoM": req.body.GpsEstaticoM,
                        "GpsEstaticoT": req.body.GpsEstaticoT,
                        "TiempoGpsM": req.body.TiempoGpsM,
                        "TiempoGpsT": req.body.TiempoGpsT,
                        "VelocidadM": req.body.VelocidadM,
                        "VelocidadT": req.body.VelocidadT,
                        "ReportTrafico": req.body.ReportTrafico,
                        "RolTrafico": req.body.RolTrafico,
                        "tipo": req.body.tipo
                    };
                    let resultado=await sqlconfig.queryProcedure('InsertContacto', data);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.set_updatecontacto = async (req, res) => {
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
                    let data = {
                        "NombreContacto": req.body.NombreContacto,
                        "FKICEmpresa": req.body.FKICEmpresa,
                        "ID": req.body.ID,
                        "Mail": req.body.Mail,
                        "Telefono": req.body.Telefono,
                        "AperturaM": req.body.AperturaM,
                        "AperturaT": req.body.AperturaT,
                        "ZonaSeguraM": req.body.ZonaSeguraM,
                        "ZonaSeguraT": req.body.ZonaSeguraT,
                        "GeocercasM": req.body.GeocercasM,
                        "GeocercasT": req.body.GeocercasT,
                        "DesvioM": req.body.DesvioM,
                        "DesvioT": req.body.DesvioT,
                        "RetrocesoM": req.body.RetrocesoM,
                        "RetrocesoT": req.body.RetrocesoT,
                        "BateriaM": req.body.BateriaM,
                        "BateriaT": req.body.BateriaT,
                        "LuzM": req.body.LuzM,
                        "LuzT": req.body.LuzT,
                        "GpsEstaticoM": req.body.GpsEstaticoM,
                        "GpsEstaticoT": req.body.GpsEstaticoT,
                        "TiempoGpsM": req.body.TiempoGpsM,
                        "TiempoGpsT": req.body.TiempoGpsT,
                        "VelocidadM": req.body.VelocidadM,
                        "VelocidadT": req.body.VelocidadT,
                        "ReportTrafico": req.body.ReportTrafico,
                        "RolTrafico": req.body.RolTrafico
                    };
                    let resultado=await sqlconfig.queryProcedure('UpdateContacto', data);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}


module.exports = controller;
