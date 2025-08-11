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


controller.get_agencias = async (req, res) => {
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

                    var consulta = "SELECT IDAgencia, Descripcion FROM LOKAGENCIA Where FKProyecto ="+proyecto;
                    consulta += " order by Descripcion";

                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}

controller.set_agencia = async (req, res) => {
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
                    if(req.body.ID == -1){
                        var consulta = "INSERT INTO LokAgencia (Descripcion, FKProyecto) VALUES ("+
                        "'"+req.body.Descripcion+"',"+decoded.proyecto+")";

                        res.json({success : true, data : await sqlconfig.query(consulta)});
                    }else{
                        try{
                            var consulta = "UPDATE LokAgencia SET Descripcion='"+req.body.Descripcion+"' WHERE IDAgencia="+req.body.ID;
                            res.json({success : await sqlconfig.query(consulta)});
                        }catch(error){
                            res.json({success : false});
                        }
                    }
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

controller.get_ciudades = async (req, res) => {
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

                    var consulta = "SELECT * FROM LOKCIUDADES Where FKProyecto ="+proyecto;
                    consulta += " order by NombreCiudad";

                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}


controller.set_ciudad = async (req, res) => {
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
                    if(req.body.ID == -1){
                        var consulta = "INSERT INTO LokCiudades (NombreCiudad, Latitud, Longitud, FKAgencia, FKLokProyecto) VALUES ("+
                        "'"+req.body.Nombre+"',"+req.body.Latitud+","+req.body.Longitud+","+req.body.FKAgencia+","+decoded.proyecto+")";

                        res.json({success : true, data : await sqlconfig.query(consulta)});
                    }else{
                        try{
                            var consulta = "UPDATE LokCiudades SET NombreCiudad='"+req.body.Nombre+"', Latitud="+req.body.Latitud+", Longitud="+req.body.Longitud+", FKAgencia="+req.body.FKAgencia+" WHERE IDCiudad="+req.body.ID;
                            res.json({success : await sqlconfig.query(consulta)});
                        }catch(error){
                            res.json({success : false});
                        }
                    }
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

controller.get_acompanantes = async (req, res) => {
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

                    var consulta = "SELECT IDAcompaniante, NoDocumento, Nombre, Telefono From LokAcompanianteOC ORDER BY Nombre";

                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}


controller.set_acompanantes = async (req, res) => {
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
                    if(req.body.ID == -1){
                        var consulta = "INSERT INTO LokAcompanianteOC (NoDocumento, Nombre, Telefono) VALUES ("+
                        "'"+req.body.NoDocumento+"',''"+req.body.Nombre+"'','"+req.body.Telefono+"')";

                        res.json({success : true, data : await sqlconfig.query(consulta)});
                    }else{
                        try{
                            var consulta = "UPDATE LokAcompanianteOC SET NoDocumento='"+req.body.NoDocumento+"', Nombre='"+req.body.Nombre+"', Telefono='"+req.body.Telefono+"' WHERE IDAcompaniante="+req.body.ID;
                            res.json({success : await sqlconfig.query(consulta)});
                        }catch(error){
                            res.json({success : false});
                        }
                    }
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

controller.delete_acompanantes = async (req, res) => {
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
                  try{
                      var consulta = "DELETE FROM LokAcompanianteOC WHERE IDAcompaniante="+req.body.ID;
                      res.json({success : await sqlconfig.query(consulta)});
                  }catch(error){
                      res.json({success : false});
                  }
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

controller.get_instaladores = async (req, res) => {
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

                    var consulta = "SELECT CCInstalador, NombreInstalador, TelefonoInstalador From LokInstaladores ORDER BY NombreInstalador";

                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}

controller.set_instaladores = async (req, res) => {
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
                    if(req.body.NEW == -1){
                        var consulta = "INSERT INTO LokInstaladores (CCInstalador, NombreInstalador, TelefonoInstalador) VALUES ("+
                        "'"+req.body.CCInstalador+"','"+req.body.NombreInstalador+"','"+req.body.TelefonoInstalador+"')";

                        res.json({success : true, data : await sqlconfig.query(consulta)});
                    }else{
                        try{
                            var consulta = "UPDATE LokInstaladores SET NombreInstalador='"+req.body.NombreInstalador+"', TelefonoInstalador='"+req.body.TelefonoInstalador+"' WHERE CCInstalador='"+req.body.CCInstalador+"'";
                            res.json({success : await sqlconfig.query(consulta)});
                        }catch(error){
                            res.json({success : false});
                        }
                    }
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

controller.delete_instalador = async (req, res) => {
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
                  try{
                      var consulta = "DELETE FROM LokInstaladores WHERE CCInstalador='"+req.body.CCInstalador+"'";
                      res.json({success : await sqlconfig.query(consulta)});
                  }catch(error){
                      res.json({success : false});
                  }
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}


controller.get_traportadoras = async (req, res) => {
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

                    var consulta = "SELECT IdTransportadora, NombreTranspo, AliasTranspo, proyectoTransportadora From ICTransportadora ORDER BY NombreTranspo";

                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}

controller.set_transportadora = async (req, res) => {
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
                    if(req.body.ID == -1){
                        var consulta = "INSERT INTO ICTransportadora (NombreTranspo, AliasTranspo, proyectoTransportadora) VALUES ("+
                        "'"+req.body.NombreTranspo+"','"+req.body.AliasTranspo+"',"+decoded.proyecto+")";

                        res.json({success : true, data : await sqlconfig.query(consulta)});
                    }else{
                        try{
                            var consulta = "UPDATE ICTransportadora SET NombreTranspo='"+req.body.NombreTranspo+"', AliasTranspo='"+req.body.AliasTranspo+"', proyectoTransportadora="+req.body.proyectoTransportadora+" WHERE IdTransportadora="+req.body.ID;
                            res.json({success : await sqlconfig.query(consulta)});
                        }catch(error){
                            res.json({success : false});
                        }
                    }
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

controller.delete_transportadora = async (req, res) => {
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
                  try{
                      var consulta = "DELETE FROM ICTransportadora WHERE IdTransportadora='"+req.body.IdTransportadora+"'";
                      res.json({success : await sqlconfig.query(consulta)});
                  }catch(error){
                      res.json({success : false});
                  }
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}
module.exports = controller;
