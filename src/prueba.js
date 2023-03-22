const net = require('net');
const fs = require('fs');

const client = net.createConnection({ port: 232, host: 'localhost' }, () => {
  console.log('Connected to server!');

  // Reading the photo file and converting it to a buffer
  const photoBuffer = fs.readFileSync('2022_11_06_10_29_16_738_8000632214_SOR528_1__pichichi_3.77413068_-76.28152687.jpg');

  // Sending the photo and name to the Java server
  const message = '2022_11_06_10_29_16_738_8000632214_SOR528_1__pichichi_3.77413068_-76.28152687.jpg';
  const messageBuffer = Buffer.from(message, 'utf8');
  const messageLength = messageBuffer.length;
  const buffer = Buffer.alloc(2 + messageLength);
  buffer.writeUInt16BE(messageLength, 0);
  messageBuffer.copy(buffer, 2);
  client.write(buffer);
  fs.createReadStream('./2022_11_06_10_29_16_738_8000632214_SOR528_1__pichichi_3.77413068_-76.28152687.jpg').pipe(client);
});

client.on('data', (data) => {
    console.log(`Received data from server: ${data.toString('utf8')}`);
    client.end(); // Close the connection after receiving data from the server
});

client.on('end', () => {
    console.log('Disconnected from server');
});
