
export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  server.on('request', (req: Whistle.PluginRequest) => {
    const { originalReq, originalRes } = req;
    console.log('Value:', originalReq.ruleValue);
    console.log('URL:', originalReq.fullUrl);
    console.log('Method:', originalReq.method);
    console.log('Server IP', originalRes.serverIp);
    console.log('Status Code:', originalRes.statusCode);
    console.log('Response Headers:', originalReq.headers);
    // 获取请求的完整抓包数据
    req.getSession((reqSession) => {
      if (reqSession) {
        console.log('Response Body:', reqSession.res.body);
      }
    });
  });
};
