// model/db-mysql.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: '104.236.24.69',
  user: 'logiseguridad',
  password: 'LogisegXYZ',
  database: 'PlacasGps',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
