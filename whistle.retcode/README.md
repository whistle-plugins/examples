# whistle.retcode
在抓包界面 Network 新增一列 `RetCode`，并显示接口响应内容的状态码 `retcode`，且如果 `retcode` 不正常时修改抓包数据的背景颜色及字体样式。

<img width="800" alt="image" src="https://user-images.githubusercontent.com/11450939/205444405-4db818f8-8702-4d7f-9fed-ba5f89097b89.png">


# 实现原理
1. 在插件的 `package.json` 设置列的名称（jia se）、列宽度（默认为 `70px`）、从抓包对象里面取值的 `key`（如：`statusCode`、`req.headers.x-test` 等等），是否显示 tips：

	``` json
	{
		...
		"whistleConfig": {
			"networkColumn": {
				"name": "RetCode",
				"width": 90,
				"showTips": true,
				"key": "customData.retcode.ret"
			}
		},
		...
	}
	```
2. 通过自定义 `webWorker` 自定义 `customData`（请求及响应内容需要通过 webWorker 解析并将对应字段返回给抓包数据，统一放 `customData` 字段）

	``` json
	{
		...
		"whistleConfig": {
			"networkColumn": {
				"name": "RetCode",
				"width": 90,
				"showTips": true,
				"key": "customData.retcode.code"
			},
			"webWorker": "assets/webWorker.js"
		},
		...
	}
	```
	`webWorker.js` 代码示例：
	``` js
	var URL_RE = /^https?:\/\/[^/?#]+\.qq\.com\/cgi-/;

    module.exports = function(data, next) {
    // 过滤不需要的请求
    data = URL_RE.test(data.url) && data.res.json;
    if (!data) {
        return;
    }
    var code = data.retcode == null ? data.ret : data.retcode;
    if (code == null) {
        return;
    }
    var error = code !== 0;
    var code = code + (error && data.msg ? '(' + data.msg + ')' : '');
    next({
        retcode: { code },
        // error: error, // 跟 style 二选一即可
        style: error ? {
        color: '#fff',
        fontStyle: 'italic',
        bgColor: 'red'
        } : undefined
    })
    };
	```

详细实现参见项目代码。
