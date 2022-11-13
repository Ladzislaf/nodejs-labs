const http = require('http')
const fs = require('fs')

const PORT = 5000

const server = http.createServer((req, res) => {
	if(req.url === '/html') {
		let html = fs.readFileSync('./index.html')

		res.writeHead(200, {
			'Content-Type': 'text/html; charset=utf-8'
		})

		res.end(html)
	}
})

server.listen(PORT, () => console.log(`sever running on PORT: ${PORT}`))
