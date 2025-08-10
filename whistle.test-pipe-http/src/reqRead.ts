
export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  const common = options.require('./lib/util/common');
  server.on('request', (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
    common.readStream(req, (body: Buffer) => {
      const data = Buffer.from('\n1111111111--reqRead--1111111111\n');
      res.end(body ? Buffer.concat([data, body]) : data);
    });
  });
};
