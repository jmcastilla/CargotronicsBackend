
const fs = require('fs');
const path = require('path');
const net = require("net");

const client = net.createConnection({ port: 232, host: 'localhost' });


const filePath = path.join(__dirname, 'imagen.jpg');

fs.createReadStream(filePath).pipe(client);
client.write('imagen.jpg', 'utf-8');
