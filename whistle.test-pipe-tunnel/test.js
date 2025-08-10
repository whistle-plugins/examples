const net = require('net');
const lack = require('lack-proxy');

lack.proxy({
    host: '127.0.0.1',
    port: '8899',
});

const socket = net.connect({
  host: 'test-pipe-tunnel.example.com',
  port: 80,
});
socket.on('error', console.error);
socket.on('data', (data) => {
  console.log(`Receive: ${data}`);
});

setInterval(() => {
  const msg = `send data to test-pipe-tunnel ${Date.now()}`;
  console.log(`Send: ${msg}`);
  socket.write(msg);
}, 3000);
