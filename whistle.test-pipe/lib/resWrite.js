
module.exports = (server/* , options */) => {
  server.on('request', (req, res) => {
    let body;
    req.on('data', (data) => {
      body = body ? Buffer.concat([body, data]) : data;
    });
    req.on('end', () => {
      if (body) {
        res.end(body.toString('base64'));
      } else {
        res.end();
      }
    });
  });
};
