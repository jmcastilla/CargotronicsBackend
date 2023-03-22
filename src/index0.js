
const fs = require('fs');
const path = require('path');
const net = require("net");

const filePath = path.join(__dirname, '20222222.jpg');
fs.readFile(filePath, (err, data) => {
    if (err) throw err;

    const client = net.connect({ port: 9000, host: 'localhost' }, () => {
      console.log('Connected to server');

    });
    client.write(data);
    client.end();

});
