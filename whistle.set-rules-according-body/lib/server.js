
module.exports = (server/* , options */) => {
  server.on('request', (req) => {
    // 只处理响应状态，并根据响应内容里的 retcode 设置到 cookie 里面
    req.passThrough(null, (rawBuffer, next, ctx) => {
      // rawBuffer 为原始响应内容，可能还没 ugzip，可以通过 ctx.getBuffer ctx.getText ctx.getJson 
      // 分别获取 unzip 后的 buffer，文本、json 对象
      ctx.getJson((err, json) => {
        if (err || !json || typeof json.retcode !== 'number') {
          return next({ body: rawBuffer });
        }
        next({
          body: rawBuffer,
          rules: `* resCookies://{retcode:{value:${json.retcode},path:"/"}}`,
        });
      });
    });
  });
};
