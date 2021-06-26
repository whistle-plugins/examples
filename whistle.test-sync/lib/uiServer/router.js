// For help see https://github.com/ZijianHe/koa-router#api-reference
const { getRules, getValues } = require('./storage');

module.exports = (router) => {
  router.get('/cgi-bin/rules', (ctx) => {
    ctx.body = getRules();
  });
  router.get('/cgi-bin/values', (ctx) => {
    ctx.body = getValues();
  });
};
