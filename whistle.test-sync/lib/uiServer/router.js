// For help see https://github.com/ZijianHe/koa-router#api-reference
const { getRules, getValues } = require('./storage');

module.exports = (router) => {
  router.get('/cgi-bin/rules', (ctx) => {
    ctx.body = getRules();
  });
  router.get('/cgi-bin/values', (ctx) => {
    const { history } = ctx.request.query;
    const data = Object.assign({}, getValues());
    ctx.body = {
      // whistle >= v2.9.9
      list: ['2022-04-16 12:11:01', '2022-04-15 10:11:01', '2022-04-14 09:11:01'],
      data: history === 'empty' ? {} : data,
    };
  });
};
