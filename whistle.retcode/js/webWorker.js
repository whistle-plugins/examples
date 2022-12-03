var URL_RE = /^https?:\/\/[^/?#]+\.qq\.com\/cgi-/;

module.exports = function(data, next) {
  // 过滤不需要的请求
  data = URL_RE.test(data.url) && data.res.json;
  if (!data) {
    return;
  }
  var code = data.retcode == null ? data.ret : data.retcode;
  if (code == null) {
    return;
  }
  var error = code !== 0;
  var code = code + (error && data.msg ? '(' + data.msg + ')' : '');
  next({
    retcode: { code },
    // error: error, // 跟 style 二选一即可
    style: error ? {
      color: '#fff',
      fontStyle: 'italic',
      bgColor: 'red'
    } : undefined
  })
};
