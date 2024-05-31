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
                    +" THEN 'Hora-Nula Fecha-Nula' else CONVERT(nvarchar(30), FechaHoraCita, 120) end AS Hora, s.FKLokEstados , DescripcionRuta + '' + CASE WHEN n.FKLokClienteExt = 0 THEN '' ELSE '( ' + x.Descripcion + ' )' END AS Ruta,"
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
                        consulta += " AND LokSolicitudes.FKICEmpresa = " + decoded.idempresa;
                    }
                    consulta += " ORDER BY FechaHoraCita";
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
