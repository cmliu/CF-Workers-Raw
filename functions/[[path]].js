// EdgeOne Pages Functions 版本
// 处理所有动态路径的请求

let token = "";

export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    
    if (url.pathname !== '/') {
        let githubRawUrl = 'https://raw.githubusercontent.com';
        if (new RegExp(githubRawUrl, 'i').test(url.pathname)) {
            githubRawUrl += url.pathname.split(githubRawUrl)[1];
        } else {
            if (env.GH_NAME) {
                githubRawUrl += '/' + env.GH_NAME;
                if (env.GH_REPO) {
                    githubRawUrl += '/' + env.GH_REPO;
                    if (env.GH_BRANCH) githubRawUrl += '/' + env.GH_BRANCH;
                }
            }
            githubRawUrl += url.pathname;
        }
        //console.log(githubRawUrl);
        
        // 初始化请求头
        const headers = new Headers();
        let authTokenSet = false; // 标记是否已经设置了认证token
        
        // 检查TOKEN_PATH特殊路径鉴权
        if (env.TOKEN_PATH) {
            const 需要鉴权的路径配置 = await ADD(env.TOKEN_PATH);
            // 将路径转换为小写进行比较，防止大小写绕过
            const normalizedPathname = decodeURIComponent(url.pathname.toLowerCase());

            //检测访问路径是否需要鉴权
            for (const pathConfig of 需要鉴权的路径配置) {
                const configParts = pathConfig.split('@');
                if (configParts.length !== 2) {
                    // 如果格式不正确，跳过这个配置
                    continue;
                }

                const [requiredToken, pathPart] = configParts;
                const normalizedPath = '/' + pathPart.toLowerCase().trim();

                // 精确匹配路径段，防止部分匹配绕过
                const pathMatches = normalizedPathname === normalizedPath ||
                    normalizedPathname.startsWith(normalizedPath + '/');

                if (pathMatches) {
                    const providedToken = url.searchParams.get('token');
                    if (!providedToken) {
                        return new Response('TOKEN不能为空', { status: 400 });
                    }

                    if (providedToken !== requiredToken.trim()) {
                        return new Response('TOKEN错误', { status: 403 });
                    }

                    // token验证成功，使用GH_TOKEN作为GitHub请求的token
                    if (!env.GH_TOKEN) {
                        return new Response('服务器GitHub TOKEN配置错误', { status: 500 });
                    }
                    headers.append('Authorization', `token ${env.GH_TOKEN}`);
                    authTokenSet = true;
                    break; // 找到匹配的路径配置后退出循环
                }
            }
        }
        
        // 如果TOKEN_PATH没有设置认证，使用默认token逻辑
        if (!authTokenSet) {
            if (env.GH_TOKEN && env.TOKEN) {
                if (env.TOKEN == url.searchParams.get('token')) token = env.GH_TOKEN || token;
                else token = url.searchParams.get('token') || token;
            } else token = url.searchParams.get('token') || env.GH_TOKEN || env.TOKEN || token;
            
            const githubToken = token;
            //console.log(githubToken);
            if (!githubToken || githubToken == '') {
                return new Response('TOKEN不能为空', { status: 400 });
            }
            headers.append('Authorization', `token ${githubToken}`);
        }

        // 发起请求
        const response = await fetch(githubRawUrl, { headers });

        // 检查请求是否成功 (状态码 200 到 299)
        if (response.ok) {
            return new Response(response.body, {
                status: response.status,
                headers: response.headers
            });
        } else {
            const errorText = env.ERROR || '无法获取文件，检查路径或TOKEN是否正确。';
            // 如果请求不成功，返回适当的错误响应
            return new Response(errorText, { status: response.status });
        }

    } else {
        const envKey = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null);
        if (envKey) {
            const URLs = await ADD(env[envKey]);
            const URL = URLs[Math.floor(Math.random() * URLs.length)];
            return envKey === 'URL302' ? Response.redirect(URL, 302) : fetch(new Request(URL, request));
        }
        //返回主页，EdgeOne Pages会自动服务index.html
        return new Response(null, { status: 404 });
    }
}

async function ADD(envadd) {
    var addtext = envadd.replace(/[	|"'\r\n]+/g, ',').replace(/,+/g, ',');	// 将空格、双引号、单引号和换行符替换为逗号
    //console.log(addtext);
    if (addtext.charAt(0) == ',') addtext = addtext.slice(1);
    if (addtext.charAt(addtext.length - 1) == ',') addtext = addtext.slice(0, addtext.length - 1);
    const add = addtext.split(',');
    //console.log(add);
    return add;
}
