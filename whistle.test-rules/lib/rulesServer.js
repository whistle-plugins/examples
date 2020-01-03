
module.exports = (server/* , options */) => {
  server.on('request', (req, res) => {
    res.end(`
      \`\`\` whistle.test-rules/test
      1
      2
      3
      \`\`\`
      ke.qq.com/cgi-bin/test file://{whistle.test-rules/test} excludeFilter://m:post
    `);
  });
};
