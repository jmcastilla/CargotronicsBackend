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
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var consulta="SELECT * FROM ICRutas WHERE FKProyecto="+decoded.proyecto+" ORDER BY DescripcionRuta";
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

controller.set_insertruta = async (req, res) => {
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
                    var lator =req.body.latorigen;
                    var lngor =req.body.lngorigen;
                    var latds =req.body.latdestino;
                    var lngds =req.body.lngdestino;
                    var kms = await distanciaXYMetod(lator, lngor, latds, lngds);
                    let data = {
                        "DescripcionRuta":req.body.DescripcionRuta,
                        "kmsRuta": kms,
                        "Latcenter": null,
                        "Longcenter": null,
                        "ZoomLevel": null,
                        "FKLokCiudadOrigen": req.body.FKLokCiudadOrigen,
                        "FKLokCiudadDestino": req.body.FKLokCiudadDestino,
                        "Proyecto": decoded.proyecto
                    };
                    console.log(data);
                    let resultado=await sqlconfig.queryProcedure('ICInsertRutas', data);
                    console.log(resultado);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.set_updateruta = async (req, res) => {
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
                    var lator =req.body.latorigen;
                    var lngor =req.body.lngorigen;
                    var latds =req.body.latdestino;
                    var lngds =req.body.lngdestino;
                    var kms = await distanciaXYMetod(lator, lngor, latds, lngds);
                    let data = {
                        "IdRuta": req.body.IdRuta,
                        "DescripcionRuta":req.body.DescripcionRuta,
                        "kmsRuta": kms,
                        "Latcenter": null,
                        "Longcenter": null,
                        "ZoomLevel": null,
                        "FKLokCiudadOrigen": req.body.FKLokCiudadOrigen,
                        "FKLokCiudadDestino": req.body.FKLokCiudadDestino,
                        "Proyecto": decoded.proyecto
                    };
                    console.log(data);
                    let resultado=await sqlconfig.queryProcedure('ICUpdateRutas', data);
                    console.log(resultado);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}


controller.get_transportadoras = async (req, res) => {
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
                    var consulta="SELECT IdTransportadora, NombreTranspo, AliasTranspo FROM ICTransportadora WHERE proyectoTransportadora="+decoded.proyecto+" ORDER BY NombreTranspo";
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
                    if(req.body.id == -1){
                        var consulta = "INSERT INTO ICTransportadora (NombreTranspo, AliasTranspo, proyectoTransportadora) VALUES ("+
                        "'"+req.body.nombre+"','"+req.body.alias+","+decoded.proyecto+")";

                        res.json({success : true, data : await sqlconfig.query(consulta)});
                    }else{
                        try{
                            var consulta = "UPDATE ICTransportadora SET NombreTranspo='"+req.body.nombre+"', AliasTranspo='"+req.body.alias+"' WHERE IdTransportadora="+req.body.id;
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
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var consulta="SELECT IDCiudad, NombreCiudad from LokCiudades where FKLokProyecto ="+decoded.proyecto+" ORDER BY NombreCiudad";
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

controller.get_geocercas = async (req, res) => {
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
                    var consulta="SELECT ID, Nombre, Vertices, Descripcion, FKCatGeoCerca from GeoCercas where FKProyecto ="+decoded.proyecto+" and Ciudad=0 ORDER BY Nombre";
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

controller.get_locationciudad = async (req, res) => {
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
                    var consulta="SELECT Latitud, Longitud FROM LOKCIUDADES WHERE IDCIUDAD ="+req.body.ciudad;
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

controller.get_propietario = async (req, res) => {
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
                    var consulta="SELECT IdPropietario, NombrePropietario, EmailPropietario, CelularPropietario FROM CtPropietarios ORDER BY NombrePropietario";
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

controller.set_propietario = async (req, res) => {
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
                    if(req.body.id == -1){
                        var consulta = "INSERT INTO CtPropietarios (NombrePropietario, EmailPropietario, CelularPropietario) VALUES ("+
                        "'"+req.body.NombrePropietario+"','"+req.body.EmailPropietario+"','"+req.body.CelularPropietario+"')";
                        console.log(consulta);
                        res.json({success : true, data : await sqlconfig.query(consulta)});
                    }else{
                        try{
                            var consulta = "UPDATE CtPropietarios SET NombrePropietario='"+req.body.NombrePropietario+"', EmailPropietario='"+req.body.EmailPropietario+"', CelularPropietario='"+req.body.CelularPropietario+"' WHERE IdPropietario="+req.body.id;
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

controller.get_vehiculos = async (req, res) => {
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
                    var consulta="SELECT idLokVehiculo, Placa, Color, Marca, Linea, Modelo, FkOperadorGPS, FkPropietario FROM LokVehiculos ORDER BY idLokVehiculo";
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

controller.set_vehiculo = async (req, res) => {
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
                    if(req.body.id == -1){
                        var consulta = "INSERT INTO LokVehiculos (Placa, Color, Marca, Linea, Modelo, FkOperadorGPS, FkPropietario) VALUES ("+
                        "'"+req.body.Placa+"','"+req.body.Color+",'"+req.body.Marca+"','"+req.body.Linea+"','"+req.body.Modelo+"',"+req.body.FkOperadorGPS+","+req.body.FkPropietario+")";

                        res.json({success : true, data : await sqlconfig.query(consulta)});
                    }else{
                        try{
                            var consulta = "UPDATE LokVehiculos SET Placa='"+req.body.Placa+"', Color='"+req.body.Color+"', Marca='"+req.body.Marca+"', Linea='"+req.body.Linea+"', Modelo='"+req.body.Modelo+"', FkOperadorGPS="+req.body.FkOperadorGPS+", FkPropietario="+req.body.FkPropietario+" WHERE idLokVehiculo="+req.body.id;
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

controller.get_operadorgps = async (req, res) => {
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
                    var consulta="SELECT IdOperadorGPS, OperadorGPS, FkCtPaises, urlOperador FROM CtOperadorGPS ORDER BY IdOperadorGPS";
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

controller.get_paises = async (req, res) => {
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
                    var consulta="SELECT IdPais, NombrePais FROM CtPaises ORDER BY NombrePais";
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

async function distanciaXYMetod(latitud1, longitud1, latitud2, longitud2) {
    const degtorad = 0.01745329;
    const radtodeg = 57.29577951;

    const lat1 = parseFloat(latitud1) * degtorad;
    const lon1 = parseFloat(longitud1) * degtorad;
    const lat2 = parseFloat(latitud2) * degtorad;
    const lon2 = parseFloat(longitud2) * degtorad;

    const P = Math.sin(lat1) * Math.sin(lat2) +
              Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2);

    const D = Math.acos(P) * radtodeg;
    const T = D * 111.302;

    return T;
}



module.exports = controller;
