
module.exports = (server/* , options */) => {
  server.on('request', (req, res) => {
    const { ruleValue } = req.originalReq;
    res.end(`ke.qq.com/cgi-bin/rule-value resBody://(${ruleValue})`);
  });
};
