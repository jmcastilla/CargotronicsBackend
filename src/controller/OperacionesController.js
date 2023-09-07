const controller = {}
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
        var log = req.session.loggedin;
        if (log == true) {
            var desde=req.body.desde;
            var hasta=req.body.hasta;
            var placa=req.body.placa;
            var empresa=req.body.empresa;
            /*var consulta= "SELECT ContractID, FKLokDeviceID, e.NombreEmpresa, c.PlacaTruck, '"+req.session.username+"' as username, "+
            "CONVERT(varchar,DATEADD(MINUTE,1,c.FechaHoraInicio),20) as fecha, CONCAT(c.LastMsgLat,',',c.LastMsgLong) as pos, "+
            "ISNULL(c.FKTrayecto, 0) as trayecto, r.DescripcionRuta, t.DescripcionTrayecto, c.ContainerNum, c.NombreConductor, "+
            "c.Ref, tp.NombreTranspo, c.MovilConductor, c.PlacaTrailer, CONVERT(varchar,DATEADD(minute,"+req.session.diffhorario+",c.FechaHoraInicio),20) as fechainicio, "+
            "ISNULL(CONVERT(varchar,DATEADD(minute,"+req.session.diffhorario+",c.FechaHoraFin),20), CONVERT(varchar,DATEADD(minute,"+req.session.diffhorario+",GETDATE()),20)) as fechafin, c.LastMsgLat, c.LastMsgLong, c.Active, d.Locked, ISNULL(t.DistanciaReal,0) as DistanciaCompleta, t.Origen, d.FKLokTipoEquipo "+
            "FROM LokcontractID as c "+
            "INNER JOIN LokDeviceID as d ON d.DeviceID = c.FKLokDeviceID "+
            "LEFT JOIN ICEmpresa as e ON e.IdEmpresa = c.FKICEmpresa "+
            "LEFT JOIN ICRutas as r ON r.IdRuta = c.FKICRutas "+
            "LEFT JOIN Trayectos as t ON c.FKTrayecto =  t.IDTrayecto "+
            "LEFT JOIN ICTransportadora as tp ON tp.IdTransportadora = c.FKICTransportadora "+
            "WHERE c.FKLokProyecto="+req.session.proyecto +" AND c.FechaHoraFin BETWEEN '"+desde+"' AND '"+hasta+"' AND c.PlacaTruck LIKE'%"+placa+"%'";*/
            var consulta= "SELECT ContractID, FKLokDeviceID, e.NombreEmpresa, c.PlacaTruck, '"+req.session.username+"' as username, "+
            "CONVERT(varchar,DATEADD(MINUTE,0,c.FechaHoraInicio),20) as fecha, CONCAT(c.LastMsgLat,',',c.LastMsgLong) as pos, "+
            "ISNULL(c.FKTrayecto, 0) as trayecto, r.DescripcionRuta, t.DescripcionTrayecto, c.ContainerNum, c.NombreConductor, "+
            "c.Ref, tp.NombreTranspo, c.MovilConductor, c.PlacaTrailer, CONVERT(varchar,DATEADD(minute,0,c.FechaHoraInicio),20) as fechainicio, "+
            "ISNULL(CONVERT(varchar,DATEADD(minute,0,c.FechaHoraFin),20), CONVERT(varchar,DATEADD(minute,"+req.session.diffhorario+",GETDATE()),20)) as fechafin, c.LastMsgLat, c.LastMsgLong, c.Active, d.Locked, ISNULL(t.DistanciaReal,0) as DistanciaCompleta, t.Origen, d.FKLokTipoEquipo "+
            "FROM LokcontractID as c "+
            "INNER JOIN LokDeviceID as d ON d.DeviceID = c.FKLokDeviceID "+
            "LEFT JOIN ICEmpresa as e ON e.IdEmpresa = c.FKICEmpresa "+
            "LEFT JOIN ICRutas as r ON r.IdRuta = c.FKICRutas "+
            "LEFT JOIN Trayectos as t ON c.FKTrayecto =  t.IDTrayecto "+
            "LEFT JOIN ICTransportadora as tp ON tp.IdTransportadora = c.FKICTransportadora "+
            "WHERE c.FKLokProyecto="+req.session.proyecto +" AND c.FechaHoraFin BETWEEN '"+desde+"' AND '"+hasta+"' AND c.PlacaTruck LIKE'%"+placa+"%'";
            if(empresa != 0){
              consulta+=" AND e.IdEmpresa="+empresa;
            }
            let resultado=await sqlconfig.query(consulta);
            res.json({success : true, data : resultado.recordsets[0]});
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA EL LISTADO DE TRAYECTOS
controller.get_eventos = async (req, res) => {
    try{
        var log = req.session.loggedin;
        if (log == true) {
            var consulta= "SELECT ID_Evento, Descripcion FROM Valitronics_eventos WHERE FK_Proyecto="+req.session.proyecto;

            let resultado=await sqlconfig.query(consulta);

            res.json({success : true, data : resultado.recordset});
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA EL LISTADO DE TRAYECTOS
controller.get_trayectos = async (req, res) => {
    console.log(req.session);
    try{
        var log = req.session.loggedin;
        if (log == true) {
            var consulta= "SELECT * FROM Trayectos WHERE FKLokProyecto="+req.session.proyecto+" ORDER BY DescripcionTrayecto;";
            let resultado=await sqlconfig.query(consulta);
            res.json({success : true, data : resultado.recordset});
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA EL SECRET KEY DE LA APLICACION
controller.get_keyApp = async (req, res) => {
    try{
        var log = req.session.loggedin;
        if (log == true) {
            var consulta= "SELECT KEYWS FROM LokConfiguracion WHERE ID=1;";
            let resultado=await sqlconfig.query(consulta);
            console.log(resultado);
            res.json({success : true, data : resultado.recordset, user:req.session.username});
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }
}

// FUNCION QUE ACTUALIZAR EL TRAYECTO EN EL CONTRATO
controller.update_contratotrayectos = async (req, res) => {
    try{
        var log = req.session.loggedin;
        if (log == true) {
            var consulta = "UPDATE LokcontractID SET FKTrayecto='"+req.body.Trayecto+"', actualizarbk=2 WHERE ContractID='"+req.body.Contrato+"'";
            console.log(consulta);
            res.json({success : await sqlconfig.query(consulta)});
        }else{
            res.json({success : false});
        }
    }catch(error){
        res.json({success : false});
    }
}

// FUNCION QUE RETORNA EL LISTADO DE CONTRATOS ACTIVOS, GRILLA DE TRAFICO
controller.get_contratostrafico = async (req, res) => {
    try{
        var log = req.session.loggedin;
        if (log == true) {
            var consulta= "SELECT c.ContractID, c.FKLokDeviceID, e.NombreEmpresa, c.PlacaTruck, '"+req.session.username+"' as username, "+
            "CONVERT(varchar,DATEADD(MINUTE,0,c.FechaHoraInicio),20) as fecha, CONCAT(c.LastMsgLat,',',c.LastMsgLong) as pos, "+
            "ISNULL(c.FKTrayecto, 0) as trayecto, r.DescripcionRuta, t.DescripcionTrayecto, c.ContainerNum, c.NombreConductor, "+
            "c.Ref, tp.NombreTranspo, c.MovilConductor, c.PlacaTrailer, CONVERT(varchar,DATEADD(minute,0,c.FechaHoraInicio),20) as fechainicio, "+
            "ISNULL(CONVERT(varchar,DATEADD(minute,0,c.FechaHoraFin),20), CONVERT(varchar,DATEADD(minute,"+req.session.diffhorario+",GETDATE()),20)) as fechafin, c.LastMsgLat, c.LastMsgLong, "+
            "d.Locked, c.Active, ISNULL(t.DistanciaReal,0) as DistanciaCompleta, t.Origen, d.FKLokTipoEquipo, "+
            "dbo.Tiempo(DATEDIFF(SECOND, LoksysServerTime, GETUTCDATE())) as Tiempo, DATEDIFF(SECOND, '1970-01-01 00:00:00', LoksysServerTime) as tiempoUnix, "+
            "dbo.iconbateria(ISNULL(ROUND(BatteryVoltage, 2),3)) as icon_bat, ROUND(BatteryVoltage, 2) as bateria, "+
            "c.LastReportNota, tr.TipoReporte, "+
            //"c.LastReportNota, tr.TipoReporte, (CASE d.Moving WHEN 1 THEN '/images/moving.png' ELSE '/images/stop.png' END) as IconMoving, "+
            //"(CASE d.Locked WHEN 1 THEN '/images/closedpadlock.png' ELSE '/images/openedpadlock.png' END) as IconLocked2, "+
            "SUBSTRING(iconos.IconMoving, 2, CHARINDEX('|', iconos.IconMoving) - 2) AS IconMoving, "+
            "SUBSTRING(iconos.IconLocked, 2, CHARINDEX('|', iconos.IconLocked) - 2) AS IconLocked, "+
            "SUBSTRING(iconos.IconDesvio, 2, CHARINDEX('|', iconos.IconDesvio) - 2) AS IconDesvio, "+
            //"SUBSTRING(iconos.IconSeparado, 2, CHARINDEX('|', iconos.IconSeparado) - 2) AS IconSeparado, "+
            "1.png AS IconSeparado, "+
            "SUBSTRING(iconos.IconBack, 2, CHARINDEX('|', iconos.IconBack) - 2) AS IconBack "+
            "FROM LokcontractID as c "+
            "INNER JOIN LokDeviceID as d ON d.DeviceID = c.FKLokDeviceID "+
            "LEFT JOIN ICEmpresa as e ON e.IdEmpresa = c.FKICEmpresa "+
            "LEFT JOIN ICRutas as r ON r.IdRuta = c.FKICRutas "+
            "LEFT JOIN Trayectos as t ON c.FKTrayecto =  t.IDTrayecto "+
            "LEFT JOIN ICTipoReporte as tr ON c.LastICTipoReporte =  tr.IdTipoReporte "+
            "LEFT JOIN ICTransportadora as tp ON tp.IdTransportadora = c.FKICTransportadora "+
            "OUTER APPLY dbo.IconosContract(c.ContractID, c.FKLokDeviceID) AS iconos "+
            "WHERE c.Active=1 AND c.FKLokProyecto="+req.session.proyecto;
            console.log(consulta);
            let resultado=await sqlconfig.query(consulta);
            res.json({success : true, data : resultado.recordsets[0]});
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }
}

// FUNCION QUE RETORNA EL LISTADO DE CONTRATOS ACTIVOS, GRILLA DE TRAFICO
controller.get_reportesdevice = async (req, res) => {
    try{
        var log = req.session.loggedin;
        if (log == true) {

            let m = moment();
            m.add(req.session.diffhorario, 'minutes');
            var datos={
              "fechainicio": req.body.fechainicio,
              "fechafin":m.format('YYYY-MM-DD HH:mm:ss'),
              "device": req.body.device,
              "utcMinutos": req.session.diffUTC,
              "allreport": req.body.allreport
            }
            if(req.body.tipo == 0){
                datos={
                  "fechainicio": req.body.fechainicio,
                  "fechafin":req.body.fechafin,
                  "device": req.body.device,
                  "utcMinutos": req.session.diffUTC,
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
            console.log(datos);
            let resultado=await sqlconfig.query2Procedure(procedure, datos);
            //let filteredData = resultado.recordsets[0].filter(item => item.latitude !== 0 && item.longitude !== 0);
            res.json({success : true, data : resultado.recordsets[0]});
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }
}

// FUNCION QUE RETORNA EL LISTADO DE CONTRATOS ACTIVOS, GRILLA DE TRAFICO
controller.get_fotoscontrato = async (req, res) => {
    console.log(req.session);
    try{
        var log = req.session.loggedin;

        if (log == true) {
            var contrato=req.body.contrato;
            var consulta= "SELECT * from dbo.Photos('"+contrato+"')";
            let resultado=await sqlconfig.query(consulta);
            res.json({success : true, data : resultado.recordsets[0]});
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA EL LISTADO DE REPORTES DE TRAFICO DE UN CONTRATO
controller.get_reportestrafico = async (req, res) => {
    console.log(req.session);
    try{
        var log = req.session.loggedin;

        if (log == true) {
            var contrato=req.body.contrato;
            var consulta= "SELECT r.IdReport, r.XTime, ta.TipoAccion, tr.TipoReporte, r.Ubicacion, r.Nota, r.XUser from LokReport as r "+
            "INNER JOIN LokTipoAccion as ta ON ta.IdTipoAccion = r.FKLokTipoAccion "+
            "INNER JOIN ICTipoReporte as tr ON tr.idTipoReporte = r.FKICTipoReporte "+
            "WHERE r.FKLokContractID='"+contrato+"'";
            let resultado=await sqlconfig.query(consulta);
            res.json({success : true, data : resultado.recordsets[0]});
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }

}

//FUNCION QUE GUARDA O ACTUALIZA EL TRAYECTO
controller.save_trayecto = async (req, res) => {
    try{
        var log = req.session.loggedin;
        if (log == true) {
            if(req.body.ID == -1){
                var consulta = "INSERT INTO Trayectos (DescripcionTrayecto, Origen, NombreOrigen, Destino, NombreDestino, WayPoints, Tolerancia, DistanciaOrigen, Polyline, DistanciaReal, FKLokProyecto) VALUES ("+
                "'"+req.body.descripciontrayecto+"','"+req.body.origen+"','"+req.body.nombreorigen+"','"+req.body.destino+"','"+req.body.nombredestino+"','"+
                req.body.waypoints+"',"+req.body.tolerancia+","+req.body.distanciaorigen+",'"+req.body.poly+"',"+req.body.distanciareal +","+req.session.proyecto+")";

                res.json({success : true, data : await sqlconfig.query(consulta)});
            }else{
                try{
                    var consulta = "UPDATE Trayectos SET DescripcionTrayecto='"+req.body.descripciontrayecto+"', Origen='"+req.body.origen+"', NombreOrigen='"+req.body.nombreorigen+"', Destino='"+req.body.destino+"', NombreDestino='"+req.body.nombredestino+"', WayPoints='"+req.body.waypoints+"', Tolerancia="+req.body.tolerancia+", DistanciaOrigen="+req.body.distanciaorigen+", Polyline='"+req.body.poly+"', DistanciaReal="+req.body.distanciareal+" WHERE IDTrayecto="+req.body.ID;

                    res.json({success : await sqlconfig.query(consulta)});

                }catch(error){
                    res.json({success : false});
                }
            }
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }

}

controller.get_polylinetrayecto = async (req, res) => {
    try{
        var log = req.session.loggedin;

        if (log == true) {
            var id=req.body.id;
            var consulta= "SELECT Polyline FROM Trayectos WHERE IDTrayecto="+id;
            let resultado=await sqlconfig.query(consulta);
            res.json({success : true, data : resultado.recordsets[0]});
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }

}

// FUNCION QUE RETORNA LA POLILINEA DE ACUERDO DE UN ORIGEN Y UN DESTINO
controller.get_poly = async (req, res) => {
    try{
        var log = req.session.loggedin;
        if (log == true) {
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

        }else{
            res.json({success : false});
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
        var log = req.session.loggedin;
        if (log == true) {
            try{
                var consulta = "UPDATE LokcontractID SET LastMsgID='"+req.body.id+"', LastMsgLat="+req.body.lat+", LastMsgLong="+req.body.lng+" WHERE ContractID='"+req.body.contrato+"'";

                res.json({success : await sqlconfig.query(consulta)});

            }catch(error){
                res.json({success : false});
            }
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }

}

//FUNCION QUE ACTUALIZA EL CONTRATO EN EL DEVICE
controller.set_lastcontractdevice = async (req, res) => {
    try{
        var log = req.session.loggedin;
        if (log == true) {
            try{
                var consulta = "UPDATE LokDeviceID SET LastContractID='"+req.body.Contrato+"' WHERE DeviceID='"+req.body.Device+"'";

                res.json({success:true, res : await sqlconfig.query(consulta)});

            }catch(error){
                res.json({success : false});
            }
        }else{
            res.json({success : false});
        }
    }catch(err){
        res.json({success : false});
    }

}

controller.set_reporteautomatico = async (req, res) => {
    try{
        var log = req.session.loggedin;
        if (log == true) {
            try{
              let data = {
                  "FKICTipoReporte": -1,
                  "FKLokTipoAccion": -1,
                  "Ubicacion": req.body.ubicacion,
                  "Nota": null,
                  "XTime": null,
                  "XUser": req.session.username,
                  "FKLokContractID": req.body.contrato,
                  "Individual": true
              };
              let resultado=await sqlconfig.queryProcedure('LokInsertReport', data);
              res.json({success : true, data : resultado.recordsets[0]});

            }catch(error){
                console.log(error);
                res.json({success : false});
            }
        }else{
            res.json({success : false});
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
