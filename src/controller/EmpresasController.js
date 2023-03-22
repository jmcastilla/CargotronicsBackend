const controller = {}
var sqlconfig = require("../model/dbpool");

// FUNCION QUE RETORNA EL LISTADO DE EMPRESAS POR PROYECTO
controller.list_empresas = async (req, res) => {
    var log = req.session.loggedin;
    if (log == true) {
        var consulta= "SELECT IdEmpresa, NombreEmpresa FROM ICEmpresa WHERE FKLokProyectoEmpresa="+req.session.proyecto;
        console.log(consulta);
        let resultado=await sqlconfig.query(consulta);
        res.json({success : true, data : resultado.recordsets[0]});
    }else{
        res.json({success : false});
    }
}

module.exports = controller;
