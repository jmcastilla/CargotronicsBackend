var express = require('express');
var app = express();
var mssql = require("mssql");
var cors = require('cors');
var app = express();
var sqlconfig = require("./model/dbpool");
var FormData = require('form-data');
const axios = require('axios');
var mysqlPool =require('./model/db-mysql.js');


async function getToken() {
  const form = new FormData();

  // Respeta exactamente los nombres de los campos que usas en Postman
  form.append('Client_id', "external-client-inverloset01");
  form.append('Grant_type', 'client_credentials'); // o desde env si quieres
  form.append('Username', "logiseguridad");
  form.append('Password', "Logi12345");
  form.append('Client_Secret', "mkAJaSNfnBCXcfew47RQxJAZIUC8tWkU");

  const response = await axios.post(
    'https://externalsecurityapi.satrack.com/api/v1/Keycloak/authenticate',
    form,
    {
      headers: {
        ...form.getHeaders(), // pone el boundary de multipart/form-data
      },
    }
  );
  // Ejemplos de extracción del token:
  const data = response.data;

  // Si fuera estilo Keycloak estándar:
  if (data.access_token) return data.access_token;

  // Si devolviera { token: '...' }
  if (data.token) return data.token;

  // Si devolviera texto tipo "Token abc..."
  if (typeof data === 'string') {
    return data.startsWith('Token') ? data.split(' ').pop() : data;
  }

  throw new Error('No se pudo encontrar el token en la respuesta');
}

async function getPlacas() {
  const consulta = `
    SELECT TOP (1000) c.FKLokDeviceID
    FROM LokContractID c
    INNER JOIN LokDeviceID d ON c.FKLokDeviceID = d.DeviceID
    WHERE c.LokTipoServicios = 12
      AND c.Active = 1
      AND d.FKCtOperadorGPS = 1
  `;

  const resultado = await sqlconfig.query(consulta);

  if (!resultado.recordset || resultado.recordset.length === 0) {
    console.log("no hay placas");
    return [];
  }

  const placas = resultado.recordset.map(r => r.FKLokDeviceID); // <-- el campo que sea tu placa

  return placas;
}

async function getPlacasLogitrack() {
  /*const consulta = `
    SELECT TOP (1000) c.FKLokDeviceID as placa, d.UsuarioS AS usuario, d.ClaveS AS clave
    FROM LokContractID c
    INNER JOIN LokDeviceID d ON c.FKLokDeviceID = d.DeviceID
    WHERE c.LokTipoServicios = 12
      AND c.Active = 1
      AND d.FkLokCommOp = 2
      AND d.UsuarioS IS NOT NULL
      AND LTRIM(RTRIM(d.UsuarioS)) <> ''
      AND d.ClaveS IS NOT NULL
      AND LTRIM(RTRIM(d.ClaveS)) <> ''
  `;*/

  const consulta = `
    SELECT TOP (1000) c.FKLokDeviceID as placa, d.UsuarioS AS usuario, d.ClaveS AS clave, o.OperadorGPS as provider
    FROM LokContractID c
    INNER JOIN LokDeviceID d ON c.FKLokDeviceID = d.DeviceID
    INNER JOIN CtOperadorGPS o ON o.IdOperadorGPS =d.FKCtOperadorGPS
    WHERE c.LokTipoServicios = 12
      AND c.Active = 1
      AND d.FKCtOperadorGPS <> 1
      AND d.UsuarioS IS NOT NULL
      AND LTRIM(RTRIM(d.UsuarioS)) <> ''
      AND d.ClaveS IS NOT NULL
      AND LTRIM(RTRIM(d.ClaveS)) <> ''
  `;

  const resultado = await sqlconfig.query(consulta);

  if (!resultado.recordset || resultado.recordset.length === 0) {
    console.log("no hay placas");
    return [];
  }

  return resultado.recordset;
}


async function procesarPlacas() {
  const token = await getToken();
  const placas = await getPlacas();

  if (placas.length === 0) {
    console.log('No hay placas para procesar');
    return [];
  }

  // Si quieres ir de a una (secuencial, más seguro para no saturar el API):
  const resultados = [];
  console.log(placas);
  for (const placa of placas) {
    try {
      const info = await getUltimaPosicionPorPlaca(placa, token);

      if (!info) {
        console.log(`Sin info para placa ${placa}`);
        continue;
      }

      await guardarUltimaPosicion(info, "Satrack");
      console.log(`Guardado OK para placa ${placa}`);
    } catch (err) {
      console.error(`Error procesando placa ${placa}:`, err.message);
    }
  }

  return resultados;
}

async function procesarPlacasLogitrack() {
  const registros = await getPlacasLogitrack();

  if (registros.length === 0) {
    console.log('No hay placas para procesar');
    return [];
  }

  for (const { placa, usuario, clave, provider } of registros) {
    try {
      const info = await getUltimaPosicionPorPlacaLogitrack(placa, usuario, clave, provider);

      if (!info) {
        console.log(`Sin info para placa ${placa}`);
        continue;
      }

      console.log(info);
      await guardarUltimaPosicion(info, provider);
      console.log(`Guardado OK para placa ${placa}`);

    } catch (err) {
      console.error(`Error procesando placa ${placa}:`, err.message);
    }
  }
}


async function getUltimaPosicionPorPlaca(placa, token) {
  const query = `
    query {
      last(serviceCodes: ["${placa}"]) {
        serviceCode
        latitude
        longitude
        address
        town
        state
        district
        suburb
        direction
        generationDate
        generationDateEpoch
        generationDateGMT
        generationDateEpochGMT
        recordDate
        recordDateEpoch
        unifiedEventCode
        description
        speed
        odometer
        temperature
        ignition
        deviceType
        vehicleStatus
        locationStatus
        batteryLevel
        customerPoint
        customerPointDistance
        customerPointName
        id
        samePlaceMinutes
      }
    }
  `;

  const body = { query };

  const response = await axios.post(
    'http://locationintegrationapi.satrack.com/api/location',
    body,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,   // <--- aquí va el token
      },
    }
  );

  // Respuesta típica GraphQL: { data: { last: [...] } }
  const data = response.data;
  console.log(response.data);

  if (!data || !data.data || !data.data.last || data.data.last.length === 0) {
    return null; // no hay datos para esa placa
  }

  return data.data.last[0]; // primer (y normalmente único) registro
}

async function getUltimaPosicionPorPlacaLogitrack(placa, usuario, clave, provider) {
  const body = {
    password: clave,
    plate: placa,
    provider: provider,
    username: usuario
  };

  try {
    const response = await axios.post(
      'https://visuallogisticscontroltower.azurewebsites.net/vehicle/location',
      body,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );

    const data = response.data;

    const plateKey = Object.keys(data)[0];
    const info = data[plateKey];

    return {
      serviceCode: plateKey,
      generationDateGMT: new Date(info.event_time).toISOString(),
      speed: info.speed,
      latitude: info.coordinates[0],
      longitude: info.coordinates[1],
      provider: provider
    };

  } catch (err) {

    // Si la API devolvió un 500
    if (err.response) {
      console.error(`Error API Logitrack placa ${placa}:`, err.response.status, err.response.data);
    } else {
      // Error de red, timeout, DNS, etc.
      console.error(`Error Axios placa ${placa}:`, err.message);
    }

    // devolver null para que el for lo ignore
    return null;
  }
}




async function guardarUltimaPosicion(info, provider) {
  if (!info) return;


  const fechaEvento = new Date(info.generationDateGMT);
  const ahora = new Date();
  const diffMs = ahora.getTime() - fechaEvento.getTime();
  const diffMin = diffMs / 60000;

   if (diffMin >= 1) {
     console.log(
      `No se guarda ${info.serviceCode}: diferencia ${diffMin.toFixed(2)} min >= 1`
    );
    return;
   }
     const sql = `
       INSERT INTO mainData (
         deviceID,
         latitude,
         longitude,
         speed,
         datetime,
         bat,
         battery,
         insertDateTime,
         OperadorGps
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     `;
     console.log(sql);
     const params = [
       info.serviceCode,
       info.latitude,
       info.longitude,
       info.speed,
       info.generationDateGMT,
       100,
       100,
       ahora.toISOString(),
       provider
     ];
     await mysqlPool.execute(sql, params);


}



async function assignVehicle(serviceCode) {
  // Generar token internamente
  const token = await getToken();

  const body = {
    serviceCode: serviceCode,
    expiredDate: "2026-06-01T23:59:59",
    isEnabled: true
  };

  const url = "https://userintegrationapi.satrack.com/api/UserManager/assignmentVehicle";

  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`Asignación exitosa para ${serviceCode}:`, response.data);
    return response.data;

  } catch (error) {
    console.error(
      `Error asignando vehículo ${serviceCode}:`,
      error.response?.data || error.message
    );
    return null;
  }
}



function nowUtcForMysql() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');

  const year   = d.getUTCFullYear();
  const month  = pad(d.getUTCMonth() + 1);
  const day    = pad(d.getUTCDate());
  const hour   = pad(d.getUTCHours());
  const minute = pad(d.getUTCMinutes());
  const second = pad(d.getUTCSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}



module.exports = { procesarPlacas, assignVehicle, procesarPlacasLogitrack};
