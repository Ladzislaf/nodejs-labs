const http = require('http')

let getHeaders = (request) => {
	let result = ''
	for(key in request.headers)
		result += '<h3 style="text-indent: 25px;">' + key +':' + request.headers[key] + '</h3>'
	return result
}

http.createServer((req, res) => {
	let requestBody = '';
	req.on('data', str => {
		requestBody += str;
		console.log('data', requestBody)
	})

	res.writeHead(200, {
		'Content-Type': 'text/html; charset= utf-8'
	})

	req.on('end', () => res.end(
		'<!DOCTYPE html>' +
		'<html>' +
		'<head></head>' +
		'<body>' +
			'<h1>Структура запроса</h1>' +
			'<h2>' + 'метод: ' + req.method + '</h2>' +
			'<h2>' + 'uri: ' + req.url + '</h2>' +
			'<h2>' + 'версия: ' + req.httpVersion + '</h2>' +
			'<h2>' + 'ЗАГОЛОВКИ' + '</h2>' +
			getHeaders(req) +
			'<h2>' + 'тело: ' + requestBody + '</h2>' +
		'</body>' +
		'</html>'
	))
}).listen(3000);

console.log('Sever running at http://localhost:3000/')
