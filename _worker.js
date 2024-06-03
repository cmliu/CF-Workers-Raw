let token = "";
export default {
	async fetch(request ,env) {
		const url = new URL(request.url);
		if(url.pathname !== '/'){
			let githubRawUrl = 'https://raw.githubusercontent.com';
			if (new RegExp(githubRawUrl, 'i').test(url.pathname)){
				githubRawUrl += url.pathname.split(githubRawUrl)[1];
			} else {
				githubRawUrl += url.pathname ;
			}
			console.log(githubRawUrl);
			if (env.GH_TOKEN && env.TOKEN){
				if (env.TOKEN == url.searchParams.get('token')){
					token = env.GH_TOKEN || token;
				} else {
					return new Response('TOKEN有误', { status: 400 });
				}	
			} else token = url.searchParams.get('token') || env.GH_TOKEN || env.TOKEN || token;
			
			const githubToken = token;
			console.log(githubToken);
			if (!githubToken || githubToken == '') return new Response('TOKEN不能为空', { status: 400 });
			
			// 构建请求头
			const headers = new Headers();
			headers.append('Authorization', `token ${githubToken}`);

			// 发起请求
			const response = await fetch(githubRawUrl, { headers });

			// 检查请求是否成功 (状态码 200 到 299)
			if (response.ok) {
				// 读取文件内容
				const content = await response.text();

				// 在这里您可以处理文件内容，例如返回给客户端或进行其他操作
				return new Response(content, { status: 200, headers: { 'Content-Type': 'text/plain' } });
			} else {
				// 如果请求不成功，返回适当的错误响应
				return new Response('无法获取文件 检测路径或TOKEN', { status: response.status });
			}

		} else {
			return new Response('路径不能为空', { status: 400 });
		}
	}
};
