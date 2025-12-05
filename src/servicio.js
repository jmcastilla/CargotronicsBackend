var express = require('express');
var app = express();
var mssql = require("mssql");
var cors = require('cors');
var app = express();
var sqlconfig = require("./model/dbpool");
var FormData = require('form-data');
const axios = require('axios');


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

async function getPlacas(){
    var consulta = "SELECT TOP (1000) c.FKLokDeviceID FROM LokContractID c INNER JOIN LokDeviceID d ON c.FKLokDeviceID = d.DeviceID where c.LokTipoServicios = 12 AND c.Active = 1 AND d.FkLokCommOp = 1";

    let resultado = await sqlconfig.query(consulta);
    console.log(resultado.recordset.length);
    if (resultado.recordset.length > 0) {
      const placas = resultado.recordset.map(row => row.FKLokDeviceID);

      console.log(placas);
    }else{
        console.log("no hay placas");
    }

}

getPlacas();
