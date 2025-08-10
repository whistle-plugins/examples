import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import onerror from 'koa-onerror';
import serve from 'koa-static';
import path from 'path';
import Router from '@koa/router';
import setupRouter from './router';

const MAX_AGE = 1000 * 60 * 5;

export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  const app = new Koa();
  app.proxy = true;
  app.silent = true;
  onerror(app);
  const router = new Router();
  setupRouter(router);
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(serve(path.join(__dirname, '../../public'), { maxage: MAX_AGE }));
  server.on('request', app.callback());
};
