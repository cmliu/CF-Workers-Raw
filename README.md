# CF-Workers-Raw：轻松访问GitHub私有仓库
这个项目允许你通过Cloudflare Workers安全地访问GitHub私有仓库中的原始文件，无需直接暴露你的GitHub令牌。
## 为什么需要这个工具？

- 你有一些存储在GitHub私有仓库中的重要文件。
- 你想直接通过URL访问这些文件的原始内容（比如配置文件、数据文件等）。
- 但是，你不想在URL中直接暴露你的GitHub令牌，因为这可能会被他人滥用。

我们的解决方案是使用Cloudflare Workers作为中间层，它替你安全地处理身份验证，让你可以安全地访问私有文件。
## 如何使用？
假设你的Cloudflare Workers项目部署在`raw.090227.xyz`，

而你要访问的私有文件是`https://raw.githubusercontent.com/cmliu/CF-Workers-Raw/main/_worker.js`。

## 方法1：通过URL参数传递令牌
最直接的方法是在URL中添加你的GitHub令牌作为参数：
```url
https://raw.090227.xyz/cmliu/CF-Workers-Raw/main/_worker.js?token=你的GitHub令牌
```
或者，如果你喜欢完整的原始URL：
```url
https://raw.090227.xyz/https://raw.githubusercontent.com/cmliu/CF-Workers-Raw/main/_worker.js?token=你的GitHub令牌
```

## 方法2：在Workers中设置全局令牌
如果你经常访问同一个私有仓库，可以在Workers设置中添加一个名为`GH_TOKEN`的变量，值为你的GitHub令牌。这样，你就可以直接访问，无需在URL中每次都包含令牌：
```url
https://raw.090227.xyz/cmliu/CF-Workers-Raw/main/_worker.js
```
或者，如果你喜欢完整的原始URL：
```url
https://raw.090227.xyz/https://raw.githubusercontent.com/cmliu/CF-Workers-Raw/main/_worker.js
```

## 方法3：添加额外的访问控制（推荐）
为了更高的安全性，你可以设置两个变量：

- `GH_TOKEN`：你的GitHub令牌
- `TOKEN`：一个自定义的访问密钥（比如mysecretkey）

然后，你的URL会是这样的：
```url
https://raw.090227.xyz/cmliu/CF-Workers-Raw/main/_worker.js?token=mysecretkey
```
或者，如果你喜欢完整的原始URL：
```url
https://raw.090227.xyz/https://raw.githubusercontent.com/cmliu/CF-Workers-Raw/main/_worker.js?token=mysecretkey
```
这种方法提供了双重安全：即使有人猜到了你的自定义密钥，他们仍然无法访问你的GitHub文件，因为GitHub令牌是安全地存储在Workers设置中的。

## 如何设置这些变量？

在你的Cloudflare Workers管理面板中：

1. 进入你的Workers项目。
2. 点击**设置**标签。
3. 滚动到**环境变量**部分。
4. 添加以下变量：
   - 变量：GH_TOKEN，值：你的GitHub个人访问令牌
   - 变量：TOKEN（可选），值：你的自定义访问密钥
     
GitHub个人访问令牌可以在GitHub设置中的"Developer settings" > "Personal access tokens (classic)"页面生成。

## 错误处理

如果出现问题，你会看到以下错误消息之一：

- **TOKEN有误**：你提供的自定义访问密钥不正确。
- **TOKEN不能为空**：需要提供GitHub令牌。
- **无法获取文件 检测路径或TOKEN**：文件路径错误或令牌无权访问该文件。
- **路径不能为空**：你没有指定要访问的文件路径。

# 感谢
我自己的脑洞、ChatGPT
