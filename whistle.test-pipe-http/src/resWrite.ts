
export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  const common = options.require('./lib/util/common');
  server.on('request', (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
    common.readStream(req, (body: Buffer) => {
      const data = Buffer.from('\n4444444444++resWrite++4444444444\n');
      res.end(body ? Buffer.concat([body, data]) : data);
    });
  });
};
