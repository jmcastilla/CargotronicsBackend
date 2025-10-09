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
                    if(decoded.proyecto !== 1){
                      consulta+=" AND (p.IDProyecto = " + decoded.proyecto + " OR p.ProyectoOwner = " + decoded.proyecto + ")";
                    }
                    if(decoded.tipouser !== 1){
                      consulta+=" AND r.Jerarquia > "+decoded.jerarquia;
                    }
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
                    if(decoded.tipouser === 1){
                      consulta+="WHERE Jerarquia >="+decoded.jerarquia;
                    }else{
                      consulta+="WHERE Jerarquia >"+decoded.jerarquia;
                    }
                    /*if(decoded.tipouser === 9){
                        if(decoded.proyecto === 9 || decoded.proyecto === 11){
                            consulta += " WHERE IDRol = 9 OR IDRol = 6 OR IDRol = 12 OR IDRol = 5 OR IDRol = 13 ";
                        }else{
                            consulta += " WHERE IDRol = 9 OR IDRol = 6 OR IDRol = 12 OR IDRol = 5 ";
                        }
                    }else{
                        if(decoded.tipouser !== 1){
                            consulta += " WHERE IDRolPadre = " + decoded.tipouser;
                        }
                    }*/
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

controller.crear_rolusuario = async (req, res) => {
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
                    var iDRol=req.body.IDRol;
                    var nombreRol=req.body.NombreRol;
                    var consulta="";
                    if(iDRol === -1 ){
                        consulta = "INSERT LokRoles(NombreRol, IDRolPadre, Jerarquia) VALUES ("+
                        "'"+nombreRol+"',NULL,99)";
                    }else{
                        consulta = "UPDATE LokRoles SET NombreRol = '"+nombreRol+"' WHERE IDRol="+iDRol;
                    }


                    res.json({success : true, data : await sqlconfig.query(consulta)});
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
                    var consulta= "SELECT IdUser, FKICEmpresa, RolTrafico, tipoUser, FKProyecto , Inventario,  GeoCerca, CreacionRutas, "+
                    "Trafico, ModificarDisp, ipfija, comando, id_direccion, NombreCompleto, CorreoUsers, EmpresaInventario, EmpresasTrafico FROM ICUsers "+
                    "LEFT JOIN LokDireccionesIp ON id_direccion = FKIp WHERE IdUser = '" + nick + "'";
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
                    var consulta = "UPDATE ICUsers SET Pwd = '-', Activo = 0 WHERE IdUser ='"+username+"'";

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
                    var password = hashString(req.body.Pwd, salt);
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
                    var empresasTrafico = req.body.EmpresasTrafico;
                    const consulta = `
                    INSERT INTO ICUsers (IdUser, Pwd, FKICEmpresa, tipoUser, FKProyecto, Salt, Inventario, Geocerca, CreacionRutas, Trafico,
                    ipfija, RolTrafico, comando, NombreCompleto, FKIp, CorreoUsers, EmpresaInventario, EmpresasTrafico)
                    VALUES ('${idUser}', '${password}', '${fKICEmpresa}', '${tipouser}', '${fkproyecto}', '${salt}', '${inventario}',
                    '${geocerca}', '${creacionRutas}', '${trafico}', '${ipfija}', '${rolTrafico}', '${comando}',
                    '${nombreCompleto}', '${fKIp}', '${correoUsers}', '${empresaInventario}', '${empresasTrafico}')`;
                    console.log(consulta);

                    res.json({success : true, data : await sqlconfig.query(consulta)});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.update_usuario = async (req, res) => {
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
                    var password = hashString(req.body.Pwd, salt);
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
                    var cambiar = req.body.cambiar;
                    var empresasTrafico = req.body.EmpresasTrafico;

                    var consulta = `
                    UPDATE ICUsers SET FKICEmpresa ='${fKICEmpresa}', tipoUser ='${tipouser}', FKProyecto ='${fkproyecto}',
                    Inventario ='${inventario}', Geocerca ='${geocerca}', CreacionRutas ='${creacionRutas}', Trafico ='${trafico}',
                    ipfija ='${ipfija}', RolTrafico ='${rolTrafico}', comando ='${comando}', NombreCompleto ='${nombreCompleto}',
                    FKIp ='${fKIp}', CorreoUsers ='${correoUsers}', EmpresaInventario ='${empresaInventario}', EmpresasTrafico ='${empresasTrafico}' WHERE IdUser ='${idUser}'`;

                    if(cambiar){
                      consulta = `
                      UPDATE ICUsers SET Pwd ='${password}', Salt ='${salt}', FKICEmpresa ='${fKICEmpresa}', tipoUser ='${tipouser}', FKProyecto ='${fkproyecto}',
                      Inventario ='${inventario}', Geocerca ='${geocerca}', CreacionRutas ='${creacionRutas}', Trafico ='${trafico}',
                      ipfija ='${ipfija}', RolTrafico ='${rolTrafico}', comando ='${comando}', NombreCompleto ='${nombreCompleto}',
                      FKIp ='${fKIp}', CorreoUsers ='${correoUsers}', EmpresaInventario ='${empresaInventario}', EmpresasTrafico ='${empresasTrafico}' WHERE IdUser ='${idUser}'`;
                    }

                    res.json({success : true, data : await sqlconfig.query(consulta)});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.update_usuariopass = async (req, res) => {
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
                    var idUser=decoded.username;
                    var salt = getRandomFileName();
                    var password = hashString(req.body.Pwd, salt);

                    const consulta = `
                      UPDATE ICUsers SET Pwd ='${password}', Salt ='${salt}' WHERE IdUser ='${idUser}'`;

                    res.json({success : true, data : await sqlconfig.query(consulta)});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.update_usuariopass2 = async (req, res) => {
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
                    var idUser=req.body.idUser;
                    var salt = getRandomFileName();
                    var password = hashString(req.body.Pwd, salt);

                    const consulta = `
                      UPDATE ICUsers SET Pwd ='${password}', Salt ='${salt}' WHERE IdUser ='${idUser}'`;
                    console.log(consulta);
                    res.json({success : true, data : await sqlconfig.query(consulta)});
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


function hashString(pass, salt) {
    const convertir = `${pass}|${salt}`;
    const sha256 = crypto.createHash('sha256');  // Crea un hash SHA256
    const hash = sha256.update(convertir, 'utf8').digest('hex');  // Codifica a hexadecimales
    return hash;
}


controller.get_configuracionPagina = async (req, res) => {
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
                    var pagina= req.body.pagina;
                    var rol= decoded.tipouser;
                    var consulta= "SELECT bitOpen, bitInsert, bitEdit, bitDelete FROM CtPermisos WHERE IdPaginaP = " + pagina + " AND IdRolP = " + rol;
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}


controller.get_permisosrol = async (req, res) => {
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
                    var rol= req.body.tipouser;
                    var consulta= "SELECT pag.IdPagina, pag.DescripcionPagina, perm.IdRolP, perm.bitOpen, perm.bitInsert, perm.bitEdit, perm.bitDelete "+
                    "FROM CtPermisos as perm "+
                    "inner join CtPaginas AS pag on pag.IdPagina = perm.IdPaginaP WHERE perm.IdRolP="+rol;
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.update_permisos = async (req, res) => {
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
                    var pagina= req.body.IdPagina;
                    var rol= req.body.IdRolP;
                    var bitOpen= req.body.bitOpen;
                    var bitInsert= req.body.bitInsert;
                    var bitEdit= req.body.bitEdit;
                    var bitDelete= req.body.bitDelete;
                    var consulta = "UPDATE CtPermisos SET bitOpen = "+bitOpen+", bitInsert="+bitInsert+", bitEdit="+bitEdit+", bitDelete="+bitDelete+" WHERE IdPaginaP="+pagina+" AND IdRolP="+rol;

                    res.json({success : true, data : await sqlconfig.query(consulta)});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.get_paginas = async (req, res) => {
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
                    var rol= decoded.tipouser;
                    var consulta= "SELECT pag.IdPagina, pag.DescripcionPagina, pag.Notas "+
                    "FROM CtPaginas AS pag";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

controller.crear_pagina = async (req, res) => {
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
                    var idPagina=req.body.IdPagina;
                    var descripcionPagina=req.body.DescripcionPagina;
                    var consulta="";
                    if(idPagina === -1 ){
                        consulta = "INSERT CtPaginas(DescripcionPagina) VALUES ("+
                        "'"+descripcionPagina+"')";
                    }else{
                        consulta = "UPDATE CtPaginas SET DescripcionPagina = '"+descripcionPagina+"' WHERE IdPagina="+idPagina;
                    }
                    res.json({success : true, data : await sqlconfig.query(consulta)});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

module.exports = controller;
