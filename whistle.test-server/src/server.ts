const drain = (req: Whistle.PluginServerRequest, callback: () => void) => {
  req.on('data', () => {});
  req.on('end', callback);
};

export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  const common = options.require('./lib/util/common');
  // handle http request
  server.on('request', (req: Whistle.PluginServerRequest, res: Whistle.PluginServerResponse) => {
    const { originalReq: { ruleValue } } = req;
    if (ruleValue.startsWith('mock:')) {
      // 直接响应
      return drain(req, () => {
        res.setHeader('Content-Type', 'text/plain');
        res.end(ruleValue.substring(5));
      });
    }
    if (ruleValue === 'setCookieFromBody') {
      // 内部实现参考：https://github.com/avwo/whistle/blob/master/lib/plugins/load-plugin.js#L2152
      return req.passThrough(null, (rawBuff: Buffer, next, ctx) => {
        ctx.getJson((err, obj) => {
          // 如果报错，则直接放过不处理
          if (err || !obj) {
            return next();
          }
          obj.pluginName = 'test-server';
          next({
            body: obj,
            rules: `* resCookies://test-name=${obj.name}`,
          });
        });
      });
    }
    // 手动实现上述功能
    if (ruleValue === 'setCookieFromBodyByCustom') {
      const client = req.request((svrRes: any) => {
        common.readStream(svrRes, (rawBuff: Buffer) => {
          const response = (body: Buffer | string) => {
            const { statusCode, statusMessage, headers } = svrRes;
            res.writeHead(statusCode, statusMessage, headers);
            res.end(body);
          };
          svrRes.getJson((err: any, obj: any) => {
            // 如果报错，则直接放过不处理
            if (err || !obj) {
              return response(rawBuff);
            }
            obj.pluginName = 'test-server';
            res.setResRules(`* resCookies://test-name=${obj.name}`);
            // zipBody 方法需要最新版的 Whistle 才能使用
            options.zipBody(obj, svrRes, response);
          });
        });
      });
      req.pipe(client);
      return;
    }
     // 手动实现上述功能
    if (ruleValue === 'setCookieFromBodyByCustom2') {
      req.passThrough({
        transformRes(svrRes: any, next: Function) {
          svrRes.getJson((err: any, obj: any) => {
          // 如果报错，则直接放过不处理
          if (err || !obj) {
            return next();
          }
          obj.pluginName = 'test-server';
          next({
            body: obj,
            rules: `* resCookies://test-name=${obj.name}`,
          });
        });
        },
      });
      return;
    }
    // handle other http requests, continue request
    req.passThrough();
  });

  // handle websocket request
  server.on('upgrade', (req: Whistle.PluginServerRequest, socket: Whistle.PluginServerSocket) => {
    // do something
    req.passThrough();
  });

  // handle tunnel request
  server.on('connect', (req: Whistle.PluginServerRequest, socket: Whistle.PluginServerSocket) => {
    // do something
    req.passThrough();
  });
};
