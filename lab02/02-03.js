const http = require('http')
const fs = require('fs')

const PORT = 5000

const server = http.createServer((req, res) => {
	if(req.url === '/api/name') {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		})
	
		res.end('Mikhalchik Vladislav Dmitrievich')
	}	
})

server.listen(PORT, () => console.log(`sever running on PORT: ${PORT}`))
