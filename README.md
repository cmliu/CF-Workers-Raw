# CF-Workers-Raw：轻松访问GitHub私有仓库
这个项目允许你通过Cloudflare Workers安全地访问GitHub私有仓库中的原始文件，无需直接暴露你的GitHub令牌。
## 为什么需要这个工具？

- 你有一些存储在GitHub私有仓库中的重要文件。
- 你想直接通过URL访问这些文件的原始内容（比如配置文件、数据文件等）。
- 但是，你不想在URL中直接暴露你的GitHub令牌，因为这可能会被他人滥用。

我们的解决方案是使用Cloudflare Workers作为中间层，它替你安全地处理身份验证，让你可以安全地访问私有文件。
## 如何使用？ [视频教程](https://www.youtube.com/watch?v=T-bK5o96lqI)
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

## 方法4：添加`GH_NAME`、`GH_REPO`、`GH_BRANCH`变量**隐藏GitHub路径信息**

为了更高的隐私性，你可以设置多个变量：
- `GH_NAME`：你的GitHub用户名（例如: **cmliu**）
然后，你的URL会是这样的：
```url
https://raw.090227.xyz/CF-Workers-Raw/main/_worker.js?token=sd123123
```

- `GH_REPO`：你的GitHub仓库名（例如: **CF-Workers-Raw**，必须设置`GH_NAME`变量为前提）
然后，你的URL会是这样的：
```url
https://raw.090227.xyz/main/_worker.js?token=sd123123
```

- `GH_BRANCH`：你的GitHub仓库名（例如: **main**，必须设置`GH_NAME`和`GH_REPO`变量为前提）
然后，你的URL会是这样的：
```url
https://raw.090227.xyz/_worker.js?token=sd123123
```

**如您使用完整的原始URL，则以上变量将不会生效！**
```url
https://raw.090227.xyz/https://raw.githubusercontent.com/cmliu/CF-Workers-Raw/main/_worker.js?token=sd123123
```

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

# 变量说明
| 变量名 | 示例 | 必填 | 备注 | 
|--|--|--|--|
| GH_TOKEN| `ghp_CgmlL2b5J8Z1soNUquc0bZblkbO3gKxhn13t`| ❌| 您的GitHub令牌 **token**|
| TOKEN| `nicaibudaowo` | ❌| `GH_TOKEN`和`TOKEN`同时存在的时候会作为访问鉴权，单独赋值时的效果与`GH_TOKEN`相同|
| GH_NAME| `cmliu` | ❌| 你的GitHub用户名 |
| GH_REPO| `CF-Workers-Raw` | ❌| 你的GitHub仓库(必须设置`GH_NAME`变量为前提) |
| GH_BRANCH| `main` | ❌| 你的GitHub仓库(必须设置`GH_NAME`和`GH_REPO`变量为前提) |
| URL302 | `https://t.me/CMLiussss` |❌| 主页302跳转 |
| URL | `https://github.com/cmliu/CF-Workers-Raw/blob/main/README.md` |❌| 主页伪装 |
| ERROR | `无法获取文件，检查路径或TOKEN是否正确。` |❌| 自定义错误提示 |

# 感谢
我自己的脑洞、ChatGPT
