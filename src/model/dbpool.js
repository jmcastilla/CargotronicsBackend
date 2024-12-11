var sql = require("mssql");
const Configuracion = require("../config");
console.log("base de datos: ",Configuracion.IP_BD);
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
    server: Configuracion.IP_BD,
    database: Configuracion.NAME_BD,
    synchronize: true,
    trustServerCertificate: true,
    connectionTimeout: 60000,
    requestTimeout:60000,
    port: 1433,
    options: {
        enableArithAbort: true
    }
}
//10.0.5.2 50.57.222.231
var config2 = {
    user: 'juan',
    password: 'Logiset.1',
    server: Configuracion.IP_BD,
    database: Configuracion.NAME_BD_REPORTES,
    synchronize: true,
    trustServerCertificate: true,
    connectionTimeout: 60000,
    requestTimeout:60000,
    port: 1433
}

var config3 = {
    user: 'juan',
    password: 'Logiset.1',
    server: Configuracion.IP_BD,
    database: Configuracion.NAME_BD_FOTOS,
    synchronize: true,
    trustServerCertificate: true,
    connectionTimeout: 60000,
    requestTimeout:60000,
    port: 1433
}

var conn1 = new sql.ConnectionPool(config1);
var conn2 = new sql.ConnectionPool(config2);
var conn3 = new sql.ConnectionPool(config3);

// FUNCION PARA REALIZAR CONSULTAS SQL
let query = function( sqlv, values ) {
    // devolver una promesa
    return new Promise(( resolve, reject ) => {
        conn1.connect(config1).then(() => {
            var request = new sql.Request(conn1);
            request.query(sqlv, function (err, recordset) {
                //conn1.close();
                if (err){
                    resolve(err);
                }else{
                    resolve(recordset);
                }
            });
        }).catch(err => {
            //conn1.close();
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
                //conn2.close();
                if (err){
                    resolve(err);
                }else{
                    resolve(recordset);
                }
            });
        }).catch(err => {
            //conn2.close();
            resolve(err);
        });
    });
}

let query3 = function( sqlv, values ) {
    // devolver una promesa
    return new Promise(( resolve, reject ) => {
        conn3.connect(config3).then(() => {
            var request = new sql.Request(conn3);
            request.query(sqlv, function (err, recordset) {
                //conn2.close();
                if (err){
                    resolve(err);
                }else{
                    resolve(recordset);
                }
            });
        }).catch(err => {
            //conn2.close();
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

const registerNotification = function(queueName, callback) {
    const conn = new sql.ConnectionPool(config1);

    conn.connect().then(() => {
        console.log("Conectado a la base de datos, escuchando notificaciones...");
        const request = new sql.Request(conn);

        // Configuración de la consulta para recibir mensajes de la cola
        const queryText = `
            WAITFOR (
                RECEIVE TOP(1)
                conversation_handle,
                message_type_name,
                message_body
                FROM ${queueName}
            ), TIMEOUT 10000;  -- 5000 ms de tiempo de espera
        `;

        function listenToQueue() {
            console.log("Esperando mensajes en la cola...");

            // Ejecuta la consulta para recibir un mensaje
            request.query(queryText, (err, result) => {

                if (err) {
                    console.error("Error en la consulta de la cola:", err);
                    // En caso de error, vuelve a intentar escuchar después de un segundo
                    setTimeout(listenToQueue, 1000);
                    return;
                }

                if (result.recordset.length > 0) {
                    const message = result.recordset[0];
                    if (message.message_type_name === 'http://schemas.microsoft.com/SQL/ServiceBroker/EndDialog') {
                        console.log('END DIALOG recibido, cerrando la conversación.');

                        // Cierra la conversación usando otra consulta sin await
                        const endRequest = new sql.Request(conn);
                        endRequest.query(`END CONVERSATION '${message.conversation_handle}'`, (endErr) => {

                            if (endErr) {
                                console.error("Error al cerrar la conversación:", endErr);
                            } else {
                                console.log("Conversación cerrada.");
                            }
                            // Continúa escuchando mensajes después de cerrar la conversación
                            listenToQueue();
                        });
                    } else {
                        // Procesar otros tipos de mensajes
                        const decodedMessage = message.message_body.toString('utf16le');
                        console.log('Mensaje procesado:', decodedMessage);

                        // Llama al callback con el mensaje recibido
                        callback(decodedMessage);

                        // Sigue escuchando para recibir más mensajes
                        listenToQueue();
                    }
                } else {
                    // Si no hay mensajes, vuelve a escuchar
                    listenToQueue();
                }
            });
        }

        // Inicia la escucha de la cola
        listenToQueue();
    }).catch((err) => {
        console.error("Error al conectar:", err);
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
  "query3":query3,
  "query2Procedure":query2Procedure,
  "queryProcedure":queryProcedure,
  "server":server
}
