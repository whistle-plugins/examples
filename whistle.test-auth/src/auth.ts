
export default async (req: Whistle.PluginAuthRequest, options: Whistle.PluginOptions) => {
  const { fullUrl } = req;
  // URL 里面包含 `/test/forbidden` 的响应状态码为 403
  if (fullUrl.includes('/test/forbidden')) {
    return false;
  }
  // URL 里面包含 `/test/message/forbidden` 的响应状态码为 403，且自定义响应内容
  if (fullUrl.includes('/test/message/forbidden')) {
    req.setHtml('<strong>Access Denied</strong>');
    return false;
  }

  // URL 里面包含 `/test/login` 要求用户输入用户名和密码
  if (fullUrl.includes('/test/login')) {
    const auth = req.headers.authorization || req.headers['proxy-authorization'];
    if (auth) {
      // TODO: 校验用户名和密码，如果正确返回 true，否则返回 false
      return true;
    }
    req.setLogin(true);
    return false;
  }

  // URL 里面包含 `/test/redirect` 的响应状态码为 302，且重定向到 `https://www.example.com/test`
  if (fullUrl.includes('/test/redirect')) {
    req.setRedirect('https://www.example.com/test');
    return false;
  }
  // 其它请求直接放过
  // 如果需要添加自定义请求头，可以使用 `req.setHeader` 方法
  // 支持添加 key 前缀为 `x-whistle-` 的请求头
  // 例如：req.setHeader('x-whistle-xxx', 'value');
  req.setHeader('x-whistle-custom-header', 'lack');
  return true;
};
