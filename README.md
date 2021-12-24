# whistle 插件示例
> 有关插件原理可以参考：https://wproxy.org/whistle/plugins.html

每个 whistle 插件就是一个普通的 npm 包，whistle 为插件提供了强大的扩展能力，不仅可以操作 whistle 所有规则，且具备 node 的所有能力，可用来做以下事情：
1. 提供UI界面
2. 作为请求 Server（直接响应或转发并修改请求响应）
3. 统计请求信息（查看上报/打点数据等）
4. 设置规则（动态，静态，全局及私有规则）
5. 获取抓包数据
6. 编解码请求响应数据流（pipe stream 功能）
7. 扩展 Network 右键菜单
8. 保存并同步 Rules & Values 数据
9. 在 Network / Inspectors 自定义 Tab

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

准备工作做完，可以开始开发插件，下面我们以插件 [whistle.inspect](https://github.com/whistle-plugins/whistle.inspect) 为例，详细讲下如何开发、调试、发布、安装、使用插件。

# 创建插件
在 `plugins` 目录下创建新目录 `whistle.inspect`，并命令行进入该目录执行 `lack init`：
<img alt="生成插件" width="800" src="https://user-images.githubusercontent.com/11450939/71639015-9343a300-2ca9-11ea-952e-6333108003f7.png" />
<img alt="项目结构" width="800" src="https://user-images.githubusercontent.com/11450939/71639071-870c1580-2caa-11ea-9701-302cdb133dd2.png" />

生成插件项目后，修改下 `package.json` 的 `description`：集成eruda和vConsole等调试H5页面工具的插件。

插件里面可以自动三种规则文件：
1. rules.txt：功能和在界面的 Rules 配置的规则一样，只是优先级比界面的规则低，且禁用插件后会自动失效
2. _rules.txt：也可以叫 `reqRules.txt`，请求阶段的私有规则，所谓私有规则指的是匹配到插件扩展的协议（即匹配：`pattern whistle.inspect://xxx` 或 `pattern inspect://xxx` 的请求才会去解析并匹配 _rules.txt 的规则
3. resRules.txt：功能同上，只不过这些是在响应阶段才会用到的规则

本插件要实现是用户安装插件后，匹配 `pattern whistle.inspect://vConsole` 或 `pattern inspect://vConsole` 的请求自动注入 `vConsole`（或 `eruda`）。

初始化插件后，如果有需要新增内容，可以重新执行 `lack init` 进行增量添加。

# 开发插件
在 `whistle.inspect` 目录命令行执行：
``` txt
lack watch
```
> 用来监听相关文件变化后自动重新加载插件

由于在准备工作里面，我们已经在 `plugins` 目录里面执行 `w2 run`，whistle 会自动加载当前目录下的所有插件，所以可以在 whistle 插件列表里面看到：
<img alt="插件列表" width="800" src="https://user-images.githubusercontent.com/11450939/71639487-7364ad00-2cb2-11ea-9b46-b6906f99bf24.png" />

### 添加内容
在插件里面新建目录 `assets`，并在目录里面新建两个文件：
1. `vConsole.js`：初始化 vConsole 的脚本
    <img alt="vConsole.js" width="800" src="https://user-images.githubusercontent.com/11450939/71639593-2550a900-2cb4-11ea-9c3f-17a176364ffa.png" />
2. `eruda.js`：初始化 eruda 的脚本
    <img alt="eruda.js" width="800" src="https://user-images.githubusercontent.com/11450939/71639602-3994a600-2cb4-11ea-9091-9660163b52a4.png" />

### 通过规则注入 vConsole
在插件的 `_rules.txt` 配置如下规则：
``` txt
* jsAppend://assets/vConsole.js
```
> 插件里面设置的规则里面如果有包含相对的本地路径，都是相对于插件根目录的

`lack watch` 会自动监听 `_rules.txt` 的变化并让 whistle 重新加载插件：
<img alt="reload" width="800" src="https://user-images.githubusercontent.com/11450939/71639651-2e8e4580-2cb5-11ea-8389-ae65d56a1368.png" />

上述设置后，配置如下规则，则可以看到在页面里面注入了 `vConsole.js` 的脚本，且可以显示 `vConsole` 按钮：
``` txt
ke.qq.com whistle.inspect://xxx # xxx 为空或任意值
```

### 根据用户配置注入
上面注入的脚本是写死的，如果想支持用户自己配置来决定注入哪个工具，这时可以用模板字符串解决该问题，把 `_rules.txt` 的规则改成：
``` txt
* jsAppend://`assets/${whistle.inspect}.js` includeFilter://resH:content-type=html
```
> 只注入 html 页面

这时，如果用户配置：
``` txt
ke.qq.com whistle.inspect://eruda
```
则打开 ke.qq.com 下面的页面右下脚会出现 eruda 的按钮，打开页面源码可以看到底部被注入 `eruda.js` 文件脚本。

如果用户配置：
``` txt
ke.qq.com whistle.inspect://vConsole
```
则同样可以看到 vConsole 的按钮及脚本。

### 优化用户体验
如果需要用户在规则里面输入的时候，可以自动补全输入功能，可以在插件的 `package.json` 里面配置：
``` txt
"whistleConfig": {
    "hintList": [
        "vConsole",
        "eruda"
    ],
    "hideShortProtocol": true
}
```
> `"hideShortProtocol": true` 表示 whistle 界面里面不会出现 `inspect://`，这里用不到，这个规则和 file 等规则互斥

配置后，在界面 Rules 里面输入 `whistle.inspect://` 即可看到自动补全功能：
<img alt="自动补全功能" width="500" src="https://user-images.githubusercontent.com/11450939/71639832-39e37000-2cb9-11ea-9093-b2e4d6e9789d.png" />

到此整个插件开发完成，接下来需要发布到 npm 仓库 (可以发布到公共到 npm 的仓库，或者私有的 npm 仓库，私有仓库包名需要加 `@xxx/whistle.inspect`, 手动在 package.json 里面改下即可)

# 发布插件
跟发布普通的 npm 包没什么两样：
``` sh
npm publish
```
私有包类似：
``` sh
tnpm publish
```
> 如果包名冲突记得改名字的时候，要搜索下整个项目涉及的 `whistle.inspect` 都要改

# 安装插件
1. 用 whistle 自动命令（优先级最高，推荐使用）
    ``` txt
    w2 i whistle.inspect
    ```
    如果无法直接访问 npm，可以带上内网的 registry：
    ``` txt
    w2 i whistle.inspect --registry=http://xxx.com
    ```
    如果内网有专有的 npm 命令，如 tnpm，也可以：
    ``` txt
    w2 ti whistle.inspect
    ``` 
2. npm 全局安装，跟普通 npm 包全局安装一样：
    ``` txt
    npm i -g whistle.inspect
    ```

# 使用插件
安装后，可以更加要匹配的请求配置规则即可：
> 有关规则配置可以参见帮助文档：https://wproxy.org/whistle/

<img alt="自动补全功能" width="500" src="https://user-images.githubusercontent.com/11450939/71639832-39e37000-2cb9-11ea-9093-b2e4d6e9789d.png" />

# 优化插件
1. 上面配置方式，每个请求都会从指定的文件里面对齐内容，如果希望把内容直接加载到内存，可以把它们转成一个 json 对象存到 `_values.txt` 文件里面，参见：[whistle.inspect](https://github.com/whistle-plugins/whistle.inspect)
2. 如果不想注入这么多脚本，想让页面通过外链异步加载，有两种方式：
    - 把脚本文件放公共服务，如 `http://xxx.cdn.com/xxx/vConsole.js` 与 `http://xxx.cdn.com/xxx/eruda.js`，则在 `_rules.txt` 修改下配置：
        ``` txt
        * jsAppend://`http://xxx.cdn.com/xxx/${whistle.inspect}.js` includeFilter://resH:content-type=html
        ```
    - 如果想直接让页面从插件内部读取文件，需要通过 `lack init` 新增一个 `uiServer`，并把 `http://local.whistlejs.com/whistle.inspect/xxx/vConsole.js` 和  `http://local.whistlejs.com/whistle.inspect/xxx/eruda.js` 的请求转到指定文件（`xxx` 部分路径可以自定义），设置好后把 `_rules.txt` 的配置改成：
        ```` txt
        ``` whistle.inspect/inject.html
        <script src="/...whistle-path.5b6af7b9884e1165...///whistle.inspect/xxx/${whistle.inspect}.js"></script>
        ```
        * htmlAppend://`{whistle.inspect/inject.html}`
        ````
        > `/...whistle-path.5b6af7b9884e1165...///whistle.inspect/` 相对每个插件是固定的，相当于 `http://local.whistlejs.com/whistle.inspect/`，这种相对路径的请求 whistle 会自动转到对应插件。

更多用法参考下面的例子。

# 例子（以下各个例子的功能也可以合在一个插件实现）
1. [UI 界面](./whistle.test-ui)
2. [请求 Server](./whistle.test-server)
3. [统计请求信息](./whistle.test-stats)
4. [设置规则](./whistle.test-rules)
5. [获取抓包数据](https://github.com/whistle-plugins/whistle.autosave)
6. [编解码请求响应数据流](./whistle.test-pipe)
7. [扩展 Network 右键菜单](./whistle.test-menu)
8. [保存并同步 Rules & Values 数据](./whistle.test-sync)
9. [在 Network / Inspectors 自定义 Tab](./whistle.view-md5)
