var sql = require("mssql");

// DATOS DE CONFIGURACIÓN DE LA BASE DE DATOS
/*var config1 = {
    user: 'juan',
    password: 'Logiset.1',
    server: '172.24.16.32',
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
    server: '172.24.16.32',
    database: 'reportes2',
    synchronize: true,
    trustServerCertificate: true,
    connectionTimeout: 60000,
    requestTimeout:60000,
    port: 1433
}*/

/*var config1 = {
    user: 'juan',
    password: 'Logiset.1',
    server: '72.32.44.32',
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
    server: '72.32.44.32',
    database: 'reportes2',
    synchronize: true,
    trustServerCertificate: true,
    connectionTimeout: 60000,
    requestTimeout:60000,
    port: 1433
}*/
var config1 = {
    user: 'juan',
    password: 'Logiset.1',
    server: '50.57.222.231',
    database: 'infocargatest',
    synchronize: true,
    trustServerCertificate: true,
    connectionTimeout: 60000,
    requestTimeout:60000,
    port: 1433,
    options: {
        enableArithAbort: true
    }
}

var config2 = {
    user: 'juan',
    password: 'Logiset.1',
    server: '50.57.222.231',
    database: 'reportes2',
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

let queryProcedure = function( procedureName, params ) {
    // devolver una promesa
    return new Promise(( resolve, reject ) => {
        conn1.connect(config1).then(() => {
            var request = new sql.Request(conn1);
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

const registerNotification = function(queueName) {
    return new Promise((resolve, reject) => {
        const conn = new sql.ConnectionPool(config1);

        conn.connect().then(() => {
            const request = new sql.Request(conn);

            // Ejecuta una consulta para recibir mensajes de la cola
            const queryText = `
                WAITFOR (
                    RECEIVE TOP(1)
                    message_body
                    FROM ${queueName}
                ), TIMEOUT 5000;  -- 5000 ms de tiempo de espera
            `;

            function listenToQueue() {
                request.query(queryText, (err, result) => {
                    if (err) {
                        console.error("Error en la consulta de la cola:", err);
                        reject(err);
                        return;
                    }

                    if (result.recordset.length > 0) {
                        const message = result.recordset[0].message_body;
                        console.log("Mensaje recibido de la cola:", message);
                        resolve(message);
                    } else {
                        // Si no hay mensajes, sigue escuchando
                        listenToQueue();
                    }
                });
            }

            // Inicia la escucha de la cola
            listenToQueue();
        }).catch((err) => {
            console.error("Error al conectar:", err);
            reject(err);
        });
    });
};

/*const registerNotification = function(queryText) {
    return new Promise((resolve, reject) => {
        const conn = new sql.ConnectionPool(config1);

        conn.connect().then(() => {
            const request = new sql.Request(conn);

            // Configura el evento de notificación
            request.on('notification', msg => {
                console.log("Notificación recibida:", msg);
                resolve(msg);
            });

            // Ejecutar la consulta para activar la notificación
            request.query(queryText, (err, result) => {
                if (err) {
                    console.error("Error en la consulta:", err);
                    reject(err);
                    return;
                }
                resolve(result.recordset);
            });
        }).catch((err) => {
            console.error("Error al conectar:", err);
            reject(err);
        });
    });
};

let registerNotification = function(queryText) {
    return new Promise((resolve, reject) => {
        // Crear una nueva conexión de base de datos
        const conn = new sql.ConnectionPool(config1);

        conn.connect().then(() => {
            const request = new sql.Request(conn);

            // Configurar el evento de notificación
            request.on('notification', msg => {
                console.log("Notificación recibida de SQL Server:", msg);
                resolve(msg);
            });

            // Ejecutar la consulta para activar la notificación
            request.query(queryText, (err, result) => {
                if (err) {
                    console.error("Error en la consulta de notificación:", err);
                    reject(err); // Rechazar en caso de error
                    return;
                }

                // Resolver con el resultado inicial de la consulta si es necesario
                resolve(result.recordset);
            });
        }).catch((err) => {
            console.error("Error al conectar para notificación:", err);
            reject(err);
        });
    });
};*/

var server= "Dev";
if(config1.server == '72.32.44.32'){
    server= "Prod";
}


module.exports = {
  "query":query,
  "registerNotification": registerNotification,
  "query2":query2,
  "query2Procedure":query2Procedure,
  "queryProcedure":queryProcedure,
  "server":server
}
