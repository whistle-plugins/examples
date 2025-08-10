import { Transform } from 'stream';

export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  server.on('connect', (req: Whistle.PluginRequest, socket: Whistle.PluginSocket) => {
    const transform = new Transform();
    transform._transform = (chunk, encoding, callback) => {
      callback(null, Buffer.concat([Buffer.from('1111111111--'), chunk]));
    };
    socket.pipe(transform).pipe(socket);
  });
};
