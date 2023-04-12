var sql = require("mssql");

// DATOS DE CONFIGURACIÓN DE LA BASE DE DATOS
var config1 = {
    user: 'juan',
    password: 'Logiset.1',
    server: '10.19.1.189',
    database: 'infocarga',
    synchronize: true,
    trustServerCertificate: true,
    connectionTimeout: 60000,
    requestTimeout:60000,
    port: 1433
}

var config2 = {
    user: 'juan',
    password: 'Logiset.1',
    server: '10.19.1.189',
    database: 'reportes',
    synchronize: true,
    trustServerCertificate: true,
    connectionTimeout: 60000,
    requestTimeout:60000,
    port: 1433
}

var conn1 = new sql.ConnectionPool(config1);
var conn2 = new sql.ConnectionPool(config2);

// FUNCION PARA REALIZAR CONSULTAS SQL
let query = function( sqlv, values ) {
    // devolver una promesa
    return new Promise(( resolve, reject ) => {
        conn1.connect(config1).then(() => {
            var request = new sql.Request(conn1);
            request.query(sqlv, function (err, recordset) {
                if (err){
                    resolve(err);
                }else{
                    resolve(recordset);
                }
            });
        }).catch(err => {
            resolve(err);
        });
    });
}

// FUNCION PARA REALIZAR CONSULTAS SQL
let query2 = function( sqlv, values ) {
    // devolver una promesa
    return new Promise(( resolve, reject ) => {
        conn2.connect(config2).then(() => {
            var request = new sql.Request(conn2);
            request.query(sqlv, function (err, recordset) {
                if (err){
                    resolve(err);
                }else{
                    resolve(recordset);
                }
            });
        }).catch(err => {
            resolve(err);
        });
    });
}

let query2Procedure = function( procedureName, params ) {
    // devolver una promesa
    return new Promise(( resolve, reject ) => {
        conn2.connect(config2).then(() => {
            var request = new sql.Request(conn2);
            // Configura los parámetros del stored procedure
            for (var key in params) {
              request.input(key, params[key]);
            }
            // Ejecuta el stored procedure
            request.execute(procedureName, function (err, recordset) {
                if (err){
                    resolve(err);
                }else{
                    resolve(recordset);
                }
            });
        }).catch(err => {
            resolve(err);
        });
    });
}




module.exports = {
  "query":query,
  "query2":query2,
  "query2Procedure":query2Procedure
}
