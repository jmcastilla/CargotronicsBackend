// db-mysql.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // carga .env

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

// helper opcional para hacer queries rápido
export async function mysqlQuery(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export default pool;
