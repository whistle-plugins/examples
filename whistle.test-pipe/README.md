# whistle.test-pipe
对一些敏感数据，在传输过程中可能对数据进行加密，导致 whistle 抓包里面显示的是加密后的数据，无法查看明文且一些操作内容的协议无法使用：

![加密请求](https://user-images.githubusercontent.com/11450939/71642948-040cae80-2cee-11ea-9cd7-18c0bc1f9ebb.png)

为此 whistle 提供了 [pipe](https://wproxy.org/whistle/rules/pipe.html) 协议，通过 pipe 可以在请求(响应)流的前后个新增一个流解析器，分别用来解密及还原解密：

![image](https://user-images.githubusercontent.com/11450939/71643162-b47bb200-2cf0-11ea-915b-9882810ef858.png)

以 [whistle.test-server](../whistlte.test-server) 为例，设置以下规则后：
``` txt
$ke.qq.com test-server://base64
```

<img src="https://user-images.githubusercontent.com/11450939/71643218-9f535300-2cf1-11ea-93f6-0e39e3bf713a.png" width="800" alt="乱码效果">

http://ke.qq.com 的请求内容会转成 base64，这样在 whistle 的 Network 只能看到转成 base64 后的内容，无法看到真实内容，也很难通过规则修改内容，这时即可应用 pipe 功能，在插件里面实现解base64和还原base64操作，项目开发过程这里不再赘述直接参考 [README](../README.md)。

开发完 `whistle.test-pipe` （具体实现看代码），可以做如下配置，即可在 whistle 里面看到真实内容，且可以用规则修改内容：
``` txt
$ke.qq.com test-server://base64 pipe://test-pipe
```

<img src="https://user-images.githubusercontent.com/11450939/71643276-91ea9880-2cf2-11ea-8aff-3b8332622867.png" width="800" alt="解码效果">

<img src="https://user-images.githubusercontent.com/11450939/71643279-9c0c9700-2cf2-11ea-85f9-0841e7502404.png" width="800" alt="不改变响应">
