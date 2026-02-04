  //10.0.5.2 50.57.222.231
  const configuracionTest = {
    IP_BD: "50.57.222.231",
    NAME_BD: "infocargatest",
    NAME_BD_REPORTES: "reportes2",
    NAME_BD_FOTOS: "reportes2",
    PUERTO: 3002,
    TIME_TRAFICO: 30000,
    HB_SOLICITUDES: 60000,
    PORT_WS_TRAFICO: 8081,
    PORT_WS_SOLICITUDES: 8080,
    PORT_WS_NOTIFICACIONES: 8083,
    URL_VISUALLOGISTIC: "visuallogisticstestyolo",
  }

  //visuallogisticstest

  const configuracionProd = {
    IP_BD: "10.0.5.2",
    NAME_BD: "infocarga",
    NAME_BD_REPORTES: "reportes2",
    NAME_BD_FOTOS: "reportes2",
    PUERTO: 5000,
    TIME_TRAFICO: 10000,
    HB_SOLICITUDES: 10000,
    PORT_WS_TRAFICO: 8081,
    PORT_WS_SOLICITUDES: 8082,
    PORT_WS_NOTIFICACIONES: 8083,
    URL_VISUALLOGISTIC: "visuallogisticsapp",
  }

  const configuracionMix = {
    IP_BD: "infocargatest.database.windows.net",
    NAME_BD: "infocargatest",
    NAME_BD_REPORTES: "reportes3",
    NAME_BD_FOTOS: "reportes3",
    PUERTO: 3002,
    TIME_TRAFICO: 30000,
    HB_SOLICITUDES: 60000,
    PORT_WS_TRAFICO: 8081,
    PORT_WS_SOLICITUDES: 8080,
    PORT_WS_NOTIFICACIONES: 8083,
    URL_VISUALLOGISTIC: "visuallogisticsapp",
  }

  module.exports = configuracionMix;
