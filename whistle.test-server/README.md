# whistle.test-server
whistle 插件的 `server` 用来直接处理请求，可以通过配置 `pattern plugin-name://opValue` （这里 `plugin-name` 不能包含 `whistle.` 前缀，否则请求不会转发到 server，如：`test-server://xxx`，而不能为 <del>`whistle.test-server://xxx`</del>）。

# 准备工作
参见：[README](https://github.com/whistle-plugins/examples#readme)

# 创建项目
1. 在上述 `plugins` 目录下创建新目录 `whistle.test-server`，命令行进入该目录，执行 `lack init` 创建项目。
    > 在 `select pipe server` 时，用空格键选择第一个 `server`，其它的都输 `n` 或点回车
2. 添加 eslint，可以使用：https://github.com/imweb/eslint-config-imweb
3. 安装依赖：
    ``` txt
    npm i
    ```
4. 开启自动重启模式
    ``` sh
    lack watch
    ```

# 项目结构
`lib/server.js` 里面可以处理三种请求：
1. `request`：用于处理普通 http 或 https 请求
2. `upgrade`: 用于处理 websocket 请求
3. `connect`: 用于处理普通 tcp 请求

上述三个事件的代码如果不需要用到，也不能删除，保留着即可。

# 项目功能
1. 修改响应内容：
    ``` txt
    # 在响应内容前面新增 123456
    $ke.qq.com test-server://prepend:123456

    # 追加响应内容 abcdefg
    $ke.qq.com test-server://append:abcdefg
    ```
    ![image](https://user-images.githubusercontent.com/11450939/71641788-74123900-2cdc-11ea-8eeb-3995ca07fbcf.png)
2. 将响应内容转成 Base64
    ``` txt
    $ke.qq.com test-server://base64
    ```
    ![image](https://user-images.githubusercontent.com/11450939/71641806-9c019c80-2cdc-11ea-9553-cfe9bf563fbf.png)
3. 其它配置直接请求

# 具体实现
参见项目代码
