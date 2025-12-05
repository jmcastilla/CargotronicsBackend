require('dotenv').config();
const cron = require('node-cron');

// Importar funciones principales de cada script
const { procesarPlacas } = require('./servicio');

// ================== SCHEDULERS ==================

// Inventario - cada 30 min
cron.schedule('* * * * *', () => {
  console.log(`[cron] placas`);
  await procesarPlacas();
});
