var http = require('http');
var url = require('url');


var hashMap = {

}

var database = {
	username:'scott',
	password:'123456'
}
http.createServer(function(req, res){

	if(req.url == '/favicon.ico')return;

	var cookieKey = 'JSESSIONID';

	var Cookies = getCookie(req);

	var handler = Math.pow(Math.random(),3).toString(16);
	var pattern = url.parse(req.url, true);

	if(Cookies[cookieKey]){

		var isLogin = Cookies[cookieKey] in hashMap;

		console.log('是否是登录的用户' + isLogin,hashMap);

		

		if(isLogin){

			

			if(pattern.pathname == '/logout'){

			   delete hashMap[Cookies[cookieKey]];

			   redirect(res, '/');

			}else{

				res.end('success request' + pattern.pathname);
			}


		}else{

			if(pattern.pathname == '/login'){
		
				var query = pattern.query;

				if(query.username == database.username && query.password == database.password){
				
					hashMap[Cookies[cookieKey]] = database;

					res.end('success can use all source');

				}else{
					res.end('username or password error');
				}

			}else{

		   	   res.end('please to login')
			}
		}

	}else{
		setCookie(res,cookieKey , handler ,1);
	}
	
	
	

}).listen(8080)


function redirect(res, path){
	// 通过响应头来实现服务端重定向
        res.writeHead(302,{
            'Location': path
        })
        
        res.end();
}
function setCookie(res, c_name, value ,expiredays){

	var exdate=new Date();
　　　　	exdate.setDate(exdate.getDate() + expiredays);
	// 向客户端设置一个Cookie
    return res.writeHead(200, {
        'Set-Cookie': c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()),
        'Content-Type': 'text/plain'
    });
}

function getCookie(req){
	// 获得客户端的Cookie
    var Cookies = {};
    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });

    return Cookies;
}


