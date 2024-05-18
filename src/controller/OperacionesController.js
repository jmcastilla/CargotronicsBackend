const controller = {}
const jwt = require('jsonwebtoken');
const axios = require('axios');
var sqlconfig = require("../model/dbpool");
﻿var Poly = require("node-geometry-library");
var GoogleMapsAPI = require('../lib/index');
const API_KEY = 'AIzaSyAF-lo1H_DaXWarJqU1sF1l0cil68y0ANQ';
const decodePolyline = require('decode-google-map-polyline');
const moment = require('moment');


var publicConfig = {
  key: API_KEY,
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true
};
var gmAPI = new GoogleMapsAPI(publicConfig);

// FUNCION QUE RETORNA EL LISTADO DE CONTRATOS HISTORICOS ENTRE UN RANGO DE FECHA
controller.list_historicos = async (req, res) => {
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
                    var desde=req.body.desde;
                    var hasta=req.body.hasta;
                    var placa=req.body.placa;
                    var empresa=req.body.empresa;

                    var consulta= "SELECT ContractID, FKLokDeviceID, e.NombreEmpresa, c.PlacaTruck, '"+decoded.username+"' as username, "+
                    "CONVERT(varchar,DATEADD(MINUTE,0,c.FechaHoraInicio),20) as fecha, CONCAT(c.LastMsgLat,',',c.LastMsgLong) as pos, "+
                    "ISNULL(c.FKTrayecto, 0) as trayecto, r.DescripcionRuta, t.DescripcionTrayecto, c.ContainerNum, c.NombreConductor, "+
                    "c.Ref, tp.NombreTranspo, c.MovilConductor, c.PlacaTrailer, CONVERT(varchar,DATEADD(minute,0,c.FechaHoraInicio),20) as fechainicio, "+
                    "ISNULL(CONVERT(varchar,DATEADD(minute,0,c.FechaHoraFin),20), CONVERT(varchar,DATEADD(minute,"+decoded.diffhorario+",GETDATE()),20)) as fechafin, c.LastMsgLat, c.LastMsgLong, c.Active, d.Locked, ISNULL(t.DistanciaReal,0) as DistanciaCompleta, t.Origen, d.FKLokTipoEquipo "+
                    "FROM LokcontractID as c "+
                    "INNER JOIN LokDeviceID as d ON d.DeviceID = c.FKLokDeviceID "+
                    "LEFT JOIN ICEmpresa as e ON e.IdEmpresa = c.FKICEmpresa "+
                    "LEFT JOIN ICRutas as r ON r.IdRuta = c.FKICRutas "+
                    "LEFT JOIN Trayectos as t ON c.FKTrayecto =  t.IDTrayecto "+
                    "LEFT JOIN ICTransportadora as tp ON tp.IdTransportadora = c.FKICTransportadora "+
                    "WHERE c.FKLokProyecto="+decoded.proyecto +" AND c.FechaHoraFin BETWEEN '"+desde+"' AND '"+hasta+"' AND c.PlacaTruck LIKE'%"+placa+"%'";
                    if(empresa != 0){
                      consulta+=" AND e.IdEmpresa="+empresa;
                    }
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA EL LISTADO DE TRAYECTOS
controller.get_eventos = async (req, res) => {
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
                    var consulta= "SELECT ID_Evento, Descripcion FROM Valitronics_eventos WHERE FK_Proyecto="+decoded.proyecto;
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA EL LISTADO DE TRAYECTOS
controller.get_roles = async (req, res) => {
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
                  var consulta= "SELECT IDRol, NombreRol FROM LokRoles";
                  let resultado=await sqlconfig.query(consulta);
                  res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA EL LISTADO DE TRAYECTOS
controller.get_usuarios = async (req, res) => {
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
                    var consulta= "SELECT idUser, FKICEmpresa, FKProyecto, tipoUser, r.IDRol, e.NombreEmpresa, "+
                    "r.NombreRol, p.Descripcion, rt.descr_roltrafico, rt.id_roltrafico FROM ICUsers as u "+
                    "INNER JOIN LokProyectos as p on p.IDProyecto=u.FKProyecto "+
                    "LEFT JOIN LokRoles as r on r.IDRol=u.tipoUser "+
                    "LEFT JOIN LokRolTrafico as rt on rt.id_roltrafico=u.RolTrafico "+
                    "LEFT JOIN ICEmpresa as e on e.IdEmpresa=u.FKICEmpresa "+
                    "WHERE Activo=1";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA EL LISTADO DE TRAYECTOS
controller.get_trayectos = async (req, res) => {
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
                    console.log(decoded);
                    var consulta= "SELECT * FROM Trayectos WHERE FKLokProyecto="+decoded.proyecto+" ORDER BY DescripcionTrayecto;";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA EL SECRET KEY DE LA APLICACION
controller.get_keyApp = async (req, res) => {
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
                    var consulta= "SELECT KEYWS FROM LokConfiguracion WHERE ID=1;";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset, user:decoded.username});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

// FUNCION QUE ACTUALIZAR EL TRAYECTO EN EL CONTRATO
controller.update_contratotrayectos = async (req, res) => {
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
                    var consulta = "UPDATE LokcontractID SET FKTrayecto='"+req.body.Trayecto+"', actualizarbk=2 WHERE ContractID='"+req.body.Contrato+"'";
                    res.json({success : await sqlconfig.query(consulta)});
                }
            });
        }
    }catch(error){
        res.json({success : false});
    }
}

// FUNCION QUE RETORNA EL LISTADO DE CONTRATOS ACTIVOS, GRILLA DE TRAFICO
controller.get_contratostrafico = async (req, res) => {
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
                    var consulta= "SELECT c.ContractID, c.FKLokDeviceID, e.NombreEmpresa, c.PlacaTruck, '"+decoded.username+"' as username, "+
                    "CONVERT(varchar,DATEADD(MINUTE,0,c.FechaHoraInicio),20) as fecha, CONCAT(c.LastMsgLat,',',c.LastMsgLong) as pos, "+
                    "ISNULL(c.FKTrayecto, 0) as trayecto, r.DescripcionRuta, t.DescripcionTrayecto, c.NombreConductor, "+
                    "CASE WHEN c.ContainerNum IS NULL OR c.ContainerNum = 'ND' THEN (LEFT(c.Documento, 35) + CASE WHEN LEN(c.Documento) > 35 THEN '...' ELSE '' END) ELSE c.ContainerNum END as ContainerNum, "+
                    "c.Ref, tp.NombreTranspo, c.MovilConductor, c.PlacaTrailer, CONVERT(varchar,DATEADD(minute,0,c.FechaHoraInicio),20) as fechainicio, "+
                    "ISNULL(CONVERT(varchar,DATEADD(minute,0,c.FechaHoraFin),20), CONVERT(varchar,DATEADD(minute,"+decoded.diffhorario+",GETDATE()),20)) as fechafin, c.LastMsgLat, c.LastMsgLong, "+
                    "d.Locked, c.Active, ISNULL(t.DistanciaReal,0) as DistanciaCompleta, t.Origen, d.FKLokTipoEquipo, "+
                    "dbo.Tiempo(DATEDIFF(SECOND, LoksysServerTime, GETUTCDATE())) as Tiempo, DATEDIFF(SECOND, '1970-01-01 00:00:00', LoksysServerTime) as tiempoUnix, "+
                    "dbo.iconbateria(ISNULL(ROUND(BatteryVoltage, 2),3)) as icon_bat, ROUND(BatteryVoltage, 2) as bateria, "+
                    "c.LastReportNota, tr.TipoReporte, c.LastReportUbica+ ' ('+CONVERT(NVARCHAR(20), DATEDIFF(MINUTE, LastReportTime, DATEADD(MINUTE,"+decoded.diffhorario+", GETDATE())))+' min)' as LastReportUbica, "+
                    "d.Ciudad+': '+d.Location+ CASE WHEN ContadorGps <> 0 THEN ' ('+CONVERT(NVARCHAR(20), ContadorGps)+')' ELSE '' END as Ciudad, "+
                    "DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()) + "+decoded.diffhorario+", LoksysServerTime) as LoksysServerTime, "+
                    //"c.LastReportNota, tr.TipoReporte, (CASE d.Moving WHEN 1 THEN '/images/moving.png' ELSE '/images/stop.png' END) as IconMoving, "+
                    //"(CASE d.Locked WHEN 1 THEN '/images/closedpadlock.png' ELSE '/images/openedpadlock.png' END) as IconLocked2, "+
                    "SUBSTRING(iconos.IconMoving, 2, CHARINDEX('|', iconos.IconMoving) - 2) AS IconMoving, "+
                    "SUBSTRING(iconos.IconLocked, 2, CHARINDEX('|', iconos.IconLocked) - 2) AS IconLocked, "+
                    "SUBSTRING(iconos.IconDesvio, 2, CHARINDEX('|', iconos.IconDesvio) - 2) AS IconDesvio, "+
                    "SUBSTRING(iconos.IconSeguro, 2, CHARINDEX('|', iconos.IconSeguro) - 2) AS IconSeguro, "+
                    "SUBSTRING(iconos.IconBack, 2, CHARINDEX('|', iconos.IconBack) - 2) AS IconBack, "+
                    "CAST(CASE WHEN c.Active=1 THEN 0 ELSE 1 END AS BIT) AS expanded "+
                    //"CASE WHEN Verificado_global=1 AND FKQrMaestro IS NOT NULL THEN '/images/valitronics.png' "+
                    //"WHEN Verificado_global=0 AND FKQrMaestro IS NOT NULL THEN '/images/valitronics_gris.png' "+
                    //"ELSE '/images/transparent.png' END as IconValitronics "
                    "FROM LokcontractID as c "+
                    "INNER JOIN LokDeviceID as d ON d.DeviceID = c.FKLokDeviceID "+
                    "LEFT JOIN ICEmpresa as e ON e.IdEmpresa = c.FKICEmpresa "+
                    "LEFT JOIN ICRutas as r ON r.IdRuta = c.FKICRutas "+
                    "LEFT JOIN Trayectos as t ON c.FKTrayecto =  t.IDTrayecto "+
                    "LEFT JOIN ICTipoReporte as tr ON c.LastICTipoReporte =  tr.IdTipoReporte "+
                    "LEFT JOIN ICTransportadora as tp ON tp.IdTransportadora = c.FKICTransportadora "+
                    "LEFT JOIN QR_Maestro as qr ON c.FKQrMaestro = qr.ID_QRMaestro "
                    "OUTER APPLY dbo.IconosContract(c.ContractID, c.FKLokDeviceID) AS iconos ";
                    if(decoded.roltrafico != 0){
                        consulta+="INNER JOIN (SELECT * FROM LokEmpresaRol WHERE id_roltrafico_ = "+decoded.roltrafico+") as Rol ON Rol.id_empresa = c.FKICEmpresa ";
                    }
                    consulta+="WHERE c.Active=1 AND c.FKLokProyecto="+decoded.proyecto;
                    if(decoded.proyecto == 1){
                        consulta+=" AND c.FKICEmpresa IS NOT NULL ";
                    }
                    if(decoded.idempresa != decoded.empresaprincipal && decoded.proyecto == decoded.owner){
                        consulta+=" AND (c.FKICEmpresa = "+decoded.idempresa+
                        " OR c.FKICEmpresaConsulta = "+decoded.idempresa+
                        " OR c.FKICEmpresaConsulta2 = "+decoded.idempresa+
                        " OR c.FKICEmpresaConsulta3 = "+decoded.idempresa+
                        " OR e.Owner = "+decoded.idempresa+") ";
                    }
                    consulta+="ORDER BY d.Locked ASC, bitAperturaRespo ASC, bitBackRespo ASC, bitAlejadoRespo ASC, bitDesvioRespo ASC, bitDetencionRespo ASC, bitGpsRespo ASC, bitTiempoRespo ASC, d.LoksysServerTime";
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

// FUNCION QUE RETORNA EL LISTADO DE CONTRATOS ACTIVOS, GRILLA DE TRAFICO
controller.get_reportesdevice = async (req, res) => {
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
                    let m = moment();
                    m.add(decoded.diffhorario, 'minutes');
                    var datos={
                      "fechainicio": req.body.fechainicio,
                      "fechafin":m.format('YYYY-MM-DD HH:mm:ss'),
                      "device": req.body.device,
                      "utcMinutos": decoded.diffUTC,
                      "allreport": req.body.allreport
                    }
                    if(req.body.tipo == 0){
                        datos={
                          "fechainicio": req.body.fechainicio,
                          "fechafin":req.body.fechafin,
                          "device": req.body.device,
                          "utcMinutos": decoded.diffUTC,
                          "allreport": req.body.allreport
                        }
                    }
                    var procedure="SelectJ701TrackMsg2"
                    if(req.body.tipoequipo == 1){
                        procedure="SelectWSLoksysMsg";
                    }else if(req.body.tipoequipo == 2){
                        procedure="SelectWLMsg";
                    }else if(req.body.tipoequipo == 3){
                        procedure="SelectEnvotechMsg";
                    }else if(req.body.tipoequipo == 6){
                        procedure="SelectCellTrackMsg";
                    }else if(req.body.tipoequipo == 7){
                        procedure="SelectNuevoMsg";
                    }else if(req.body.tipoequipo == 10){
                        procedure="SelectJT707TrackMsg";
                    }
                    let resultado=await sqlconfig.query2Procedure(procedure, datos);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

// FUNCION QUE RETORNA EL LISTADO DE CONTRATOS ACTIVOS, GRILLA DE TRAFICO
controller.get_fotoscontrato = async (req, res) => {
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
                    var contrato=req.body.contrato;
                    var tipo = req.body.tipo || ".jpg";
                    tipo = (tipo === "vid") ? ".mp4" : ".jpg";
                    var consulta= "SELECT * from dbo.Photos('"+contrato+"')";
                    let resultado=await sqlconfig.query(consulta);
                    console.log(resultado.recordsets[0]);
                    let archivos = resultado.recordsets[0].filter(item => item.photo.includes(tipo));
                    return res.json({success : true, data : archivos});
                }
            });
        }
    }catch(err){
        return res.json({success : false});
    }
}

// FUNCION QUE RETORNA EL LISTADO DE REPORTES DE TRAFICO DE UN CONTRATO
controller.get_reportestrafico = async (req, res) => {
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
                    var contrato=req.body.contrato;
                    var consulta= "SELECT r.IdReport, r.XTime, ta.TipoAccion, tr.TipoReporte, r.Ubicacion, r.Nota, r.XUser from LokReport as r "+
                    "INNER JOIN LokTipoAccion as ta ON ta.IdTipoAccion = r.FKLokTipoAccion "+
                    "INNER JOIN ICTipoReporte as tr ON tr.idTipoReporte = r.FKICTipoReporte "+
                    "WHERE r.FKLokContractID='"+contrato+"'";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA EL LISTADO DE REPORTES DE TRAFICO DE UN CONTRATO
controller.get_reportescontroldevice = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var proyecto=decoded.proyecto;
                    var idcliente=decoded.empresaprincipal;
                    var utcServidor=decoded.diffhorario;
                    var filtro=req.body.filtro;
                    var orden1=req.body.orden1;
                    var orden2=req.body.orden2;
                    var consulta = "SELECT DeviceID, dbo.UltimoContrato(DeviceID) As UltContrato, ICRutas.DescripcionRuta AS Ruta, NombreEmpresa AS Cliente, LokDeviceIDEstado.Descripcion AS Estado, ISNULL(ROUND(BatteryVoltage, 2),3) AS voltage, dbo.iconbateria(ISNULL(ROUND(BatteryVoltage, 2),3)) AS icon_bat, Apn1, Apn2, ";
                    consulta += "dbo.Tiempo(DATEDIFF(SECOND, LoksysServerTime, GETUTCDATE())) AS Tiempo, dbo.Tiempo(DATEDIFF(SECOND, DATEADD(MINUTE, -" + utcServidor + ", PositionTime), UltActualizacionDevice)) as Diff,  DATEADD(MINUTE, -" + utcServidor + ", PositionTime) AS ";
                    consulta += " eventDateTime,  UltActualizacionDevice AS LastSaved, Ciudad + ', ' + Departamento AS Position, ISNULL(UltServer, '-') AS UltServer, ";
                    consulta += " ISNULL(operador+'('+CAST(mcc AS NVARCHAR(4))+')','Desconocido('+CAST(UltMccc AS NVARCHAR(4))+')')AS Compania, CASE WHEN FKLokTipoEquipo in (select t.idtipoequipo from loktipoequipo t where mostrar = 1) ";
                    consulta += " THEN 'controldevice.aspx?device='+DeviceID ELSE '#' END AS url, ISNULL(Linea1, '-') AS LApn1, ISNULL(Linea2, '-') AS LApn2, ";
                    consulta += "FW, ConfigDevice, CASE WHEN Active = 0 THEN 0 ELSE ROUND(ISNULL(VoltageInit, 0), 2, 0) END AS VoltageInit, CASE WHEN Active = 0 THEN '-' ELSE dbo.Tiempo6(DATEDIFF(MI, InicioServicio, DATEADD(HH, 2, GETDATE()))) END AS HorasViaje, ";
                    consulta += "CASE WHEN Active = 0 THEN 0 ELSE ISNULL(CantReportes,0) END AS CantReportes, CASE WHEN Active = 0 THEN 0 ELSE CASE WHEN ISNULL(CantReportes,0) <> 0 THEN CantReportes / (CASE WHEN DATEDIFF(HH, InicioServicio, DATEADD(HH, 2, GETDATE())) = 0 THEN 1 ELSE DATEDIFF(HH, InicioServicio, DATEADD(HH, 2, GETDATE())) END) ELSE 0 END END AS RepxHora,";
                    consulta += "CASE WHEN Active = 0 THEN 0 ELSE CASE WHEN(ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1)) < 0 THEN 0 ELSE ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1) END END AS DeltaBateria, ";
                    consulta += "CASE WHEN Active = 0 THEN 0 ELSE CASE WHEN (ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1)) <= 0 THEN 0 ELSE ROUND(ROUND((CASE WHEN  DATEDIFF(HH, InicioServicio, DATEADD(HH, 2, GETDATE())) = 0 THEN 1 ELSE DATEDIFF(HH, InicioServicio, DATEADD(HH, 2, GETDATE())) END) ,2,1)/ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1),0,1) END END AS HoraxVolt, ";
                    consulta += "CASE WHEN Active = 0 THEN 0 ELSE CASE WHEN(ISNULL(CantReportes, 0) = 0) OR((ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1)) <= 0) THEN 0 ELSE ROUND(ISNULL(CantReportes, 0) / ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1), 0, 1) END END AS ReporxVolt, ";
                    consulta += " ROUND(CASE WHEN Active = 0 THEN 0 ELSE CASE WHEN (ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1)) <= 0 THEN 0 ELSE ROUND(ROUND((CASE WHEN  DATEDIFF(HH, InicioServicio, DATEADD(HH, 2, GETDATE())) = 0 THEN 1 ELSE DATEDIFF(HH, InicioServicio, DATEADD(HH, 2, GETDATE())) END) ,2,1)/ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1),0,1) END END * (((CASE WHEN Active = 0 THEN 0 ELSE ROUND(ISNULL(VoltageInit, 0), 2, 0) END) - 3.5)/24), 1) AS ProyBat ";
                    consulta += " FROM LokDeviceID INNER JOIN LokProyectos ON IdProyecto = LokDeviceId.FKLokProyecto LEFT JOIN LokMcccPais ON cod_pais = FKPais and UltMccc = mcc LEFT JOIN LokContractID ON LokDeviceID.LastContractID = ContractID LEFT JOIN ICEmpresa ON FKICEmpresa = IdEmpresa LEFT JOIN ICRutas ON IdRuta = FKICRutas  INNER JOIN LokDeviceIDEstado ON Estado = IDEstado WHERE FKLokTipoEquipo <> 1 AND FKLokTipoEquipo <> 4 ";
                    if (idcliente != 2 && proyecto == 1){
                        consulta += " AND EmpresaActiva = " + idcliente;
                    }
                    if (filtro!="" && filtro!="*"){
                        consulta += " AND DeviceID LIKE '%" + filtro + "%' ";
                    }
                    if(orden1 != "Todos"){
                        if(orden1 == "Activos"){
                            consulta += "AND Active=1 ";
                        }
                        else{
                            consulta += "AND (Active=0 OR LastContractID='none') ";
                        }
                    }

                    if(orden2 == 0){
                        consulta += " ORDER BY DeviceID ASC ";
                    }else if(orden2 == 1){
                        consulta += " ORDER BY DeviceID DESC ";
                    }else if(orden2 == 2){
                        consulta += " ORDER BY eventDateTime ASC ";
                    }else if(orden2 == 3){
                        consulta += " ORDER BY eventDateTime DESC ";
                    }else if(orden2 == 4){
                        consulta += " ORDER BY UltActualizacionDevice ASC ";
                    }else if(orden2 == 5){
                        consulta += " ORDER BY UltActualizacionDevice DESC ";
                    }else if(orden2 == 6){
                        consulta += " ORDER BY DATEDIFF(SECOND, DATEADD(MINUTE,-"+utcServidor+", PositionTime), UltActualizacionDevice) ASC ";
                    }else if(orden2 == 7){
                        consulta += " ORDER BY DATEDIFF(SECOND, DATEADD(MINUTE,-"+utcServidor+", PositionTime), UltActualizacionDevice) DESC ";
                    }

                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

controller.get_reportescontroldeviceunico = async (req, res) => {
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
                    var idcliente=decoded.empresaprincipal;
                    var utcServidor=decoded.diffhorario;
                    var filtro=req.body.filtro;
                    var consulta = "SELECT DeviceID, dbo.UltimoContrato(DeviceID) As UltContrato, ICRutas.DescripcionRuta AS Ruta, NombreEmpresa AS Cliente, LokDeviceIDEstado.Descripcion AS Estado, ISNULL(ROUND(BatteryVoltage, 2),3) AS voltage, dbo.iconbateria(ISNULL(ROUND(BatteryVoltage, 2),3)) AS icon_bat, Apn1, Apn2, ";
                    consulta += "dbo.Tiempo(DATEDIFF(SECOND, LoksysServerTime, GETUTCDATE())) AS Tiempo, dbo.Tiempo(DATEDIFF(SECOND, DATEADD(MINUTE, -" + utcServidor + ", PositionTime), UltActualizacionDevice)) as Diff,  DATEADD(MINUTE, -" + utcServidor + ", PositionTime) AS ";
                    consulta += " eventDateTime,  UltActualizacionDevice AS LastSaved, Ciudad + ', ' + Departamento AS Position, ISNULL(UltServer, '-') AS UltServer, ";
                    consulta += " ISNULL(operador+'('+CAST(mcc AS NVARCHAR(4))+')','Desconocido('+CAST(UltMccc AS NVARCHAR(4))+')')AS Compania, CASE WHEN FKLokTipoEquipo in (select t.idtipoequipo from loktipoequipo t where mostrar = 1) ";
                    consulta += " THEN 'controldevice.aspx?device='+DeviceID ELSE '#' END AS url, ISNULL(Linea1, '-') AS LApn1, ISNULL(Linea2, '-') AS LApn2, FKLokTipoEquipo, ";
                    consulta += "FW, ConfigDevice, CASE WHEN Active = 0 THEN 0 ELSE ROUND(ISNULL(VoltageInit, 0), 2, 0) END AS VoltageInit, CASE WHEN Active = 0 THEN '-' ELSE dbo.Tiempo6(DATEDIFF(MI, InicioServicio, DATEADD(HH, 2, GETDATE()))) END AS HorasViaje, ";
                    consulta += "CASE WHEN Active = 0 THEN 0 ELSE ISNULL(CantReportes,0) END AS CantReportes, CASE WHEN Active = 0 THEN 0 ELSE CASE WHEN ISNULL(CantReportes,0) <> 0 THEN CantReportes / (CASE WHEN DATEDIFF(HH, InicioServicio, DATEADD(HH, 2, GETDATE())) = 0 THEN 1 ELSE DATEDIFF(HH, InicioServicio, DATEADD(HH, 2, GETDATE())) END) ELSE 0 END END AS RepxHora,";
                    consulta += "CASE WHEN Active = 0 THEN 0 ELSE CASE WHEN(ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1)) < 0 THEN 0 ELSE ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1) END END AS DeltaBateria, ";
                    consulta += "CASE WHEN Active = 0 THEN 0 ELSE CASE WHEN (ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1)) <= 0 THEN 0 ELSE ROUND(ROUND((CASE WHEN  DATEDIFF(HH, InicioServicio, DATEADD(HH, 2, GETDATE())) = 0 THEN 1 ELSE DATEDIFF(HH, InicioServicio, DATEADD(HH, 2, GETDATE())) END) ,2,1)/ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1),0,1) END END AS HoraxVolt, ";
                    consulta += "CASE WHEN Active = 0 THEN 0 ELSE CASE WHEN(ISNULL(CantReportes, 0) = 0) OR((ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1)) <= 0) THEN 0 ELSE ROUND(ISNULL(CantReportes, 0) / ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1), 0, 1) END END AS ReporxVolt, ";
                    consulta += " ROUND(CASE WHEN Active = 0 THEN 0 ELSE CASE WHEN (ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1)) <= 0 THEN 0 ELSE ROUND(ROUND((CASE WHEN  DATEDIFF(HH, InicioServicio, DATEADD(HH, 2, GETDATE())) = 0 THEN 1 ELSE DATEDIFF(HH, InicioServicio, DATEADD(HH, 2, GETDATE())) END) ,2,1)/ROUND(ISNULL(VoltageInit, 0) - BatteryVoltage, 2, 1),0,1) END END * (((CASE WHEN Active = 0 THEN 0 ELSE ROUND(ISNULL(VoltageInit, 0), 2, 0) END) - 3.5)/24), 1) AS ProyBat ";
                    consulta += " FROM LokDeviceID INNER JOIN LokProyectos ON IdProyecto = LokDeviceId.FKLokProyecto LEFT JOIN LokMcccPais ON cod_pais = FKPais and UltMccc = mcc LEFT JOIN LokContractID ON LokDeviceID.LastContractID = ContractID LEFT JOIN ICEmpresa ON FKICEmpresa = IdEmpresa LEFT JOIN ICRutas ON IdRuta = FKICRutas  INNER JOIN LokDeviceIDEstado ON Estado = IDEstado WHERE FKLokTipoEquipo <> 1 AND FKLokTipoEquipo <> 4 ";
                    if (idcliente != 2 && proyecto == 1){
                        consulta += " AND EmpresaActiva = " + idcliente;
                    }
                    if (filtro!="" && filtro!="*"){
                        consulta += " AND DeviceID LIKE '%" + filtro + "%' ";
                    }
                    let resultado=await sqlconfig.query(consulta);
                    return res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        return res.json({success : false, message: 'Internal server error'});
    }

}
// FUNCION QUE RETORNA EL LISTADO DE REPORTES DE LOS DISPOSITIVOS
controller.get_reportescontroldevicexequipo = async (req, res) => {
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
                    var tipo=req.body.tipo;
                    var device=req.body.device;
                    var inicio=req.body.inicio;
                    var fin=req.body.fin;
                    var utcServidor=decoded.diffhorario;
                    var consulta= "";
                    if(tipo == 2){
                        consulta = "SELECT WLMsg.ID, latitude, longitude, '' AS DiffTime, DATEADD(MINUTE, -" + utcServidor + ",datetime_utc) AS eventDateTime, 0 AS csq, CASE WHEN lock = 1 THEN 'Cerrado' ELSE 'Abierto' END AS event, unit AS device, DATEADD(MINUTE, -300,datetime_utc) AS UltActualizacion, 'GPRS' as source, ";
                        consulta += " satellites AS gpsStatus, lock, ISNULL(ROUND(main_voltage, 2),3) AS voltages, velocity AS speed, WLMsg.Ciudad + ', ' + Departamento AS position, Nombre, 'NO INFO' AS Compania, 'NO INFO' AS servername ";
                        consulta += " FROM WLMsg LEFT JOIN GeoCercas ON WLMsg.GeoCerca = GeoCercas.ID WHERE unit = '" + device + "' AND DATEADD(hh,-5,datetime_utc) ";
                        consulta += " BETWEEN '" + inicio + "' AND '" + fin + "' ORDER BY eventDateTime DESC";
                    }else if(tipo == 3){
                        consulta = " SELECT WSEnvotechMsg.ID, latitude, longitude, DATEADD(MINUTE, -" + utcServidor + ",eventDateTime) AS eventDateTime, event, device, UltActualizacion, source, ";
                        consulta += " DATEDIFF(MINUTE, DATEADD(MINUTE, -" + utcServidor + ",eventDateTime), UltActualizacion) AS DiffTime, ";
                        consulta += " gpsStatus, ISNULL(ROUND(voltage, 2),3) AS voltages, speed, WSEnvotechMsg.Ciudad + ', ' + Departamento AS position, csq, ";
                        consulta += " 'NO INFO' AS Compania, ISNULL(servername, 'NO INFO') AS servername, nombreUltGeo as Nombre, lock  ";
                        consulta += " FROM WSEnvotechMsg  ";
                        consulta += " WHERE masterID = '" + device + "' AND DATEADD(hh,-5,eventDateTime) BETWEEN '" + inicio + "' AND '" + fin + "' ";
                        consulta += " ORDER BY eventDateTime DESC ";
                    }else if(tipo == 6){
                        consulta = "SELECT WSCelltrackMsg.ID, latitud as latitude , longitud as longitude, '' AS DiffTime,  DATEADD(MINUTE, -" + utcServidor + ",datetimenormal) AS eventDateTime, 0 AS csq, ISNULL(evento,'') as event, fklokdeviceid AS device, ";
                        consulta += " DateTimeActualizacion AS UltActualizacion, 'GPRS' as source, '2' AS gpsStatus, ISNULL(ROUND(voltage, 2),3) AS voltages, velocidad AS speed, WSCelltrackMsg.Ciudad + ', ' + Departamento AS position, nombreUltGeo as Nombre, ";
                        consulta += " 'Pendiente' AS Compania, lock, ISNULL(servername,'') AS servername FROM WSCelltrackMsg ";
                        consulta += " WHERE FKLokDeviceID = '" + device + "' AND DATEADD(MINUTE, -" + utcServidor + ",datetimenormal) BETWEEN '" + inicio + "' AND '" + fin + "' ORDER BY eventDateTime DESC";
                    }else if(tipo == 7){
                        consulta = "SELECT WSNuevo.ID, latitud as latitude , longitud as longitude, '' AS DiffTime,  DATEADD(MINUTE, -" + utcServidor + ",fecha) AS eventDateTime, 0 AS csq, '' as event, device AS device, ";
                        consulta += " guardado AS UltActualizacion, lock, 'GPRS' as source, satelites AS gpsStatus, 4 AS voltages, velocidad AS speed, WSNuevo.Ciudad + ', ' + Departamento AS position, nombreUltGeo as Nombre, ";
                        consulta += " '' AS Compania, '' AS servername FROM WSNuevo";
                        consulta += " WHERE device = '" + device + "' AND DATEADD(MINUTE, -" + utcServidor + ",fecha) BETWEEN '" + inicio + "' AND '" + fin + "' ORDER BY fecha DESC";
                    }else if(tipo == 9){
                        consulta = "SELECT WSJ701trackMsg.ID, latitud as latitude , longitud as longitude, '' AS DiffTime,  DATEADD(MINUTE, -" + utcServidor + ",datetimenormal) AS eventDateTime, 0 AS csq, ISNULL(evento,'') as event, fklokdeviceid AS device, ";
                        consulta += " DateTimeActualizacion AS UltActualizacion, 'GPRS' as source, '2' AS gpsStatus, ISNULL(ROUND(voltage, 2),3) AS voltages, velocidad AS speed, WSJ701trackMsg.Ciudad + ', ' + Departamento AS position, nombreUltGeo as Nombre, ";
                        consulta += " 'Pendiente' AS Compania, lock, ISNULL(servername,'') AS servername FROM WSJ701trackMsg ";
                        consulta += " WHERE FKLokDeviceID = '" + device + "' AND DATEADD(MINUTE, -" + utcServidor + ",datetimenormal) BETWEEN '" + inicio + "' AND '" + fin + "' ORDER BY eventDateTime DESC";
                    }else if(tipo == 10){
                        consulta = "SELECT WSJT707trackMsg.ID, latitud as latitude , longitud as longitude, '' AS DiffTime,  DATEADD(MINUTE, -" + utcServidor + ",datetimenormal) AS eventDateTime, 0 AS csq, ISNULL(evento,'') as event, fklokdeviceid AS device, ";
                        consulta += " DateTimeActualizacion AS UltActualizacion, 'GPRS' as source, '2' AS gpsStatus, ISNULL(ROUND(voltage, 2),3) AS voltages, velocidad AS speed, WSJT707trackMsg.Ciudad + ', ' + Departamento AS position, nombreUltGeo as Nombre, ";
                        consulta += " 'Pendiente' AS Compania, lock, ISNULL(servername,'') AS servername FROM WSJT707trackMsg ";
                        consulta += " WHERE FKLokDeviceID = '" + device + "' AND DATEADD(MINUTE, -" + utcServidor + ",datetimenormal) BETWEEN '" + inicio + "' AND '" + fin + "' ORDER BY eventDateTime DESC";
                    }else if(tipo == 11){
                        consulta = "SELECT WSJT301trackMsg.ID, latitud as latitude , longitud as longitude, '' AS DiffTime,  DATEADD(MINUTE, -" + utcServidor + ",datetimenormal) AS eventDateTime, 0 AS csq, ISNULL(evento,'') as event, fklokdeviceid AS device, ";
                        consulta += " DateTimeActualizacion AS UltActualizacion, 'GPRS' as source, '2' AS gpsStatus, ISNULL(ROUND(voltage, 2),3) AS voltages, velocidad AS speed, WSJT707trackMsg.Ciudad + ', ' + Departamento AS position, nombreUltGeo as Nombre, ";
                        consulta += " 'Pendiente' AS Compania, lock, ISNULL(servername,'') AS servername FROM WSJT301trackMsg ";
                        consulta += " WHERE FKLokDeviceID = '" + device + "' AND DATEADD(MINUTE, -" + utcServidor + ",datetimenormal) BETWEEN '" + inicio + "' AND '" + fin + "' ORDER BY eventDateTime DESC";
                    }
                    let resultado=await sqlconfig.query2(consulta);
                    return res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        return res.json({success : false, message: 'Internal server error'});
    }

}

//FUNCION QUE GUARDA O ACTUALIZA EL TRAYECTO
controller.save_trayecto = async (req, res) => {
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
                        var consulta = "INSERT INTO Trayectos (DescripcionTrayecto, Origen, NombreOrigen, Destino, NombreDestino, WayPoints, Tolerancia, DistanciaOrigen, Polyline, DistanciaReal, FKLokProyecto) VALUES ("+
                        "'"+req.body.descripciontrayecto+"','"+req.body.origen+"','"+req.body.nombreorigen+"','"+req.body.destino+"','"+req.body.nombredestino+"','"+
                        req.body.waypoints+"',"+req.body.tolerancia+","+req.body.distanciaorigen+",'"+req.body.poly+"',"+req.body.distanciareal +","+decoded.proyecto+")";

                        res.json({success : true, data : await sqlconfig.query(consulta)});
                    }else{
                        try{
                            var consulta = "UPDATE Trayectos SET DescripcionTrayecto='"+req.body.descripciontrayecto+"', Origen='"+req.body.origen+"', NombreOrigen='"+req.body.nombreorigen+"', Destino='"+req.body.destino+"', NombreDestino='"+req.body.nombredestino+"', WayPoints='"+req.body.waypoints+"', Tolerancia="+req.body.tolerancia+", DistanciaOrigen="+req.body.distanciaorigen+", Polyline='"+req.body.poly+"', DistanciaReal="+req.body.distanciareal+" WHERE IDTrayecto="+req.body.ID;
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

controller.get_polylinetrayecto = async (req, res) => {
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
                    var consulta= "SELECT Polyline FROM Trayectos WHERE IDTrayecto="+id;
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

//FUNCION QUE RETORNA EL LISTADO DE REPORTES BI DE CADA PROYECTO
controller.get_reportesBI = async (req, res) => {
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
                    var consulta= "SELECT Id_Reporte, NombreReporte, Id_PowerBI FROM LokReportesPBI WHERE Fk_LokProyecto="+decoded.proyecto;
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

//FUNCION QUE RETORNA EL JSON DE VISUALLOGISTIC
controller.get_jsonvisuallogistic = async (req, res) => {
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
                    var nombreimagen=req.body.nombreimagen;
                    const varEndpoint= `https://visuallogisticsapp.azurewebsites.net/getimages/${nombreimagen}`;
                    const response = await axios.get(varEndpoint, null, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    });

                    res.json({ success: true, info: response.data });
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

//FUNCION QUE RETORNA EL JSON DE COMPARACION DE FOTOS DE UN CONTRATO EN VISUALLOGISTIC
controller.get_contractvisuallogistic = async (req, res) => {
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
                    var contrato=req.body.contrato;
                    const varEndpoint= `https://visuallogisticsapp.azurewebsites.net/get-contract/${contrato}`;
                    const response = await axios.get(varEndpoint, null, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    });

                    res.json({ success: true, info: response.data });
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA LA POLILINEA DE ACUERDO DE UN ORIGEN Y UN DESTINO
controller.get_poly = async (req, res) => {

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
                    var origen=req.body.origen;
                    var destino=req.body.destino;
                    var obj = {
                        "origin": origen,
                        "destination": destino,
                        "travelMode": "DRIVING"
                    }

                    gmAPI.directions(obj, function(err, result){
                      var path = result.routes[0];
                      var polyline = path.overview_polyline.points;
                      res.json({success : true, data : polyline});
                    });
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA SI SE ENCUENTRA EN LA RUTA
controller.get_find2 = async (req, res) => {
    try{
        var id=parseInt(req.body.ID);
        var latnow=req.body.latitud;
        var lngnow=req.body.longitud;
        var consulta= "SELECT * FROM Trayectos WHERE IDTrayecto="+id;
        let resultado=await sqlconfig.query(consulta);
        let trayecto = resultado.recordset[0];
        var posOrigen = trayecto.Origen.split(",");
        var posDestino = trayecto.Destino.split(",");
        var kmrecorrido=calcularDistancia(posOrigen[0], posOrigen[1], latnow, lngnow);
        var listado=[];
        var obj;
        var polylineaArray = trayecto.Polyline.split("||||");
        var polyseleccionada=polylineaArray.length-1;
        if(trayecto.WayPoints != ""){

            var wp = trayecto.WayPoints.split("|");
            var puntopenultimo=wp[wp.length-1].split(",");
             obj = {
                "origin": puntopenultimo[0]+","+puntopenultimo[1],
                "destination": trayecto.Destino,
                "travelMode": "DRIVING"
            }
            for(var i =0; i< wp.length; i++){
                var punto = wp[i].split(",");
                if(kmrecorrido <= parseFloat(punto[2]) ){
                    if(i == 0){
                        obj = {
                            "origin": trayecto.Origen,
                            "destination": punto[0]+","+punto[1],
                            "travelMode": "DRIVING"
                        }
                        polyseleccionada=i;
                    }else{
                      var puntoOrigen = wp[i-1].split(",");
                      obj = {
                          "origin": puntoOrigen[0]+","+puntoOrigen[1],
                          "destination": punto[0]+","+punto[1],
                          "travelMode": "DRIVING"
                      }
                      polyseleccionada=i;
                    }
                    break;
                }
            }
        }else{
            polyseleccionada=0;
        }

        let response =  Poly.PolyUtil.isLocationOnEdge(
          {lat: latnow, lng: lngnow}, // point object {lat, lng}
          decodePolyline(polylineaArray[polyseleccionada]),
          trayecto.Tolerancia,
          true
        );
        res.json({success:true, data : response});
    }catch(err){
        res.json({success:false});
    }

}

//FUNCION QUE GUARDA O ACTUALIZA EL TRAYECTO
controller.set_ultimopunto = async (req, res) => {
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
                    var consulta = "UPDATE LokcontractID SET LastMsgID='"+req.body.id+"', LastMsgLat="+req.body.lat+", LastMsgLong="+req.body.lng+" WHERE ContractID='"+req.body.contrato+"'";
                    res.json({success : await sqlconfig.query(consulta)});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

//FUNCION QUE ACTUALIZA EL CONTRATO EN EL DEVICE
controller.set_lastcontractdevice = async (req, res) => {
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
                    var consulta = "UPDATE LokDeviceID SET LastContractID='"+req.body.Contrato+"' WHERE DeviceID='"+req.body.Device+"'";
                    res.json({success:true, res : await sqlconfig.query(consulta)});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

controller.set_reporteautomatico = async (req, res) => {
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
                        "FKICTipoReporte": -1,
                        "FKLokTipoAccion": -1,
                        "Ubicacion": req.body.ubicacion,
                        "Nota": null,
                        "XTime": null,
                        "XUser": decoded.username,
                        "FKLokContractID": req.body.contrato,
                        "Individual": true
                    };
                    let resultado=await sqlconfig.queryProcedure('LokInsertReport', data);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION PARA CONVERTIR GRADOS A RADIANES
function gradosARadianes(grados){
    return grados * Math.PI / 180;
}

// FUNCION QUE CALCULA LA DISTANCIA ENTRE DOS POSICIONES
function calcularDistancia(lat1, lng1, lat2, lng2){
    lat1 = gradosARadianes(lat1);
    lng1 = gradosARadianes(lng1);
    lat2 = gradosARadianes(lat2);
    lng2 = gradosARadianes(lng2);
    const RADIO_TIERRA_EN_KILOMETROS = 6371;
    let diferenciaEntreLongitudes = (lng2 - lng1);
    let diferenciaEntreLatitudes = (lat2 - lat1);
    let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return RADIO_TIERRA_EN_KILOMETROS * c;
}


module.exports = controller;
