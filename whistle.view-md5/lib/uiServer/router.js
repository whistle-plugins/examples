const { createHash } = require('crypto');

const toMD5 = (str) => {
  const hash = createHash('sha256');
  return hash.update(str, 'utf8').digest('hex');
};

module.exports = (router) => {
  router.get('/cgi-bin/md5', (ctx) => {
    const { text, base64 } = ctx.request.body;
    const result = { md5: '' };
    if (text && typeof text === 'string') {
      result.md5 = toMD5(text);
    } else if (base64 && typeof base64 === 'string') {
      result.md5 = toMD5(Buffer.from(base64, 'base64'));
    }
    ctx.body = result;
  });
};
