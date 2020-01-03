# whistle.test-rules
> 有关 whistle 的配置规则可以参考：https://juejin.im/post/5e0ca73ef265da5d674ed593

插件支持设置以下几种规则（可选，按需添加功能即可）：
1. 静态规则
    - rules.txt：插件全局规则，和在界面 Rules 等价，只是界面 Rules 配置的优先级高于插件 `rules.txt` 里面的规则
    - _rules.txt：插件私有规则，只对匹配插件协议的请求生效，且只作用在请求阶段
    - resRules.txt：插件私有响应规则，只对匹配插件协议的请求生效，且只作用在响应阶段
2. 动态规则
    - rulesServer：插件动态私有规则，只对 http、https、websocket 请求生效，功能同 `_rules.txt`，只是 `rulesServer` 可以通过编码动态设置，优先级也高于 `_rules.txt`
    - tunnelRulesServer：插件动态私有规则，只对 tunnel 请求生效，作用同 `rulesServer`
    - resRulesServer：插件动态私有规则，功能同 `resRules.txt`，只是 `resRulesServer` 可以通过编码动态设置，优先级也高于 `resRules.txt`

  # 准备工作
参见：[README](../#readme)

# 创建项目
1. 在上述 `plugins` 目录下创建新目录 `whistle.test-rules`，命令行进入该目录，执行 `lack init` 创建项目。
    > 选择所有 `rules server` 和 `rules file`。
2. 添加 eslint，可以使用：https://github.com/imweb/eslint-config-imweb
3. 安装依赖：
    ``` txt
    npm i
    ```
4. 开启自动重启模式
    ``` sh
    lack watch
    ```

# 添加静态规则
1. `rules.txt`:
    ``` txt
    ke.qq.com/test.html file://`(${query.name})`
    ke.qq.com whistle.test-rules://custom
    whistle.test-rules:// fudao.qq.com www.baidu.com
    www.baidu.com disable://capture
    ```
    > 访问 `https://ke.qq.com/test.html?name=test` 返回 `test`；访问 `ke.qq.com` 及 `www.baidu.com` 都会进入插件，且 `www.baidu.com` 禁用捕获 tunnel 请求（直接请求，无法查看请求内容）

    > `rules.txt` 里面只能设置一个 `@remote-url`
2. `_rules.txt`:
    ``` txt
    ke.qq.com/cgi-bin/test file://`(${method})`
    ```
    > 访问 `https://ke.qq.com/cgi-bin/test` 返回 `1 2 3`（见下面的 `rulesServer.js`），如果是 `post` 请求则返回 `POST`（可用 Composer 构造 POST 请求）

    ![POST](https://user-images.githubusercontent.com/11450939/71713573-35e45900-2e45-11ea-8216-86590a588927.png)
3. `resRules.txt`:
    ``` txt
    ke.qq.com/cgi-bin/status resHeaders://x-test=1 includeFilter://s:404
    ke.qq.com jsAppend://`(alert("${statusCode}");)` includeFilter://s:404
    ```
    > 访问 `https://ke.qq.com/cgi-bin/status` 会弹出 `alert(404)`，且响应头里面新增了 `x-test: 1`；访问 `https://ke.qq.com/404.html` 也会弹出 `alert(404)`，但响应头里面不会注入 `x-test: 1`
# 添加动态规则
1. `rulesServer.js`：
    ``` txt
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
    ```
    > 同 `_rules.txt`
2. `tunnelRulesServer.js`：
    ``` txt
    module.exports = (server/* , options */) => {
        server.on('request', (req, res) => {
            res.end('www.baidu.com statusCode://403');
        });
    };
    ```
    > 禁用 `www.baidu.com` 的 tunnel 请求
3. `resRulesServer.js`：
    ``` txt
    module.exports = (server/* , options */) => {
        server.on('request', (req, res) => {
            const { ruleValue } = req.originalReq;
            res.end(`ke.qq.com/cgi-bin/rule-value resBody://(${ruleValue}))`);
        });
    };
    ```
    > 访问 `https://ke.qq.com/cgi-bin/rule-value` 响应内容被改成 `custom`，且由于响应 `404` 所以会被注入 `alert(404)`

详细实现参见项目代码。
