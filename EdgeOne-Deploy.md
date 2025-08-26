# EdgeOne Pages 部署配置说明

## 环境变量配置模板

在 EdgeOne Pages 控制台的环境变量设置中，复制以下配置：

### 基础配置（必需）
```
GH_TOKEN=ghp_your_github_token_here
```

### 安全增强配置（推荐）
```
GH_TOKEN=ghp_your_github_token_here
TOKEN=your_custom_secret_key
```

### 路径专用令牌配置（高级）
```
GH_TOKEN=ghp_your_github_token_here
TOKEN_PATH=123456@sh,abcdef@admin,xyz789@private
```

### 完整配置示例
```
GH_TOKEN=ghp_CgmlL2b5J8Z1soNUquc0bZblkbO3gKxhn13t
TOKEN=nicaibudaowo
TOKEN_PATH=123456@sh,abcdef@admin,xyz789@private
GH_NAME=cmliu
GH_REPO=CF-Workers-Raw
GH_BRANCH=main
URL302=https://t.me/CMLiussss
ERROR=无法获取文件，检查路径或TOKEN是否正确。
```

## 部署检查清单

- [ ] ✅ 确保 `functions/` 目录存在
- [ ] ✅ 确保 `functions/[[path]].js` 文件存在
- [ ] ✅ 项目推送到 Git 仓库
- [ ] ✅ 在 EdgeOne Pages 连接 Git 仓库
- [ ] ✅ 设置环境变量
- [ ] ✅ 触发部署
- [ ] ✅ 测试访问功能

## 测试 URL 示例

部署完成后，可以使用以下 URL 进行测试（替换 `your-domain.pages.dev` 为您的实际域名）：

```bash
# 测试基础功能
https://your-domain.pages.dev/test/file.txt?token=your_token

# 测试路径专用令牌（如果配置了 TOKEN_PATH）
https://your-domain.pages.dev/sh/script.py?token=123456

# 测试首页
https://your-domain.pages.dev/
```
