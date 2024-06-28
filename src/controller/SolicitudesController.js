const controller = {}
const jwt = require('jsonwebtoken');
const axios = require('axios');
var sqlconfig = require("../model/dbpool");

controller.get_Solicitudes = async (req, res) => {
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
                    var consulta= "SELECT IDSolicitudes, PlacaTruck, NombreInstalador, NombreEmpresa, CASE when FechaHoraCita < '2012-01-01 00:00:00.000'"
                    +" THEN 'Hora-Nula Fecha-Nula' else CONVERT(nvarchar(30), FechaHoraCita, 120) end AS Hora, s.FKLokEstados , DescripcionRuta + '' + CASE WHEN n.FKLokClienteExt = 0 THEN '' ELSE '( ' + x.Descripcion + ' )' END AS Ruta, u.FKLokCiudadOrigen, "
                    +" ContainerNum + CASE WHEN DigitoVerificacion IS NOT NULL THEN '-' + CAST(DigitoVerificacion AS nvarchar(2)) ELSE '' END AS Contenedor,Contacto, DATEDIFF(MINUTE, GETUTCDATE(), DATEADD(hh, 5, FechaHoraCita)) AS Tiempo, r.NotaReporte as nota, e.Descripcion as estado, HoraReporte as hora_e"
                    +" FROM LokSolicitudes s INNER JOIN ICEmpresa m ON s.FKICEmpresa = m.IdEmpresa"
                    +" INNER JOIN LokNegociacion n ON FKNegociacion = IDNegociacion"
                    +" LEFT OUTER JOIN ICRutas u ON s.FKICRutas = u.IDRuta"
                    +" LEFT JOIN LokClienteExt x ON x.IdClienteExterno = n.FKLokClienteExt"
                    +" LEFT JOIN LokInstaladores i ON i.CCInstalador = s.FKInstaladorId"
                    +" LEFT JOIN LokReporteSolicitudes r ON s.LastReport = r.idReporteSolicitud"
                    +" LEFT JOIN LokEstados e ON r.FKLokEstados = e.IDEstados"
                    +" WHERE(s.FKLokEstados = 2 OR s.FKLokEstados = 7)";
                    if(decoded.idempresa != 2){
                        consulta += " AND s.FKICEmpresa = " + decoded.idempresa;
                    }
                    consulta += " ORDER BY FechaHoraCita";
                    console.log(decoded.idempresa);
                    console.log(consulta);
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.delete_solicitud = async (req, res) => {
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
                        "idsolicitud": req.body.idsolicitud,
                        "causal": req.body.causal,
                        "usuario": decoded.username,
                        "adress": '',
                    };
                    let resultado=await sqlconfig.queryProcedure('AnularSolicitud', data);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

//generar numero solicitud
controller.get_numerosolicitudnuevo = async (req, res) => {
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
                    var consulta= "SELECT TOP 1 IDSolicitudes FROM LokSolicitudes ORDER BY IDSolicitudes desc";
                    let resultado=await sqlconfig.query(consulta);
                    var array=resultado.recordsets[0];
                    let ultimoIDSolicitud=array[0].IDSolicitudes;
                    let numero = parseInt(ultimoIDSolicitud.slice(4)) + 1;
                    let nuevoIDSolicitud = `SOL-${numero.toString().padStart(8, '0')}`;
                    console.log(nuevoIDSolicitud);
                    res.json({success : true, data : nuevoIDSolicitud});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_rutassolicitudesciudadorigen = async (req, res) => {
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
                    var consulta= "SELECT DISTINCT ICRUTAS.FKLOKCIUDADORIGEN AS ID, LOKCIUDADES.NOMBRECIUDAD AS NOMBRE "
                    + "FROM LOKSOLICITUDES INNER JOIN ICRUTAS ON LOKSOLICITUDES.FKICRUTAS = ICRUTAS.IDRUTA  "
                    + "LEFT JOIN LOKCIUDADES ON ICRUTAS.FKLOKCIUDADORIGEN = LOKCIUDADES.IDCIUDAD "
                    + "WHERE FKLOKESTADOS = 2";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}
//categoria servicios
controller.get_categoriasservicios = async (req, res) => {
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
                    var consulta= "SELECT IdCategoriaServ, CategoriaServ FROM LokCategoriaServ ORDER BY CategoriaServ";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}
//clientes
controller.get_listaempresas = async (req, res) => {
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
                    var formulario="completo";
                    var consulta= "SELECT DISTINCT IdEmpresa, NombreEmpresa FROM ICEmpresa WHERE FKLokProyectoEmpresa ="+decoded.proyecto+" ORDER BY NombreEmpresa";
                    console.log("empresa seleccionada: "+decoded.idempresa);
                    if(decoded.idempresa !== 2){
                        consulta= "SELECT DISTINCT IdEmpresa, NombreEmpresa FROM ICEmpresa WHERE IdEmpresa="+decoded.idempresa;
                        formulario="reducido";
                    }
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0], formulario: formulario});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}
//tranpostadora
controller.get_listatransportadoras = async (req, res) => {
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
                    var consulta= "SELECT IdTransportadora, NombreTranspo FROM ICTransportadora WHERE proyectoTransportadora = "+decoded.proyecto+" ORDER BY NombreTranspo";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

//rutas
controller.get_listaRutasNegociadas = async (req, res) => {
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
                    var empresa=req.body.empresa;
                    var consulta= "SELECT DISTINCT FKICRuta, DescripcionRuta "+
                    "FROM LokNegociacion INNER JOIN ICRutas ON LokNegociacion.FKICRuta = ICRutas.IdRuta "+
                    "LEFT OUTER JOIN LokTipoServicios ON LokNegociacion.FKLokTipoServicio = LokTipoServicios.IDTipoServicios "+
                    "WHERE FKICEmpresa ="+empresa+" ORDER BY DescripcionRuta";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_listaNegociaciones = async (req, res) => {
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
                    var empresa=req.body.empresa;
                    var ruta=req.body.ruta;
                    var consulta= "SELECT DISTINCT IdClienteExterno, Descripcion "+
                    "FROM LokNegociacion INNER JOIN LokClienteExt ON LokNegociacion.FKLokClienteExt = LokClienteExt.IdClienteExterno "+
                    "WHERE FKICEmpresa = "+empresa+" and FKICRuta = "+ruta;
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}
//unidades de carga
controller.get_listaUnidadCarga = async (req, res) => {
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
                    var consulta= "SELECT TipoUnidadCargaID, DescripcionTipoCarga FROM LokTipoUnidadCarga ORDER BY DescripcionTipoCarga";
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
//destinos autorizados
controller.get_listaGeocercasEmpresa = async (req, res) => {
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
                    var empresa=req.body.empresa;
                    var consulta="";
                    if(empresa === 0){
                        consulta= "SELECT Nombre, ID FROM GeoCercas WHERE FKProyecto = "+decoded.proyecto+" ORDER BY Nombre";
                    }else{
                        consulta= "SELECT Nombre, ID FROM LokCercaEmpresa INNER JOIN ICEmpresa  ON FKICEmpresa = IdEmpresa INNER JOIN GeoCercas ON"
                        +" ID = FKLokCerca WHERE IdEmpresa = "+empresa
                        +" ORDER BY GeoCercas.Nombre";
                    }
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
//instalador
controller.get_listaInstaladores = async (req, res) => {
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
                    var consulta="SELECT CCInstalador, NombreInstalador FROM LokInstaladores ORDER BY NombreInstalador";
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
//tipo servicio
controller.get_tiposervicio = async (req, res) => {
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
                    var ruta=req.body.ruta;
                    var empresa=req.body.empresa;
                    var consulta="SELECT IDNegociacion, Descripcion + CASE WHEN Notas <> '' THEN ', ' + Notas ELSE '' END as Descripcion "
                    +"FROM LokNegociacion INNER JOIN LokTipoServicios ON LokNegociacion.FKLokTipoServicio = LokTipoServicios.IDTipoServicios "
                    +"WHERE FKICEmpresa = "+empresa+" and FKICRuta = "+ruta+" AND Activo = 1 ORDER BY Descripcion";
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
//para rellenar informacion vehiculo
controller.get_obtenerVehiculo = async (req, res) => {
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
                    var placa=req.body.placa;
                    var consulta="SELECT IdLokVehiculo, Placa, Marca, Color, Linea, Modelo "
                    +"FROM LokVehiculos WHERE Placa = '" + placa + "'";
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

controller.set_insertSolicitud = async (req, res) => {
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
                        "IDSolicitudes": 0,
                        "FKICEmpresa": req.body.FKICEmpresa,
                        "Ref": req.body.Ref,
                        "ContainerNum": req.body.ContainerNum,
                        "DigitoVerificacion": req.body.DigitoVerificacion,
                        "FKInstaladorId": req.body.FKInstaladorId,
                        "Notas": req.body.Notas,
                        "NombreConductor": req.body.NombreConductor,
                        "NitConductor": req.body.NitConductor,
                        "MovilConductor": req.body.MovilConductor,
                        "FKLokTipoUnidadCarga": req.body.FKLokTipoUnidadCarga,
                        "PlacaTruck": req.body.PlacaTruck,
                        "ColorTruck": req.body.ColorTruck,
                        "PlacaTrailer": req.body.PlacaTrailer,
                        "NombreEscolta": req.body.NombreEscolta,
                        "MovilEscolta": req.body.MovilEscolta,
                        "FKLokCategoriaServ": req.body.FKLokCategoriaServ,
                        "NotasTI": req.body.NotasTI,
                        "Marca": req.body.Marca,
                        "FKICTransportadora": req.body.FKICTransportadora,
                        "FKICEmpresaConsulta": req.body.FKICEmpresaConsulta,
                        "bitRestriccion": req.body.bitRestriccion,
                        "HoraInicioR": req.body.HoraInicioR,
                        "HoraFinR": req.body.HoraFinR,
                        "FKICEmpresaConsulta2": req.body.FKICEmpresaConsulta2,
                        "FKLokEstados": req.body.FKLokEstados,
                        "FechaHoraCita": req.body.FechaHoraCita,
                        "FechaHoraCitaDescargue": req.body.FechaHoraCitaDescargue,
                        "NotasDatosEntrega": req.body.NotasDatosEntrega,
                        "UserSolicitud": req.body.UserSolicitud,
                        "FKNegociacion": req.body.FKNegociacion,
                        "Solicitante": req.body.Solicitante,
                        "Contacto": req.body.Contacto,
                        "FKCercaAutorizada": req.body.FKCercaAutorizada
                    };
                    console.log(data);
                    let resultado=await sqlconfig.queryProcedure('InsertSolicitud2', data);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

//Estados
controller.get_listaEstadosSolicitudes = async (req, res) => {
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
                    var consulta="SELECT IDEstados, Descripcion FROM LokEstados WHERE Tipo = 'T' ORDER BY Descripcion";
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

//ver solicitud
controller.get_obtenerSolicitud = async (req, res) => {
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
                    var id=req.body.id;
                    var consulta="SELECT IDSolicitudes, bitRestriccion, LokNegociacion.HoraInicioR, LokNegociacion.HoraFinR, LokSolicitudes.FKICEmpresa, FKICEmpresaConsulta, FKICEmpresaConsulta2, FKICEmpresaConsulta3, Ref, PlacaTruck, ColorTruck, PlacaTriler, NombreConductor, NitConductor, FKInstaladorId, "
                    +" MovilConductor, ContainerNum, FKLokCercaAutorizada, LokSolicitudes.Notas, LokSolicitudes.DigitoVerificacion, FKLokTipoUnidadCarga, Contacto, NombreEscolta, MovilEscolta, NotasTI, FKLokCategoriaServ, Marca, FKICTransportadora, FKLokEstados, "
                    +" FechaHoraSolicitud, CASE when FechaHoraCita < '2012-01-01 00:00:00.000' then 'Hora-Nula Fecha-Nula' else CONVERT(nvarchar(30), FechaHoraCita, 120) end AS Hora, CASE when FechaHoraCitaDescargue is null or FechaHoraCitaDescargue < '2012-01-01 00:00:00.000' then 'Hora-Nula Fecha-Nula' else CONVERT(nvarchar(30), FechaHoraCitaDescargue, 120) end AS HoraCita, "
                    +" NotasDatosEntrega, UserSolicitud, FKNegociacion, Solicitante, FKICRutas, LokClienteExt.IdClienteExterno, bitMostrarCritico"
                    +" FROM LokSolicitudes INNER JOIN LokNegociacion ON FKNegociacion = IDNegociacion  LEFT JOIN LokClienteExt ON FKLokClienteExt = IdClienteExterno WHERE IDSolicitudes = '" + id + "'";
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

module.exports = controller;
