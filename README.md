
## 使用方法
以下例子使用`cf-workers-raw.pages.dev`作为你项目的域名

需要访问的私库raw地址为`https://raw.githubusercontent.com/cmliu/CF-Workers-Raw/main/_worker.js`

### 1. 直接访问:
```url
https://cf-workers-raw.pages.dev/cmliu/CF-Workers-Raw/main/_worker.js?token=ghp_CgmlL2b5J8Z1soNUquc0bZblkbO3gKxhn13t
或
https://cf-workers-raw.pages.dev/https://raw.githubusercontent.com/cmliu/CF-Workers-Raw/main/_worker.js?token=ghp_CgmlL2b5J8Z1soNUquc0bZblkbO3gKxhn13t
```

### 2. 赋值变量`GH_TOKEN`后访问
   `GH_TOKEN`赋值为你的`Personal access tokens (classic)`
```url
https://cf-workers-raw.pages.dev/cmliu/CF-Workers-Raw/main/_worker.js
或
https://cf-workers-raw.pages.dev/https://raw.githubusercontent.com/cmliu/CF-Workers-Raw/main/_worker.js
```

### 3. 赋值变量`GH_TOKEN`和`TOKEN`后访问
   `GH_TOKEN`赋值为你的`Personal access tokens (classic)`
   
   `TOKEN`赋值为你的访问鉴权`nicaibudaowo`

```url
https://cf-workers-raw.pages.dev/cmliu/CF-Workers-Raw/main/_worker.js?token=nicaibudaowo
或
https://cf-workers-raw.pages.dev/https://raw.githubusercontent.com/cmliu/CF-Workers-Raw/main/_worker.js?token=nicaibudaowo
```

## 变量说明
| 变量名 | 示例 | 备注 |
|--------|---------|-----|
| GH_TOKEN | ghp_CgmlL2b5J8Z1soNUquc0bZblkbO3gKxhn13t | 有私库读取权限的token |
| TOKEN | nicaibudaowo | `GH_TOKEN`和`TOKEN`同时存在的时候会作为访问鉴权，单独赋值的效果与`GH_TOKEN`相同 |
