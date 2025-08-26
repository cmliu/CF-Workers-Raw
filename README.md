# 🚀 CF-Workers-Raw EdgeOne Pages 版本：轻松访问GitHub私有仓库

🔐 这个项目的 EdgeOne Pages 版本允许你通过腾讯云 EdgeOne Pages 安全地访问GitHub私有仓库中的原始文件，无需直接暴露你的GitHub令牌。

## 📁 部署结构

本项目现在包含两个版本：

### Cloudflare Workers 版本
- 📄 `_worker.js` - Cloudflare Workers 脚本
- ⚙️ `wrangler.toml` - Cloudflare Workers 配置

### EdgeOne Pages 版本 ✨
- 📁 `functions/` - EdgeOne Pages Functions 目录
- 📄 `functions/[[path]].js` - 处理所有动态路径的函数

## 🚀 EdgeOne Pages 部署指南

### 1. 项目结构
EdgeOne Pages 版本使用以下目录结构：
```
├── functions/
│   └── [[path]].js    # 捕获所有路径的动态路由函数
├── _worker.js         # (保留原版本，供参考)
├── wrangler.toml      # (保留原版本，供参考)
└── README.md
```

### 2. 部署步骤

1. **上传项目到 Git 仓库**
   - 将整个项目推送到您的 Git 仓库（GitHub、GitLab 等）

2. **在 EdgeOne Pages 控制台创建项目**
   - 登录腾讯云 EdgeOne 控制台
   - 进入 Pages 服务
   - 点击"新建站点"
   - 连接您的 Git 仓库
   - 选择包含此项目的仓库和分支

3. **构建设置**
   - 构建命令：留空（无需构建）
   - 输出目录：`/`（根目录）
   - 环境变量：在部署设置中添加以下环境变量

### 3. 环境变量配置

在 EdgeOne Pages 控制台的环境变量设置中添加：

| 变量名 | 示例 | 必填 | 备注 | 
|--|--|--|--|
| GH_TOKEN| `ghp_CgmlL2b5J8Z1soNUquc0bZblkbO3gKxhn13t`| ❌| 您的GitHub令牌 |
| TOKEN| `nicaibudaowo` | ❌| 自定义访问密钥 |
| TOKEN_PATH| `123456@sh,abcdef@admin` | ❌| 路径专用令牌配置 |
| GH_NAME| `cmliu` | ❌| 你的GitHub用户名 |
| GH_REPO| `CF-Workers-Raw` | ❌| 你的GitHub仓库名 |
| GH_BRANCH| `main` | ❌| 你的GitHub分支名 |
| URL302 | `https://t.me/CMLiussss` |❌| 主页302跳转 |
| URL | `https://github.com/cmliu/CF-Workers-Raw` |❌| 主页伪装 |
| ERROR | `无法获取文件，检查路径或TOKEN是否正确。` |❌| 自定义错误提示 |

## 📖 EdgeOne Pages 版本使用方法

假设你的 EdgeOne Pages 项目部署在 `your-project.pages.dev`，使用方法与 Cloudflare Workers 版本完全相同：

### 🔑 方法1：通过URL参数传递令牌
```url
https://your-project.pages.dev/cmliu/CF-Workers-Raw/main/_worker.js?token=你的GitHub令牌
```

### 🔒 方法2：使用自定义访问控制
设置 `GH_TOKEN` 和 `TOKEN` 环境变量后：
```url
https://your-project.pages.dev/cmliu/CF-Workers-Raw/main/_worker.js?token=mysecretkey
```

### 🎯 方法3：路径专用令牌控制
设置 `TOKEN_PATH="123456@sh,abcdef@admin"` 后：
```url
https://your-project.pages.dev/sh/script.py?token=123456
https://your-project.pages.dev/admin/config.json?token=abcdef
```

### 🔍 方法4：隐藏GitHub路径信息
设置 `GH_NAME`、`GH_REPO`、`GH_BRANCH` 后：
```url
https://your-project.pages.dev/_worker.js?token=mysecretkey
```

## 🔄 版本对比

| 特性 | Cloudflare Workers | EdgeOne Pages |
|------|-------------------|---------------|
| 部署方式 | `wrangler deploy` | Git 连接自动部署 |
| 文件结构 | 单文件 `_worker.js` | `functions/[[path]].js` |
| 环境变量 | Workers 控制台设置 | Pages 控制台设置 |
| 自定义域名 | 支持 | 支持 |
| 性能 | EdgeOne 全球加速 | EdgeOne 全球加速 |
| 功能 | 完全相同 | 完全相同 |

## 🚀 快速迁移

如果您已经在使用 Cloudflare Workers 版本：

1. 将现有项目复制到新目录
2. 确保 `functions/[[path]].js` 文件存在
3. 在 EdgeOne Pages 中连接 Git 仓库
4. 复制现有的环境变量设置
5. 部署完成！

## 🎯 技术细节

### EdgeOne Pages Functions 路由规则
- `[[path]].js` - 捕获所有动态路径，如 `/any/path/here`
- 文件必须放在 `functions/` 目录下
- 函数必须导出 `onRequest` 函数
- 支持 `context` 参数，包含 `request`、`env` 等对象

### 与 Cloudflare Workers 的差异
1. **入口函数**：从 `export default { fetch() }` 改为 `export async function onRequest(context)`
2. **上下文获取**：从 `fetch(request, env)` 改为 `const { request, env } = context`
3. **文件路径**：从根目录 `_worker.js` 改为 `functions/[[path]].js`

## 🙏 致谢
- 原项目灵感来源
- EdgeOne Pages 技术支持
- 社区贡献者们

---

💡 **提示**：两个版本的功能完全相同，您可以根据自己的部署偏好选择使用 Cloudflare Workers 或 EdgeOne Pages。
