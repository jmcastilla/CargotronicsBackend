const controller = {}
const jwt = require('jsonwebtoken');
var sqlconfig = require("../model/dbpool");


// FUNCION QUE RETORNA EL LISTADO DE ARRIBOS Y EMBARQUES
controller.get_arriboembarque = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            console.log(token);
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var consulta= "SELECT * FROM Dian_arriboembarque";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

// FUNCION QUE RETORNA EL LISTADO DE CONSIGNATARIO
controller.get_consignatarios = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            console.log(token);
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var consulta= "SELECT * FROM Dian_consignatario";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

// FUNCION QUE RETORNA EL LISTADO DE DECLARANTES
controller.get_declarantes = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            console.log(token);
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var consulta= "SELECT * FROM Dian_declarante";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

// FUNCION QUE RETORNA EL LISTADO DE DESTINATARIOS
controller.get_destinatarios = async (req, res) => {
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
                    var consulta= "SELECT * FROM Dian_destinatario";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

// FUNCION QUE RETORNA EL LISTADO DE SECCIONALES
controller.get_seccionales = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            console.log(token);
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                    var consulta= "SELECT * FROM Dian_seccionales";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

// FUNCION QUE RETORNA EL LISTADO DE TIPOS DOCUMENTOS ADUANEROS
controller.get_tiposdocaduanero = async (req, res) => {
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
                    var consulta= "SELECT * FROM Dian_tipodocaduanero";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

// FUNCION QUE RETORNA EL LISTADO DE DEPOSITOS Y ZONAS FRANCA
controller.get_depositoszonasfranca = async (req, res) => {
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
                    var consulta= "SELECT * FROM Dian_depositoszonafranca";
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}

//FUNCION QUE GUARDA O ACTUALIZA EL TRAYECTO
controller.save_contrato = async (req, res) => {
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
                        var consulta = "INSERT INTO Dian_contractID (FKContractID, TipoContenedor, NitDeclarante, NitDestinatario, NitConsignatorio, TipoDocAduanero, NumDocAduanero, Origen, AduanaPartida, AduanaDestino, Destino, DireccionDestinoFisica) VALUES ("+
                        "'"+req.body.contrato+"',"+req.body.tipocontenedor+","+req.body.declarante+","+req.body.destinatario+","+req.body.consignatario+",'"+req.body.tipodocaduanero+"','"+
                        req.body.numdocaduanero+"',"+req.body.origen+","+req.body.aduanapartida+","+req.body.aduanadestino+","+req.body.destino+",'"+req.body.direccion +"')";
                        res.json({success : true, data : await sqlconfig.query(consulta)});
                    }else{
                        try{
                            var consulta = "UPDATE Dian_contractID SET TipoContenedor="+req.body.tipocontenedor+", NitDeclarante="+req.body.declarante+", NitDestinatario="+req.body.destinatario+", NitConsignatorio="+req.body.consignatario+
                            ", TipoDocAduanero='"+req.body.tipodocaduanero+"', NumDocAduanero='"+req.body.numdocaduanero+"', Origen="+req.body.origen+", AduanaPartida="+req.body.aduanapartida+", AduanaDestino="+req.body.aduanadestino+
                            ", Destino="+req.body.destino+", DireccionDestinoFisica='"+req.body.direccion+"' WHERE ID="+req.body.ID;
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

// FUNCION QUE RETORNA EL LISTADO DE DEPOSITOS Y ZONAS FRANCA
controller.get_contratos = async (req, res) => {
    try{
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: 'Token is missing' });
        }else{
            token = req.headers.authorization.split(' ')[1];
            console.log(token);
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token' });
                } else {
                  var consulta= "SELECT * FROM Dian_contractID WHERE FKContractID='"+req.body.contrato+"'";
                  let resultado=await sqlconfig.query(consulta);
                  res.json({success : true, data : resultado.recordset});
                }
            });
        }
    }catch(err){
        res.json({success : false});
    }
}


module.exports = controller;
