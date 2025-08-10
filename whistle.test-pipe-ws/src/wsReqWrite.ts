import { Transform } from 'stream';

export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  server.on('connect', (req: Whistle.PluginRequest, socket: Whistle.PluginSocket) => {
    const transform = new Transform();
    transform._transform = (chunk, encoding, callback) => {
      callback(null, Buffer.concat([chunk, Buffer.from('--2222222222')]));
    };
    socket.pipe(transform).pipe(socket);
  });
};
