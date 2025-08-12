const controller = {}
const jwt = require('jsonwebtoken');
const axios = require('axios');
const sql = require("mssql");
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

controller.get_crearcontrato = async (req, res) => {
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
                    var device= req.body.device;
                    var consulta= "SELECT d.DeviceID FROM LokDeviceID as d "+
                    "LEFT JOIN LokContractID as c ON d.LastContractID = c.ContractID "+
                    "WHERE (c.Active = 0 OR d.LastContractID = 'none') AND d.Estado = 1 AND d.DeviceID = '"+device+"' and d.FKLokProyecto = "+decoded.proyecto;
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

controller.get_infocontrato = async (req, res) => {
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
                    var vissolicitud = await isSolicitud(contrato);
                    var consulta = "SELECT LokContractID.ContractID, LokContractID.LightBit, LokContractID.FKICEmpresa, LokContractID.FKICEmpresaConsulta, LokContractID.FKICEmpresaConsulta2, LokContractID.FKICEmpresaConsulta3,";
                    consulta += "LokContractID.FKICRutas, LokContractID.FKLokBarsSLM, LokContractID.Active, LokContractID.FKLokDeviceID, LokContractID.Ref, ";
                    consulta += "LokContractID.PlacaTruck, LokContractID.ColorTruck, LokContractID.PlacaTrailer, LokContractID.NombreConductor, LokContractID.NitConductor, ";
                    consulta += "LokContractID.FechaHoraCita, LokContractID.FechaHoraCitaDescargue, LokContractID.NotasDatosEntrega, LokContractID.FechaHoraDescargue, FKCercaAutorizada, UserCreacion, LokContractID.Solicitante, LokContractID.bitRestriccion, LokContractID.HoraInicioR, LokContractID.HoraFinR, LokContractID.MovilConductor, LokContractID.ContainerNum, LokContractID.Notas, LokContractID.UserDesinstalacion, LokContractID.UserInstalacion, ";
                    consulta += "LokContractID.NombreEscolta, LokContractID.FKLokTipoDocumento, LokContractID.Documento, LokContractID.AlertasActivas, LokContractID.FKCelloTrack, LokContractID.FKLokSolicitud, LokContractID.MovilEscolta, ";
                    consulta += "LokContractID.NotasTI, Equivalencia, LokContractID.FKLokCategoriaServ, LokContractID.OtrosDatosTruck, LokContractID.FKICTransportadora, LokContractID.FKLokInstalador, ";
                    consulta += "LokContractID.FKLokDesistaladores, LokContractID.DigitoVerificacion, LokContractID.NotaDesisntalaciones, LokSolicitudes.FKLokEstados, LokContractID.Contacto, LokContractID.LokTipoServicios, ";
                    consulta += "LokContractID.FKLokTipoUnidadCarga, LokContractID.SlavesAsignados, Comprobante, FKQrMaestro, FKLokModalidadServ, ";
                    consulta += "(SELECT TOP 1 id_chequeo FROM ValitronicsChequeo WHERE Fk_ContractID = LokContractID.ContractID) as chequeo_ident, LokContractID.LokTipoServicios as tipo_equipo, LokContractID.bitMostrarCritico ";
                    consulta += "FROM LokContractID  INNER JOIN LokSolicitudes ON LokContractID.FKLokSolicitud = LokSolicitudes.IDSolicitudes ";
                    consulta += "LEFT JOIN QR_Maestro ON FKQrMaestro = ID_QRMaestro ";
                    consulta += "WHERE LokContractID.ContractID = '" + contrato + "' ";
                    if(!vissolicitud){
                        consulta = " SELECT ContractID, LightBit, FKICEmpresa, UserCreacion,  FKICEmpresaConsulta, FKQrMaestro,  FKICEmpresaConsulta2, FKICEmpresaConsulta3, FKICRutas , bitRestriccion, HoraInicioR, HoraFinR, FKLokBarsSLM, Active, ";
                        consulta += "FKLokDeviceID, Ref, PlacaTruck, ColorTruck, Equivalencia, PlacaTrailer, NombreConductor, NitConductor, MovilConductor, ContainerNum, UserDesinstalacion, UserInstalacion, ";
                        consulta += "Notas, NombreEscolta, AlertasActivas, FKCercaAutorizada, Comprobante, LokContractID.FKLokTipoDocumento, LokContractID.Documento,FKCelloTrack, DigitoVerificacion, FKLokSolicitud, MovilEscolta, NotasTI, FKLokCategoriaServ, ";
                        consulta += "OtrosDatosTruck, FKICTransportadora, FKLokInstalador, FKLokDesistaladores, NotaDesisntalaciones, Contacto, LokTipoServicios, FKLokModalidadServ, bitMostrarCritico,";
                        consulta += "FKLokTipoUnidadCarga, SlavesAsignados, ";
                        consulta += "(SELECT TOP 1 id_chequeo FROM ValitronicsChequeo WHERE Fk_ContractID = LokContractID.ContractID) as chequeo_ident, LokContractID.LokTipoServicios as tipo_equipo ";
                        consulta += "FROM LokContractID LEFT JOIN QR_Maestro ON FKQrMaestro = ID_QRMaestro WHERE ContractID = '" + contrato + "'";
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

controller.get_infocontratoproyecto = async (req, res) => {
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
                    consulta = "SELECT l.ContractID, l.FKICEmpresa, SlavesAsignados, AlertasActivas, LightBit, l.FKICEmpresaConsulta, l.FKICEmpresaConsulta2, l.FKICEmpresaConsulta3, l.FKICRutas, l.Active, l.FKLokDeviceID, l.Ref, l.PlacaTruck, l.ColorTruck, l.PlacaTrailer, l.NombreConductor, l.NitConductor, l.FechaHoraCita, ";
                    consulta +="l.MovilConductor, l.ContainerNum, l.DigitoVerificacion, l.Notas, l.NombreEscolta, l.FKCercaAutorizada, l.FKLokSolicitud, l.FKICEmpresaConsulta, l.MovilEscolta, l.NotasTI, l.FKLokCategoriaServ, l.OtrosDatosTruck, l.FKICTransportadora, l.FKLokInstalador, l.FKLokDesistaladores, l.NotaDesisntalaciones, l.Contacto, l.LokTipoServicios, l.FKICTransportadora, ";
                    consulta +="(SELECT TOP 1 id_chequeo FROM ValitronicsChequeo WHERE Fk_ContractID = l.ContractID) as chequeo_ident ";
                    consulta +="FROM LokContractID l WHERE l.ContractID = '" + contrato + "'";

                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

async function isSolicitud(contrato) {
    try{
        var consulta= "SELECT FKLokSolicitud FROM LokContractID WHERE ContractID = '" + contrato + "'";
        let resultado=await sqlconfig.query(consulta);
        if(resultado.recordsets[0] && resultado.recordsets[0].length > 0){
            return true;
        }else{
            return false;
        }
    }catch(err){
        return false;
    }
}

controller.limpiar_contrato = async (req, res) => {
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
                        "contractID": req.body.contractID,
                        "usuario": decoded.username,
                    };
                    let resultado=await sqlconfig.queryProcedure('LokUpdateContractIdWhenFreed', data);
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
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    let data = {
                        "LokTipoServicios": req.body.tipoequipo,
                        "ubicacion": req.body.ubicacion,
                        "UserCreacion": decoded.username,
                        "DeviceID": req.body.listaequipo,
                        "PositionTimestamp": toUnixTime(),
                        "Proyecto": decoded.proyecto,
                        "InicioContrato": req.body.fechahora,
                        "error": { type: sql.Int, dir: sql.Output }
                    };
                    if(req.body.listaequipo === '' || req.body.listaequipo === null){
                        res.json({success : false, data : null, mensaje: "DEBE SELECCIONAR UN DISPOSITIVO."});
                    }else{
                        console.log(data);
                        let resultado=await sqlconfig.queryProcedureconoutput('LokCrearContractGeneral', data);
                        console.log(resultado);
                        console.log(resultado.returnValue);
                        var resbool = true;
                        var mensaje = "";
                        if(resultado.returnValue === 1){
                            resbool = true;
                            mensaje = "SE AGREGO CONTRATO CORRECTAMENTE.";
                        }else{
                            resbool = false;
                            if(resultado.returnValue === 2){
                                mensaje="LA FECHA SE SUPERPONE CON EL CONTRATO ANTERIOR DEL EQUIPO.";
                            }else if(resultado.returnValue === 3){
                                mensaje="EL EQUIPO NO TIENE EL ESTADO CORRECTO.";
                            }
                            else if(resultado.returnValue === 4){
                                mensaje="NO HAY EQUIPOS DISPONIBLES EN EL MOMENTO, CONSULTE CON SU ADMIN.";
                            }else{
                                mensaje="ERROR INDEFINIDO, CONSULTE CON SU ADMIN.";
                            }
                        }
                        console.log(resbool+" - "+mensaje);
                        res.json({success : resbool, data : resultado.recordsets[0], mensaje: mensaje});
                    }

                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.crear_contratov = async (req, res) => {
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
                        "LokTipoServicios": 8,
                        "ubicacion": req.body.ubicacion,
                        "UserCreacion": decoded.username,
                        "DeviceID": req.body.listaequipo,
                        "PositionTimestamp": toUnixTime(),
                        "Proyecto": decoded.proyecto,
                        "InicioContrato": req.body.fechahora,
                        "error": { type: sql.Int, dir: sql.Output }
                    };

                    if(req.body.listaequipo === '' || req.body.listaequipo === null){
                        res.json({success : false, data : null, mensaje: "DEBE SELECCIONAR UN DISPOSITIVO."});
                    }else{
                        console.log(data);
                        let resultado=await sqlconfig.queryProcedureconoutput('LokCrearContractGeneral', data);
                        console.log(resultado);
                        console.log(resultado.returnValue);
                        var resbool = true;
                        var mensaje = "";
                        if(resultado.returnValue === 1){
                            resbool = true;
                            mensaje = "SE AGREGO CONTRATO CORRECTAMENTE.";
                        }else{
                            resbool = false;
                            if(resultado.returnValue === 2){
                                mensaje="LA FECHA SE SUPERPONE CON EL CONTRATO ANTERIOR DEL EQUIPO.";
                            }else if(resultado.returnValue === 3){
                                mensaje="EL EQUIPO NO TIENE EL ESTADO CORRECTO.";
                            }
                            else if(resultado.returnValue === 4){
                                mensaje="NO HAY EQUIPOS DISPONIBLES EN EL MOMENTO, CONSULTE CON SU ADMIN.";
                            }else{
                                mensaje="ERROR INDEFINIDO, CONSULTE CON SU ADMIN.";
                            }
                        }
                        console.log(resbool+" - "+mensaje);
                        res.json({success : resbool, data : resultado.recordsets[0], mensaje: mensaje});
                    }
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_listadispositivosdisponibles = async (req, res) => {
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
                    var consulta= "SELECT DeviceID ";
                    consulta += "FROM LokDeviceID LEFT JOIN LokContractID ON LokDeviceID.LastContractID = LokContractID.ContractID ";
                    consulta += "WHERE (LokContractID.Active = 0 OR LokDeviceID.LastContractID = 'none') AND Estado = 1 AND ";
                    consulta += " LokDeviceID.FKLokTipoEquipo =" + req.body.tipoequipo + " AND LokDeviceID.FKLokProyecto = " + decoded.proyecto;
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_listatiposequipo = async (req, res) => {
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
                    var consulta= "SELECT IDTipoServicios, Descripcion FROM LokTipoServicios WHERE CrearContrato = 1 order by Descripcion";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

function toUnixTime() {
    const ONE_TICK = 100; // 1 tick = 100 nanoseconds
    const SEC_IN_NANOSEC = 1e9; // 1 second = 1,000,000,000 nanoseconds
    const ANIO_BASE = 1970; // Base year for Unix time

    // Get the current date and time
    const currentDate = new Date();

    // Add 1 day to the current date
    currentDate.setDate(currentDate.getDate() + 1);

    // Subtract base year from the date
    const baseYear = new Date(ANIO_BASE, 0, 1);
    const timeDifference = currentDate.getTime() - baseYear.getTime();

    // Convert milliseconds to Unix timestamp using the tick and nanosecond constants
    const ticks = timeDifference * ONE_TICK;
    const unixTime = Math.floor(ticks / (SEC_IN_NANOSEC / 1e3));

    return unixTime;
}


controller.limpiar_contratoSalvoInfo = async (req, res) => {
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
                        "contractID": req.body.contractID,
                        "usuario": decoded.username,
                    };
                    let resultado=await sqlconfig.queryProcedure('LokUpdateContractIdWhenFreedAndSalveInfo', data);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}


controller.set_updatecontrato = async (req, res) => {
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
                        "contractID": req.body.contractID,
                        "Active": req.body.Active,
                        "FKICEmpresa": req.body.FKICEmpresa,
                        "FKICEmpresaConsulta": req.body.FKICEmpresaConsulta,
                        "FKICEmpresaConsulta2": req.body.FKICEmpresaConsulta2,
                        "FKICEmpresaConsulta3": req.body.FKICEmpresaConsulta3,
                        "FKICRutas": req.body.FKICRutas,
                        "Ref": req.body.Ref,
                        "PlacaTruck": req.body.PlacaTruck,
                        "ColorTruck": req.body.ColorTruck,
                        "PlacaTrailer": req.body.PlacaTrailer,
                        "NombreConductor": req.body.NombreConductor,
                        "NitConductor": req.body.NitConductor,
                        "MovilConductor": req.body.MovilConductor,
                        "ContainerNum": req.body.ContainerNum,
                        "Notas": req.body.Notas,
                        "NombreEscolta": req.body.NombreEscolta,
                        "MovilEscolta": req.body.MovilEscolta,
                        "NotasTI": req.body.NotasTI,
                        "FKLokCategoriaServ": req.body.FKLokCategoriaServ,
                        "FKLokSolicitud": req.body.FKLokSolicitud, //si viene null numerror 4
                        "OtrosDatosTruck": req.body.OtrosDatosTruck,
                        "FKLokInstalador": req.body.FKLokInstalador,
                        "FKLokDesistaladores": req.body.FKLokDesistaladores,
                        "NotaDesisntalaciones": req.body.NotaDesisntalaciones,
                        "FKICTransportadora": req.body.FKICTransportadora, //si es diferente de 3 numerror 3
                        "FechaHoraCita": req.body.FechaHoraCita,
                        "FechaHoraCitaDescargue": req.body.FechaHoraCitaDescargue,
                        "Contacto": req.body.Contacto,
                        "Solicitante": req.body.Solicitante,
                        "FKLokBarsSLM": req.body.FKLokBarsSLM,
                        "FKCelloTrack": req.body.FKCelloTrack,
                        "LightBit": req.body.LightBit,
                        "AlertasBit": req.body.AlertasBit,
                        "FKLokTipoUnidadCarga": req.body.FKLokTipoUnidadCarga, //si viene null numerror 2
                        "FKTipoDocumento": req.body.FKTipoDocumento,
                        "DigitoVerificacion": req.body.DigitoVerificacion,
                        "Documento": req.body.Documento,
                        "Equivalencia": req.body.Equivalencia,
                        "FKCercaAutorizada": req.body.FKCercaAutorizada,
                        "usuario": decoded.username,
                        "bitRestriccion": req.body.bitRestriccion,
                        "HoraInicioR": req.body.HoraInicioR,
                        "HoraFinR": req.body.HoraFinR,
                        "FKLokModalidadServ": req.body.FKLokModalidadServ,
                        "FechaHoraDescargue": req.body.FechaHoraDescargue,
                        "NotasDatosEntrega": req.body.NotasDatosEntrega,
                        "critico": req.body.critico,
                    };
                    console.log(data);
                    /*let missingFields = [];
                    for (let [key, value] of Object.entries(data)) {
                        if (value === undefined) {
                            missingFields.push(key);
                        }
                    }
                    if (missingFields.length > 0) {
                        res.json({success : false, message : "faltan campos requeridos"});
                    }else{
                        let resultado=await sqlconfig.queryProcedure('LokUpdateContractIDwhenEdit', data);
                        res.json({success : true, data : resultado.recordsets[0]});
                    }*/

                    let resultado=await sqlconfig.queryProcedure('LokUpdateContractIDwhenEdit', data);
                    res.json({success : true, data : resultado.recordsets[0]});

                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_tiporeportes = async (req, res) => {
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
                    consulta = "SELECT IdTipoReporte, TipoReporte FROM ICTipoReporte WHERE MostrarTR = 1 ORDER BY TipoReporte";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_tipoacciones = async (req, res) => {
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
                    consulta = "SELECT IdTipoAccion, TipoAccion FROM LokTipoAccion WHERE MostrarT = 1 ORDER BY TipoAccion";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_reportetraficoid = async (req, res) => {
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
                    var id= req.body.IdReport;
                    consulta = "SELECT * FROM LokReport WHERE IdReport = " + id;
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_aseguradotiporeporte = async (req, res) => {
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
                    var id= req.body.FKICTipoReporte;
                    consulta = "select Asegurar from ICTipoReporte where IdTipoReporte = " + id;
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

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
                    var contrato= req.body.contrato;
                    consulta = "SELECT LokReport.IdReport, ICTipoReporte.TipoReporte, Ubicacion, Nota + CASE WHEN LokReport.ReporteAut = 1 THEN ' (A)' ELSE '' END AS Nota, XTime, XUser, LokTipoAccion.TipoAccion ";
                    consulta += "FROM LokReport INNER JOIN ICTipoReporte ON LokReport.FKICTipoReporte = ICTipoReporte.IdTipoReporte ";
                    consulta += "INNER JOIN LokTipoAccion ON LokReport.FKLokTipoAccion = LokTipoAccion.IdTipoAccion ";
                    consulta += "WHERE FKLokContractID = '" + contrato + "' ORDER BY LokReport.XTime DESC";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.delete_reportetrafico = async (req, res) => {
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
                        "IdReport": req.body.IdReport,
                        "XUser": decoded.username,
                    };
                    let resultado=await sqlconfig.queryProcedure('LokDeleteReport', data);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.insert_reportetrafico = async (req, res) => {
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
                        "FKICTipoReporte": req.body.FKICTipoReporte,
                        "FKLokTipoAccion": req.body.FKLokTipoAccion,
                        "Ubicacion": req.body.Ubicacion,
                        "Nota": req.body.Nota,
                        "XTime": req.body.XTime,
                        "XUser": decoded.username,
                        "FKLokContractID": req.body.FKLokContractID,
                        "Individual": req.body.Individual,
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

controller.update_reportetrafico = async (req, res) => {
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
                        "FKICTipoReporte": req.body.FKICTipoReporte,
                        "FKLokTipoAccion": req.body.FKLokTipoAccion,
                        "Ubicacion": req.body.Ubicacion,
                        "Nota": req.body.Nota,
                        "IdReport": req.body.IdReport,
                        "XUser": decoded.username

                    };
                    let resultado=await sqlconfig.queryProcedure('LokUpdateReportwhenEdit', data);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.insert_filtro = async (req, res) => {
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
                    if(req.body.IdFiltro == -1){
                        var consulta = "INSERT INTO CtFiltrosTrafico (DescripcionFiltro, FiltroJson, FkIdUser) VALUES ("+
                        "'"+req.body.DescripcionFiltro+"','"+req.body.FiltroJson+"','"+req.body.FkIdUser+"')";
                        res.json({success : true, data : await sqlconfig.query(consulta)});
                    }else{
                        try{
                            var consulta = "UPDATE CtFiltrosTrafico SET DescripcionFiltro='"+req.body.DescripcionFiltro+"', FiltroJson='"+req.body.FiltroJson+"', FkIdUser='"+req.body.FkIdUser+"' WHERE IdFiltro="+req.body.IdFiltro;
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

controller.delete_filtro = async (req, res) => {
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
                    if(req.body.IdFiltro != -1){
                        var consulta = "DELETE FROM CtFiltrosTrafico WHERE IdFiltro="+req.body.IdFiltro+" AND FkIdUser='"+decoded.username+"'";
                        res.json({success : true, data : await sqlconfig.query(consulta)});
                    }
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }

}

controller.get_filtros = async (req, res) => {
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
                    consulta = "SELECT IdFiltro, DescripcionFiltro, FiltroJson FROM CtFiltrosTrafico where FkIdUser='"+decoded.username+"'";
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
