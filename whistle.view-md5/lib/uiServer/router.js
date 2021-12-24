const crypto = require('crypto');

module.exports = (router) => {
  router.get('/cgi-bin/md5', (ctx) => {
    const { text, base64 } = ctx.request.body;
    const result = { md5: '' };
    if (text && typeof text === 'string') {

    } else if (base64 && typeof base64 === 'string') {
      
    }
    ctx.body = result;
  });
};
