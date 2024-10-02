const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//METADATA INFO DE LA API_KEY
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: 'Infocarga API', version: "1.0.0"},
  },
  apis: ["./routes/OperacionesRoute.js", "./routes/EmpresasRoute.js", "./routes/SolicitudesRoute.js", "./routes/MaestrosRoute.js", "./routes/ContratosRoute.js", "./routes/UsuariosRoute.js", "index.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api/v1/docs.json',(req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  })
};

module.exports = {swaggerDocs};
