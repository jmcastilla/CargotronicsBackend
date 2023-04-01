var sql = require("mssql");

// DATOS DE CONFIGURACIÓN DE LA BASE DE DATOS
var config = {
    user: 'juan',
    password: 'Logiset.1',
    server: '10.19.1.189',
    database: 'infocarga',
    synchronize: true,
    trustServerCertificate: true,
    connectionTimeout: 60000,
    requestTimeout:60000
}

// FUNCION PARA REALIZAR CONSULTAS SQL
let query = function( sqlv, values ) {
     // devolver una promesa
    return new Promise(( resolve, reject ) => {
        sql.connect(config, function (err) {

            if (err) console.log(err);
            var request = new sql.Request();
            request.query(sqlv, function (err, recordset) {

                if (err){
                    resolve( recordset );
                }else{
                    resolve( recordset );
                }
            });
        });
    });
}

module.exports = {
  "query":query
}
