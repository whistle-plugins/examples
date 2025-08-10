
export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  server.on('request', (req: Whistle.PluginRequest) => {
    const { originalReq } = req;
    console.log('Value:', originalReq.ruleValue);
    console.log('URL:', originalReq.fullUrl);
    console.log('Method:', originalReq.method);
    console.log('Request Headers:', originalReq.headers);
    // 获取请求的抓包数据（可能只包含请求阶段的数据）
    req.getReqSession((reqSession) => {
      if (reqSession) {
        console.log('Request Body:', reqSession.req.body);
      }
    });
  });
};
