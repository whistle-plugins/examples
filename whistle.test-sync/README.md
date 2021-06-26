# whistle.test-ui
插件 UI 可以作为作为服务提供接口及静态资源服务，也可以作为插件的配置管理界面使用。

# 准备工作
参见：[README](https://github.com/whistle-plugins/examples#readme)

# 创建项目
1. 在上述 `plugins` 目录下创建新目录 `whistle.test-sync`，命令行进入该目录，执行 `lack init` 创建项目。
    > 全部点回车即可，最后默认生成一个 UI Server 架子
2. 添加 eslint，可以使用：https://github.com/imweb/eslint-config-imweb
3. 安装依赖：
    ``` txt
    npm i
    ```
4. 开启自动重启模式
    ``` sh
    lack watch
    ```
实现方法直接参考本项目代码。

> 注意需要在 `package.json` 里面的 `whistleConfig` 配置 `rulesUrl` 和 `valuesUrl` 对应加载 Rules 和 Values 的接口链接
# 使用

![image](https://user-images.githubusercontent.com/11450939/123501761-ce921880-d679-11eb-865a-0fc33cc6a8cf.png)

# 添加构建
参考下 nohost 的构建：https://github.com/nohosts/nohost/tree/master/src/config
