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
      AND d.FkLokCommOp = 1
  `;

  const resultado = await sqlconfig.query(consulta);

  if (!resultado.recordset || resultado.recordset.length === 0) {
    console.log("no hay placas");
    return [];
  }

  const placas = resultado.recordset.map(r => r.FKLokDeviceID); // <-- el campo que sea tu placa

  return placas;
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

  for (const placa of placas) {
    try {
      const info = await getUltimaPosicionPorPlaca(placa, token);

      if (!info) {
        console.log(`Sin info para placa ${placa}`);
        continue;
      }

      await guardarUltimaPosicion(info);
      console.log(`Guardado OK para placa ${placa}`);
    } catch (err) {
      console.error(`Error procesando placa ${placa}:`, err.message);
    }
  }

  return resultados;
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


async function guardarUltimaPosicion(info) {
  if (!info) return;

  const sql = `
    INSERT INTO mainData (
      deviceID,
      latitude,
      longitude,
      speed,
      datetime,
      bat
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  const params = [
    info.serviceCode,
    info.latitude,
    info.longitude,
    info.speed,
    info.generationDateGMT,
    100
  ];

  await mysqlPool.execute(sql, params);
}



module.exports = { procesarPlacas };
