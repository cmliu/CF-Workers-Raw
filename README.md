# 🚀 EO-Pages-Raw：通过EdgeOne Pages轻松访问GitHub私有仓库

🔐 这个项目允许你通过腾讯云 EdgeOne Pages 安全地访问GitHub私有仓库中的原始文件，无需直接暴露你的GitHub令牌。

## 🎯 应用场景

- 📁 你有一些存储在GitHub私有仓库中的重要文件
- 🔗 你想直接通过URL访问这些文件的原始内容（比如配置文件、数据文件等）
- 🛡️ 但是，你不想在URL中直接暴露你的GitHub令牌，因为这可能会被他人滥用
- 🎯 你需要为不同的路径设置不同的访问权限

💡 我们的解决方案是使用EdgeOne Pages作为中间层，它替你安全地处理身份验证，让你可以安全地访问私有文件。

## 🚀 快速开始

### 1. 部署到EdgeOne Pages

1. **Fork或下载此项目**
2. **推送到你的Git仓库**（GitHub、GitLab等）
3. **在EdgeOne Pages控制台**：
   - 创建新站点
   - 连接你的Git仓库
   - 选择此项目的仓库和分支
   - 构建设置：无需构建命令，输出目录为 `/`
4. **配置环境变量**（见下方配置表）
5. **部署完成！**

### 2. 项目结构
```
├── functions/
│   └── [[path]].js    # 处理所有动态路径的EdgeOne Functions
├── index.html         # 主页HTML文件（nginx伪装页面）
├── package.json       # 项目配置
├── EdgeOne-Deploy.md  # 部署指南
└── README.md         # 说明文档
```

## 📖 使用方法

假设你的EdgeOne Pages项目部署在 `your-project.pages.dev`，而你要访问的私有文件是 `https://raw.githubusercontent.com/your-username/your-repo/main/file.js`

### 🔑 方法1：通过URL参数传递令牌
最直接的方法是在URL中添加你的GitHub令牌作为参数：
```url
https://your-project.pages.dev/your-username/your-repo/main/file.js?token=你的GitHub令牌
```
或者，如果你喜欢完整的原始URL：
```url
https://your-project.pages.dev/https://raw.githubusercontent.com/your-username/your-repo/main/file.js?token=你的GitHub令牌
```

### 🌐 方法2：设置全局令牌
如果你经常访问同一个私有仓库，可以在EdgeOne Pages设置中添加一个名为 `GH_TOKEN` 的环境变量，值为你的GitHub令牌。这样，你就可以直接访问，无需在URL中每次都包含令牌：
```url
https://your-project.pages.dev/your-username/your-repo/main/file.js
```

### 🔒 方法3：添加额外的访问控制（推荐）
为了更高的安全性，你可以设置两个环境变量：

- `GH_TOKEN`：你的GitHub令牌
- `TOKEN`：一个自定义的访问密钥（比如 mysecretkey）

然后，你的URL会是这样的：
```url
https://your-project.pages.dev/your-username/your-repo/main/file.js?token=mysecretkey
```

这种方法提供了双重安全：即使有人猜到了你的自定义密钥，他们仍然无法访问你的GitHub文件，因为GitHub令牌是安全地存储在EdgeOne Pages设置中的。

### 🎯 方法4：路径专用令牌控制（✨ 高级功能）
为了实现更细粒度的访问控制，你可以为不同的路径设置专用的访问令牌：

设置 `TOKEN_PATH` 环境变量，格式为：`专用令牌@路径`，多个路径用逗号分隔：
```
TOKEN_PATH="123456@sh,abcdef@admin,xyz789@private"
```

使用方式：
```url
https://your-project.pages.dev/sh/script.py?token=123456
https://your-project.pages.dev/admin/config.json?token=abcdef
https://your-project.pages.dev/private/data.txt?token=xyz789
```

🛡️ **安全特性**：
- ✅ 每个路径都有独立的访问令牌
- ✅ 令牌验证成功后自动使用 `GH_TOKEN` 访问GitHub
- ✅ 防止大小写绕过（路径自动转换为小写比较）
- ✅ 防止URL编码绕过（自动解码）
- ✅ 精确路径匹配，防止部分匹配绕过

### 🔍 方法5：隐藏GitHub路径信息
为了更高的隐私性，你可以设置多个环境变量来隐藏真实的GitHub路径：

- 🧑‍💻 `GH_NAME`：你的GitHub用户名（例如: **your-username**）
```url
https://your-project.pages.dev/your-repo/main/file.js?token=your_token
```

- 📦 `GH_REPO`：你的GitHub仓库名（例如: **your-repo**，必须设置`GH_NAME`变量为前提）
```url
https://your-project.pages.dev/main/file.js?token=your_token
```

- 🌿 `GH_BRANCH`：你的GitHub分支名（例如: **main**，必须设置`GH_NAME`和`GH_REPO`变量为前提）
```url
https://your-project.pages.dev/file.js?token=your_token
```

⚠️ **注意**：如您使用完整的原始URL，则以上变量将不会生效！

## ⚙️ 环境变量配置

在EdgeOne Pages控制台的环境变量设置中添加：

| 变量名 | 示例 | 必填 | 备注 | 
|--|--|--|--|
| GH_TOKEN| `ghp_CgmlL2b5J8Z1soNUquc0bZblkbO3gKxhn13t`| ❌| 您的GitHub个人访问令牌 |
| TOKEN| `nicaibudaowo` | ❌| 自定义访问密钥（与GH_TOKEN同时存在时作为访问鉴权）|
| TOKEN_PATH| `123456@sh,abcdef@admin` | ❌| 路径专用令牌，格式为`令牌@路径`，多个配置用逗号分隔|
| GH_NAME| `your-username` | ❌| 你的GitHub用户名 |
| GH_REPO| `your-repo` | ❌| 你的GitHub仓库名（需要设置GH_NAME）|
| GH_BRANCH| `main` | ❌| 你的GitHub分支名（需要设置GH_NAME和GH_REPO）|
| ERROR | `无法获取文件，检查路径或TOKEN是否正确。` |❌| 自定义错误提示 |

💡 **如何获取GitHub个人访问令牌**：
1. 登录GitHub
2. 进入 Settings → Developer settings → Personal access tokens (classic)
3. 生成新的token，选择适当的权限（至少需要repo权限访问私有仓库）
4. 复制生成的token到 `GH_TOKEN` 环境变量

## 🏠 主页设置

EdgeOne Pages版本支持多种主页设置：

### 默认主页
- 📄 `index.html` - 静态HTML主页（nginx样式伪装页面）
- 当访问根路径 `/` 时自动显示

## ❌ 错误处理

如果出现问题，你会看到以下错误消息之一：

- 🚫 **TOKEN错误**：你提供的访问密钥不正确
- ⚠️ **TOKEN不能为空**：需要提供GitHub令牌或访问密钥
- 📂 **无法获取文件，检查路径或TOKEN是否正确**：文件路径错误或令牌无权访问该文件
- 🔧 **服务器GitHub TOKEN配置错误**：服务器端GitHub令牌未正确配置

## 🎯 TOKEN_PATH 详细说明

TOKEN_PATH 是一个强大的功能，允许你为不同的路径设置专用的访问令牌：

### 📝 配置格式
```
TOKEN_PATH="令牌1@路径1,令牌2@路径2,令牌3@路径3"
```

### 💡 使用示例
配置：
```
TOKEN_PATH="123456@sh,abcdef@admin,xyz789@private"
GH_TOKEN="ghp_your_github_token"
```

访问方式：
- ✅ `/sh/script.py?token=123456` - 使用专用令牌123456访问sh路径
- ✅ `/admin/config?token=abcdef` - 使用专用令牌abcdef访问admin路径
- ✅ `/private/data?token=xyz789` - 使用专用令牌xyz789访问private路径
- ❌ `/sh/script.py?token=wrong` - TOKEN错误
- ❌ `/sh/script.py` - TOKEN不能为空

### 🛡️ 安全特性
- 🔒 **令牌隔离**：用户访问令牌与GitHub API令牌完全分离
- 🎯 **路径精确匹配**：防止路径注入和绕过攻击
- 📝 **大小写不敏感**：自动处理大小写问题
- 🔓 **URL解码**：自动处理编码绕过尝试
- ⚡ **自动切换**：验证成功后自动使用GH_TOKEN访问GitHub

## 🎯 技术细节

### EdgeOne Pages Functions 路由规则
- `[[path]].js` - 捕获所有动态路径，如 `/any/path/here`
- 文件必须放在 `functions/` 目录下
- 函数必须导出 `onRequest` 函数
- 支持 `context` 参数，包含 `request`、`env` 等对象

### 主页处理机制
- EdgeOne Pages 会自动服务根目录的 `index.html` 文件
- 这比内嵌HTML代码更高效且易于维护

### 安全机制
- GitHub令牌安全存储在EdgeOne Pages环境变量中
- 支持多层级的访问控制（全局token、路径专用token）
- 防止各种绕过攻击（大小写、URL编码、路径注入等）

## 🚀 性能优势

- ⚡ **EdgeOne全球加速**：利用腾讯云EdgeOne的全球CDN网络
- 🎯 **智能路由**：根据用户地理位置选择最近的服务节点
- 📦 **静态资源优化**：HTML、CSS、JS等静态资源自动优化和缓存
- 🔄 **Git集成部署**：代码推送自动触发部署，无需手动操作

## 📚 相关文档

- 📋 [EdgeOne-Deploy.md](./EdgeOne-Deploy.md) - 详细部署指南
- 📦 [package.json](./package.json) - 项目配置信息
- 🏠 [index.html](./index.html) - 默认主页模板

## 🙏 致谢

- 💡 项目灵感来源于社区需求
- 🛠️ 基于EdgeOne Pages技术构建
- 🎯 感谢所有贡献者和使用者的反馈

---

💡 **提示**：这个项目专为EdgeOne Pages优化，提供了比传统方案更好的性能、安全性和易用性。如果你在使用过程中遇到任何问题，欢迎提交Issue或Pull Request！
