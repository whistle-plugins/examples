var URL_RE = /^https?:\/\/github\.com\//;

module.exports = function(session, next) {
  // 只处理特定的 URL
  if (!URL_RE.test(session.url)) {
    return;
  }
  // var reqBody = session.req.body; // 获取请求内容
  // var reqJson = session.req.json; // 获取请求的 JSON 数据
  // var resBody = session.res.body; // 获取响应内容
  // var resJson = session.res.json; // 获取响应的 JSON 数据
  var error = false;
  next({
    testWebWorker: 'test',
    style: error ? {
      color: '#fff',
      fontStyle: 'italic',
      bgColor: 'red'
    } : undefined
  })
};
