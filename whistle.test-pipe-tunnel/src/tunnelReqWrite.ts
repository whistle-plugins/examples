import { Transform } from 'stream';

export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  server.on('connect', (req: Whistle.PluginRequest, socket: Whistle.PluginSocket) => {
    const transform = new Transform();
    const { originalReq: { pipeValue } } = req;
    transform._transform = (chunk, encoding, callback) => {
      callback(null, Buffer.concat([chunk, Buffer.from(`--${pipeValue}2222222222`)]));
    };
    socket.pipe(transform).pipe(socket);
  });
};
