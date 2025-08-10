
export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  // handle http request
  server.on('request', (req: Whistle.PluginServerRequest, res: Whistle.PluginServerResponse) => {
    // do something
    req.passThrough();
  });

  // handle websocket request
  server.on('upgrade', (req: Whistle.PluginServerRequest, socket: Whistle.PluginServerSocket) => {
    // do something
    req.passThrough();
  });

  // handle tunnel request
  server.on('connect', (req: Whistle.PluginServerRequest, socket: Whistle.PluginServerSocket) => {
    const { originalReq: { ruleValue } } = req;
    if (ruleValue !== 'mirror') {
      return req.passThrough();
    }
    socket.pipe(socket);
  });
};
