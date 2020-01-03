
module.exports = (server/* , options */) => {
  server.on('request', (req, res) => {
    res.end('www.baidu.com statusCode://403');
  });
};
