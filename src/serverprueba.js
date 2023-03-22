var fs = require('fs');

const net = require("net");
const path = require('path');
const filePath = path.join(__dirname, 'imagen.jpg');

const server = net.createServer((socket) => {
  console.log('New client connected');
  const imageParts = [];
  socket.on('data', (data) => {
    // Procesar la foto recibida
    imageParts.push(data);
    console.log(imageParts.length);
  });
  socket.on('end', () => {
    const imageBuffer = Buffer.concat(imageParts);
    fs.writeFile(filePath, imageBuffer, (err) => {
      if (err) throw err;

      console.log('La imagen se ha guardado correctamente');
    });
  });
});

server.listen(9000, 'localhost', () => {
  console.log('Server listening on port 3000');
});
