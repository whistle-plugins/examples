# whistle.test-rules
> 有关 Whistle 的配置规则可以参考：https://juejin.im/post/5e0ca73ef265da5d674ed593

Whistle 虽然内置根据请求内容过滤匹配规则的能力，但很难满足所有应用场景，Whistle 最新版本（`>= v2.9.38`）提供了更方便的插件语法糖，让用户可以通过更简单的方式根据请求或响应内容设置规则，本项目以通过获取响应内容的 `retcode` 并设置到浏览器 cookie 为例，演示如何根据请求或响应内容设置规则（请求阶段同理），详细实现参见项目代码。

<img width="1000" alt="image" src="https://user-images.githubusercontent.com/11450939/205476920-b09b4e20-c666-40aa-8988-78bbb4c7d670.png">

