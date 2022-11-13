const http = require('http')
const fs = require('fs')

const PORT = 5000

const server = http.createServer((req, res) => {
	if(req.url === '/api/name') {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		})
	
		res.end('Mikhalchik Vladislav Dmitrievich')
	} else if(req.url === '/fetch') {
		let html = fs.readFileSync('./fetch.html')

		res.writeHead(200, {
			'Content-Type': 'text/html; charset=utf-8'
		})

		res.end(html)
	}
})

server.listen(PORT, () => console.log(`sever running on PORT: ${PORT}`))
