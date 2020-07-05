var express = require('express');

var proxy = require('express-http-proxy');

var compress = require('compression');

var path = require('path');

var url = require('url');

var app = express();

//开启gzip压缩
app.use(compress());

var currentDir = path.posix.join(__dirname);

//注册静态文件
app.use('/web', express.static(path.join(__dirname, '/web')));


//主页请求
app.get('/', function(req, res) {
	res.type('html');
	res.sendFile(currentDir + '/web/index.html');
});

//设置代理 所有以/api路径的请求都被代理
app.use('/api', proxy('http://10.50.7.122:8083', {
	proxyReqPathResolver: function(req) {
		return '/rcs' + url.parse(req.url).path;
	}
}));

app.listen(8880, function() {
	console.log('server listening at 8880! wahahahaha!');
});