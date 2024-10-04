const controller = {}
const jwt = require('jsonwebtoken');
const axios = require('axios');
var sqlconfig = require("../model/dbpool");
const moment = require('moment');
const crypto = require('crypto');

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

controller.get_listaproyectos = async (req, res) => {
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
                    var consulta= "select * from LokProyectos";
                    if(decoded.proyecto !== 1){
                        consulta+=" where IDProyecto = " + decoded.proyecto + " or ProyectoOwner = " + decoded.proyecto;
                    }
                    consulta+=" ORDER BY Descripcion ASC ";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_listaempresa = async (req, res) => {
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
                    var proyecto= req.body.proyecto;
                    var consulta= "SELECT DISTINCT IdEmpresa, NombreEmpresa FROM ICEmpresa WHERE FKLokProyectoEmpresa ="+proyecto+" ORDER BY NombreEmpresa";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_listaempresasFijaInventario = async (req, res) => {
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
                    var proyecto= req.body.proyecto;
                    var consulta= "SELECT IdEmpresa, NombreEmpresa FROM ICEmpresa ";
                    consulta+="WHERE FKLokProyectoEmpresa = "+proyecto+" AND InventarioE = 1 ";
                    consulta+="ORDER BY NombreEmpresa ";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_listaRolusuarios = async (req, res) => {
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
                    var proyecto= req.body.proyecto;
                    var consulta= "SELECT IDRol, NombreRol FROM LokRoles ";
                    if(decoded.tipouser === 9){
                        if(decoded.proyecto === 9 || decoded.proyecto === 11){
                            consulta += " WHERE IDRol = 9 OR IDRol = 6 OR IDRol = 12 OR IDRol = 5 OR IDRol = 13 ";
                        }else{
                            consulta += " WHERE IDRol = 9 OR IDRol = 6 OR IDRol = 12 OR IDRol = 5 ";
                        }
                    }else{
                        if(decoded.tipouser !== 1){
                            consulta += " WHERE IDRolPadre = " + decoded.tipouser;
                        }
                    }
                    consulta+= " ORDER BY NombreRol ";
                    console.log(consulta);
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_listaRolTrafico = async (req, res) => {
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
                    var proyecto= req.body.proyecto;
                    var consulta= "SELECT descr_roltrafico, id_roltrafico from LokRolTrafico where fklproyecto = "+proyecto;
                    consulta+= " ORDER BY descr_roltrafico ";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_listaIps = async (req, res) => {
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
                    var proyecto= req.body.proyecto;
                    var consulta= "SELECT id_direccion, Nombre_direccion FROM LokDireccionesIp WHERE fklproyecto = "+proyecto;
                    consulta+= " ORDER BY Nombre_direccion ";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}


controller.crear_ip = async (req, res) => {
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
                    var nombre=req.body.nombre;
                    var proyecto=req.body.proyecto;
                    var ip=req.body.ip;
                    var consulta = "INSERT LokDireccionesIp(Nombre_direccion, fklproyecto, direccion_ip) VALUES ("+
                    "'"+nombre+"',"+proyecto+",'"+ip+"')";

                    res.json({success : true, data : await sqlconfig.query(consulta)});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_obtenerusuario = async (req, res) => {
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
                    var nick= req.body.username;
                    var consulta= "SELECT IdUser, Inventario, Geocerca, CreacionRutas, Trafico, ModificarDisp, ipfija, NombreEmpresa, Descripcion, NombreRol, comando, direccion_ip, Nombre_direccion, CorreoUsers  ";
                    consulta += " FROM ICUsers INNER JOIN ICEmpresa ON FKICEmpresa = IdEmpresa INNER JOIN LokProyectos ON FKProyecto = IDProyecto ";
                    consulta += " INNER JOIN LokRoles ON tipoUser = IDRol LEFT JOIN LokDireccionesIp ON id_direccion = FKIp WHERE IdUser = '" + nick + "'";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.inhabilitar_usuario = async (req, res) => {
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
                    var username=req.body.username;
                    var consulta = "UPDATE ICUsers SET Pwd = '-' AND Activo = 0 WHERE IdUser ="+username;

                    res.json({success : true, data : await sqlconfig.query(consulta)});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.insert_usuario = async (req, res) => {
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
                    var idUser=req.body.IdUser;
                    var fKICEmpresa = req.body.FKICEmpresa;
                    var tipouser = req.body.tipouser;
                    var fkproyecto = req.body.FKProyecto;
                    var salt = getRandomFileName();
                    var password = req.body.Pwd;
                    var inventario = req.body.Inventario;
                    var geocerca = req.body.Geocerca;
                    var creacionRutas = req.body.CreacionRutas;
                    var trafico = req.body.Trafico;
                    var ipfija = req.body.ipfija;
                    var rolTrafico = req.body.RolTrafico;
                    var comando = req.body.comando;
                    var nombreCompleto = req.body.NombreCompleto;
                    var fKIp = req.body.FKIp;
                    var correoUsers = req.body.CorreoUsers;
                    var empresaInventario = req.body.EmpresaInventario;
                    const consulta = `
                      INSERT INTO ICUsers
                      (IdUser, Pwd, FKICEmpresa, tipoUser, FKProyecto, Salt, Inventario, Geocerca, CreacionRutas, Trafico,
                      ipfija, RolTrafico, comando, NombreCompleto, FKIp, CorreoUsers, EmpresaInventario)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                    const values = [
                      idUser, password, fKICEmpresa, tipouser, fkproyecto, salt, inventario, geocerca, creacionRutas, trafico,
                      ipfija, rolTrafico, comando, nombreCompleto, fKIp, correoUsers, empresaInventario
                    ];

                    res.json({success : true, data : await sqlconfig.query(consulta, values)});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

function getRandomFileName() {
    const array = crypto.randomBytes(10);
    let fileName = toBase32StringSuitableForDirName(array);

    // Reemplazar el carácter en la posición 8 con un punto
    fileName = fileName.substring(0, 8) + '.' + fileName.substring(9, 12);

    return fileName;
}

function toBase32StringSuitableForDirName(buffer) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'; // Base32 alphabet
    let bits = 0;
    let value = 0;
    let output = '';

    for (let i = 0; i < buffer.length; i++) {
        value = (value << 8) | buffer[i];
        bits += 8;

        while (bits >= 5) {
            output += alphabet[(value >>> (bits - 5)) & 31];
            bits -= 5;
        }
    }

    if (bits > 0) {
        output += alphabet[(value << (5 - bits)) & 31];
    }

    return output;
}

module.exports = controller;
