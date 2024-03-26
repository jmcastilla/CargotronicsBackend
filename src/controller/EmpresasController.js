const controller = {}
const jwt = require('jsonwebtoken');
var sqlconfig = require("../model/dbpool");

// FUNCION QUE RETORNA EL LISTADO DE EMPRESAS POR PROYECTO
controller.list_empresas = async (req, res) => {
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
                    var consulta= "SELECT IdEmpresa, NombreEmpresa FROM ICEmpresa WHERE FKLokProyectoEmpresa="+decoded.proyecto;
                    console.log(consulta);
                    let resultado=await sqlconfig.query(consulta);
                    res.json({success : true, data : resultado.recordsets[0]});
                }
            });
        }
    }catch(err){
        console.log(err);
        res.json({success : false});
    }

}

module.exports = controller;
