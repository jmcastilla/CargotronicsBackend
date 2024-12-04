  //10.0.5.2 50.57.222.231
  const configuracionTest = {
    IP_BD: "50.57.222.231",
    NAME_BD: "infocargatest",
    PUERTO: 3002,
    TIME_TRAFICO: 30000,
    HB_SOLICITUDES: 60000,
  }

  const configuracionProd = {
    IP_BD: "10.0.5.2",
    NAME_BD: "infocarga",
    PUERTO: 5000,
    TIME_TRAFICO: 10000,
    HB_SOLICITUDES: 60000,
  }
  module.exports = configuracionTest;
