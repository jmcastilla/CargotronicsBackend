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
                        "tipo": req.body.tipo,
                        "ReportTrafico": req.body.ReportTrafico,
                        "RolTrafico": req.body.RolTrafico,
                        "FKProyecto": decoded.proyecto

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
                    console.log(data);
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

                    var consulta = "SELECT * FROM LOKCIUDADES Where FKLokProyecto ="+proyecto;
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

controller.get_empresasbusqueda = async (req, res) => {
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

                    var consulta = "select IDEmpresasOC, Descripcion from LokEmpresasOC order by Descripcion";

                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}

controller.get_categoriasoc = async (req, res) => {
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

                    var consulta = "SELECT id_categoria_oc, desc_categoria_oc FROM LokCatBusquedasOC ORDER BY desc_categoria_oc";

                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}

controller.get_ordenescompra = async (req, res) => {
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

                    var consulta = "select IdOCBusqueda, NumOCBusqueda, Origen.NombreCiudad as ciudadorigen, FKCiudadOrigen, Destino.NombreCiudad as ciudaddestino, FKCiudadDestino, LokAcompanianteOC.Nombre as acompanante, FKLokAcompanianteOC, FKLokEmpresaOC, FechaCita, Observaciones, FechaFin, FKLokCategoriaOC ";
                    consulta += " from LokBusquedasOC inner join LokAcompanianteOC ON FKLokAcompanianteOC = IDAcompaniante left join LokCiudades AS Origen ON FKCiudadOrigen = Origen.IDCiudad ";
                    consulta += " left join LokCiudades AS Destino ON FKCiudadDestino = Destino.IDCiudad where FKLokSolicitudID ='"+req.body.idsolicitud+"'";

                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}

controller.get_estadosdevice = async (req, res) => {
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

                    var consulta = "SELECT IDEstado, Descripcion FROM LokDeviceIDEstado";

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
                        "'"+req.body.NoDocumento+"','"+req.body.Nombre+"','"+req.body.Telefono+"')";

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


controller.set_insertordencompra = async (req, res) => {
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
                        "num": req.body.num,
                        "FKLokSolicitudID": req.body.FKLokSolicitudID,
                        "fklokempresaoc": req.body.fklokempresaoc,
                        "fkacompaniante": req.body.fkacompaniante,
                        "fkorigen": req.body.fkorigen,
                        "fkdestino": req.body.fkdestino,
                        "categoria": req.body.categoria,
                        "observacion": req.body.observacion,
                        "horacita": req.body.horacita,
                        "horafin": req.body.horafin,
                        "usuario": decoded.username
                    };

                    let resultado=await sqlconfig.queryProcedure('AgregarBusquedaOC', data);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.set_updateordencompra = async (req, res) => {
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
                        "ident": req.body.num,
                        "FKLokSolicitudID": req.body.FKLokSolicitudID,
                        "fklokempresaoc": req.body.fklokempresaoc,
                        "fkacompaniante": req.body.fkacompaniante,
                        "fkorigen": req.body.fkorigen,
                        "fkdestino": req.body.fkdestino,
                        "categoria": req.body.categoria,
                        "observacion": req.body.observacion,
                        "horacita": req.body.horacita,
                        "horafin": req.body.horafin,
                        "usuario": decoded.username
                    };
                    console.log(data);

                    let resultado=await sqlconfig.queryProcedure('EditarBusquedaOC', data);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_numordencompra = async (req, res) => {
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
                    var consulta = "select dbo.NumeroBusquedaOC() AS num";

                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}

controller.get_fotostraka = async (req, res) => {
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
                    var device=req.body.device;
                    var fecha=req.body.fecha;
                    var usuario=req.body.usuario;
                    var placa=req.body.placa;
                    var count=0;
                    var consulta = "select TOP 2000 * from LokTrakaphoto ";
                    if(device !== ""){
                        consulta+= "WHERE Device = '"+device+"' ";
                        count++;
                    }
                    if(fecha !== ""){
                        if(count === 0){
                            consulta+="WHERE CAST(Hora AS date)='"+fecha+"' ";
                            count++;
                        }else{
                            consulta+="AND CAST(Hora AS date)='"+fecha+"' ";
                        }
                    }
                    if(usuario !== ""){
                        if(count === 0){
                            consulta+="WHERE Usuario='"+usuario+"' ";
                            count++;
                        }else{
                            consulta+="AND Usuario='"+usuario+"' ";
                        }
                    }
                    if(placa !== ""){
                        if(count === 0){
                            consulta+="WHERE Descripcion LIKE '%"+placa+"%' ";
                            count++;
                        }else{
                            consulta+="AND Descripcion LIKE '%"+placa+"%' ";
                        }
                    }
                    consulta +=" ORDER BY IDPhoto DESC";
                    console.log(consulta);


                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}

controller.get_movimientosusuarios = async (req, res) => {
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
                    var usuario=req.body.usuario;
                    var texto=req.body.texto;
                    var fecha=req.body.fecha;
                    var count=0;
                    var consulta = "select TOP 2000 * from _Movimientos ";
                    if(usuario !== ""){
                        consulta+= "WHERE usuario = '"+usuario+"' ";
                        count++;
                    }
                    if(fecha !== ""){
                        if(count === 0){
                            consulta+="WHERE CAST(hora AS date)='"+fecha+"' ";
                            count++;
                        }else{
                            consulta+="AND CAST(hora AS date)='"+fecha+"' ";
                        }
                    }
                    if(texto !== ""){
                        if(count === 0){
                            consulta+="WHERE id_row LIKE '%"+texto+"%' ";
                            count++;
                        }else{
                            consulta+="AND id_row LIKE '%"+texto+"%' ";
                        }
                    }
                    consulta +=" ORDER BY id_movivmiento DESC";
                    console.log(consulta);


                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}
module.exports = controller;
