import Router from '@koa/router';

// For help, see https://github.com/koajs/router
export default (router: Router) => {
  // 针对 `%test-rules-hint[.key]=xxx`
  const VARS_OPTIONS = [
    'testa-plugin-vars',
    'testb-plugin-vars1',
    'testc-plugin-vars22',
    'testd-plugin-vars333',
    'teste-plugin-vars4444',
    'testf-plugin-vars55555',
    'testg-plugin-vars66666',
    'testh-plugin-vars7x',
    'testi-plugin-vars8y',
  ];
  router.get('/cgi-bin/plugin-vars', (ctx) => {
    const { sep, value } = ctx.query;
    const isKey = sep === '.';
    let key = '';
    let keyword = '';
    if (value && typeof value === 'string') {
      if (isKey) {
        const index = value.indexOf('=');
        // %test-plugin-vars.xxx=yyy
        if (index !== -1) {
          key = value.substring(0, index);
          keyword = value.substring(index + 1).toLowerCase();
        } else {
          // %test-plugin-vars.xxx or %test-plugin-vars.xxx=
          key = value;
        }
      } else {
        // %test-plugin-vars=yyy
        keyword = value.toLowerCase();
      }
    }
    const result: (string | {
      isKey: true,
      value: string,
    })[] = [];
    VARS_OPTIONS.forEach((option) => {
      if (keyword && !option.toLowerCase().includes(keyword)) {
        return;
      }
      if (isKey) {
        result.push({
          value: `${key}=${option}`,
          isKey: true,
        });
      } else {
        result.push(option);
      }
    });
    ctx.body = result;
  });

  // 针对 `test-rules-hint://xxx` 和 `whistle.test-rules-hint://xxx`
  // 如果没有配置 `pluginVars.hintUrl`，则对 `%test-rules-hint[.key]=xxx` 也生效
  const HINTS_OPTIONS = [
    'plugina-rules-hint0',
    'pluginb-rules-hint1',
    'pluginc-rules-hint22',
    'plugind-rules-hint333',
    'plugine-rules-hint4444',
    'pluginf-rules-hint55555',
    'pluging-rules-hint66666',
    'pluginh-rules-hint7x',
    'plugini-rules-hint8y',
  ];
  router.get('/cgi-bin/get-hints', (ctx) => {
    const { protocol, value } = ctx.query;
    if (!protocol || typeof protocol !== 'string' || typeof value !== 'string') {
      return;
    }
    const isVar = protocol.startsWith('%');
    // 事实上不会有这种情况，除非删除了 `pluginVars.hintUrl` 配置
    if (isVar) {
      return;
    }
    const isLong = protocol.startsWith('whistle.');
    const prefix = isLong ? 'long-' : 'short-';
    const keyword = value.toLowerCase();
    const result: string[] = [];
    HINTS_OPTIONS.forEach((option) => {
      if (`${prefix}${option.toLowerCase()}`.includes(keyword)) {
        result.push(`${prefix}${option}`);
      }
    });
    ctx.body = result;
  });
};
