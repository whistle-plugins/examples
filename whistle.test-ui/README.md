# whistle.test-ui
插件 UI 可以作为作为服务提供接口及静态资源服务，也可以作为配置管理界面使用。本插件 UI 示例，主要用来展示如何开发 whistle 插件的 UI，以及如何访问插件的 UI 界面。

# 准备工作
1. 安装插件脚手架 [lack](https://github.com/avwo/lack)：
    ``` sh
    npm i -g lack
    ```
2. 更新 [whistle](https://github.com/avwo/lack) （使用最新版才能确保所有插件均可用）：
    ``` sh
    npm i -g whistle
    ```
3. 创建一个专门存放插件的目录，假设目录名称为 `plugins`
4. 在上述 `plugins` 目录启动 whistle 调试模式（whistle 会自动加载当前目录所有插件）：
    ``` sh
    plugins: w2 run
    ```
    > 如果出现启动报错，可以执行 `w2 stop` 停止后台 whistle 再 `w2 run`

# 创建项目
1. 在上述 `plugins` 目录下创建新目录 `whistle.test-ui`，命令行进入该目录，执行 `lack init` 创建项目。
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

# 访问界面
访问插件界面有以下三种方式：
1. 直接通过 whistle 界面路径访问：
   - http://local.whistlejs.com/whistle.test-ui/
   - http://127.0.0.1:8899/whistle.test-ui/
   - 其它可以访问 whistle 界面的 URL 即可（支持 HTTPS）
2. 启动 whistle 时给命令行指定插件的域名（该域名 dns 要指向插件所在服务器）
    ``` sh
    w2 start -L "test-ui=test.xxx.com"
    ```
    > 这样可以直接通过 `http://test.xxx.com` 访问插件界面（支持 HTTPS）
3. 通过特殊路径访问（支持任意URL）`/...whistle-path.5b6af7b9884e1165...///whistle.test-ui/`
    - https://www.baidu.com/...whistle-path.5b6af7b9884e1165...///whistle.test-ui/
    - https://ke.qq.com/...whistle-path.5b6af7b9884e1165...///whistle.test-ui/xxx/inject.js
    - https://www.test.com/...whistle-path.5b6af7b9884e1165...///whistle.test-ui/xxx/inject.js
    - 可以注入到界面用相对路径：`<script src="/...whistle-path.5b6af7b9884e1165...///whistle.test-ui/xxx/inject.js"></script>`
<img width="960" src="https://user-images.githubusercontent.com/11450939/71641311-9b650800-2cd4-11ea-88c9-d954aef61121.png">
# 添加构建
参考下 nohost 的构建：https://github.com/nohosts/nohost/tree/master/src/config
